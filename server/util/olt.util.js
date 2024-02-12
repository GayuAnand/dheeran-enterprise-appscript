const CONSTANTS = require("./../constants");
const CommonImportUtil = require("./common-import.util");

async function login(olt) {
  return await CommonImportUtil.Fetch(`${olt}/action/main.html`, {
    method: 'POST',
    redirect: 'follow',
    follow: 10,
    rejectUnauthorized: false,
    headers: CommonImportUtil.HEADER_FORMURLENCODED,
    body: 'user=admin&pass=ljso8@DR&button=Login&who=100'
  })
    .then(r => r.text());
}

// Not tested
async function logout(olt) {
  return await CommonImportUtil.Fetch(`${olt}/action/loginout.html`, {
    redirect: 'follow',
    follow: 10,
    rejectUnauthorized: false,
  });
}

function getPonOnuURIFromRequest(gponid, gonuid) {
  if (gponid && gonuid) {
    return `gponid=${gponid}&gonuid=${gonuid}`;
  }
  return '';
}

function getOnuPageUrl(olt, page, gponid, gonuid) {
  return `${olt}${page}?${getPonOnuURIFromRequest(gponid, gonuid)}`;
}

function getOltPageUrl(olt, page) {
  return `${olt}${page}`;
}

async function getPage(url, method, payload, headers) {
  console.log('Getting page URL: ', url, method, payload);
  try {
    const fetchArgs = {
      redirect: 'follow',
      follow: 10,
      rejectUnauthorized: false,
    };

    if (headers) {
      fetchArgs.headers = headers;
    }

    if (method && payload) {
      fetchArgs.method = method;
      fetchArgs.body = payload;
      console.log(fetchArgs);
    }

    const res = await CommonImportUtil.Fetch(url, fetchArgs);
    return await res.text();
  } catch (e) {
    console.log(`Error in processing page: ${url}`);
    return CONSTANTS.MSGS.INTERNAL_SERVER_ERROR;
  }
}

async function getOnuList(olt, includeDetails = false) {
  console.log('Getting ONU list for ', olt);
  if (olt) {
    await login(olt);
    const pon1 = await getPage(getOltPageUrl(olt, CommonImportUtil.CONSTANTS.OLT_PAGES.ONUAUTHINFO));
    const SessionKey = (pon1.match(/SessionKey\.value\s*=\s*'(\w+)'/) || [])[1];
    // const SessionKey = 'fbabv';
  
    const onulist = await getPage(
      getOltPageUrl(olt, CommonImportUtil.CONSTANTS.OLT_PAGES.ONUAUTHINFO),
      "POST",
      `select=255&SessionKey=${SessionKey}`,
      CommonImportUtil.HEADER_FORMURLENCODED
    );

    const { document } = (new CommonImportUtil.JSDOM(onulist)).window;
    const headersIndex = {
      'ONU ID': 0,
      'Status': 1,
      'MAC Address': 2,
    };
    document.querySelectorAll('table:last-of-type tr:first-child td').forEach((td, i) => headersIndex[td.textContent] = i);

    const data = []; // key: MAC address, value: data
    const rows = Array.from(document.querySelectorAll('table:last-of-type tr:not(:first-child)'));
    for (let ri = 0; ri < rows.length; ri++) {
      const row = rows[ri];
      const rowData = { olt };
      data.push(rowData);
      const dataCells = row.querySelectorAll('td');
      const ponOnuIds = dataCells[headersIndex['ONU ID']].textContent.match(/\/(\d+):(\d+)\b/) || ['', '0', '0'];
      rowData.PONID = ponOnuIds[1];
      rowData.ONUID = ponOnuIds[2];
      rowData.STATUS = dataCells[headersIndex['Status']].textContent;
      rowData.ONLINE = !!rowData.STATUS.match(/online/i);
      rowData.MACADDRESS = dataCells[headersIndex['MAC Address']].textContent;

      if (includeDetails && rowData.ONLINE) {
        const WANINFO = await getWanInfo(olt, rowData.PONID, rowData.ONUID);

        if (typeof WANINFO === 'object') {
          Object.assign(rowData, WANINFO);
        }
      }
    }

    return data;
  }
}

async function getWanInfo(olt, gponid, gonuid) {
  try {
    await login(olt);
    const text = await getPage(getOnuPageUrl(olt, CONSTANTS.ONU_PAGES.WAN, gponid, gonuid));
    const { document } = (new CommonImportUtil.JSDOM(text)).window;
    const textContent = document.querySelector('table').textContent;
    const retval = {
      BBUSERID: (textContent.match(/UserName:(\w+)@/) || [])[1] || '',
      VLAN: (textContent.match(/VLAN ID:\s*(\d+)\b/) || [])[1] || '',
    };
    console.log('WAN Info: ', retval);
    return retval;
  } catch (e) {
    console.log(`Error in getting WanInfo for OLT: ${olt}. ERROR: ${e}`);
    return CONSTANTS.MSGS.INTERNAL_SERVER_ERROR;
  }
}

module.exports = exports = {
  login,
  logout,
  getOltPageUrl,
  getPonOnuURIFromRequest,
  getOnuPageUrl,
  getPage,
  getOnuList,
  getWanInfo,
};
