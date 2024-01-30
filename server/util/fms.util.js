const Util = require("./util");
const CommonImportUtil = require("./common-import.util");

const FRANCHISES = {
  DHEERAN: 'krbdheeran_tnslm',
  PRADEEP: 'pradeep_tnslm',
  YOGAPRADEEP: 'yogapradeep_tnslm',
  SURESH: 'krbsuresh_tnslm'
};

const FRANCHISES_LIST = Object.values(FRANCHISES);

const SERVICE_TYPE = {
  BHARAT_FIBER_Voice: 'Bharat Fiber Voice',
  BHARAT_FIBER_BB: 'Bharat Fiber BB',
  LEASED_LINE: 'LEASED LINE',
};

const SERVICE_TYPE_LIST = Object.values(SERVICE_TYPE);

async function getCustomerServiceAccounts(franchise, serviceType) {
  return await CommonImportUtil.Fetch(`https://fms.bsnl.in/downloadAccountsList?userName=${encodeURIComponent(franchise)}&serviceType=${encodeURIComponent(serviceType)}`)
    .then((htmlRes) => htmlRes.text())
    .then((htmlRes) => {
      const { document } = (new CommonImportUtil.JSDOM(htmlRes)).window;
      const headers = Array.from(document.querySelectorAll('table tr:first-child th')).map(th => th.textContent);
      const data = Array.from(document.querySelectorAll('table tr:not(:first-child)'))
        .map(tr => Array.from(tr.querySelectorAll('td'))
          .map(td => td.textContent)
        );

      const retval = Util.transformDataToObj({ headers, data });
      Util.addCustomInfoToDataObj(retval, { SERVICE_TYPE: serviceType });
      return retval;
    });
}

async function getAllCustomerAccounts(franchise) {
  const retval = {};

  for (let i = 0; i < SERVICE_TYPE_LIST.length; i++) {
    const serviceType = SERVICE_TYPE_LIST[i];
    retval[serviceType] = await getCustomerServiceAccounts(franchise, serviceType);
  }

  return retval;
}

async function getAllFranchiseCustomerAccounts() {
  const retval = {};

  for (let i = 0; i < FRANCHISES_LIST.length; i++) {
    const franchise = FRANCHISES_LIST[i];
    retval[franchise] = await getAllCustomerAccounts(franchise);
  }

  return retval;
}

/**
 * 
 * @param {*} franchise 
 * @param {*} faultType MSO | DEFAULT
 * @returns 
 */
async function getFaults(franchise, faultType = 'DEFAULT') {
  return await CommonImportUtil.Fetch(`https://fms.bsnl.in/${faultType === 'MSO' ? 'fetchMSOFaultOrders' : 'fetchFaultOrdersMs'}`, {
      method: 'POST',
      body: `userName=${franchise}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then(res => res.json())
    .then((jsonRes) => {
      Util.addCustomInfoToDataObj(jsonRes, { FAULT_TYPE: faultType });
      return jsonRes;
    });
}

async function getAllFaults(franchise) {
  return {
    faults: await getFaults(franchise),
    msoFaults: await getFaults(franchise, 'MSO'),
  };
}

async function getAllFranchiseFaults() {
  const retval = {};

  for (let i = 0; i < FRANCHISES_LIST.length; i++) {
    const franchise = FRANCHISES_LIST[i];
    retval[franchise] = await getAllFaults(franchise);
  }

  return retval;
}

// fetch("https://fms.bsnl.in/fetchFaultOrdersMs", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "cache-control": "no-cache",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://fms.bsnl.in/workspace",
//   "referrerPolicy": "origin-when-cross-origin",
//   "body": "userName=krbsuresh_tnslm",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });

module.exports = exports = {
  FRANCHISES,

  getCustomerServiceAccounts,
  getAllCustomerAccounts,
  getAllFranchiseCustomerAccounts,

  getFaults,
  getAllFaults,
  getAllFranchiseFaults,
};
