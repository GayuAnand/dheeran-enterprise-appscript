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
  return await CommonImportUtil.FetchJson(`https://fms.bsnl.in/${faultType === 'MSO' ? 'fetchMSOFaultOrders' : 'fetchFaultOrdersMs'}`, {
      method: 'POST',
      body: `userName=${franchise}`,
      headers: CommonImportUtil.HEADER_FORMURLENCODED,
    })
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

function parsePhoneNumber(str = '') {
  return str.replace(/[^\d]/g, '');
}

async function getBillView(phoneNumber) {
  return await CommonImportUtil.FetchJson(`https://portal.bsnl.in/myBsnlApp/rest/billsummary/svctype/CDR/phoneno/${parsePhoneNumber(phoneNumber)}`).then(val => val?.ROWSET?.ROW?.[0] || val);
}

async function getStatement(phoneNumber) {
  const billView = await getBillView(phoneNumber);
  if (billView.REMARKS) {
    throw new Error(billView.REMARKS);
  }

  const body = {
      StatementIdentifier: 'HTML',
      SystemIdentifier: 'CWSC',
      InvoiceDate: billView.INVOICE_DATE, // 20240203
      InvoiceNumber: billView.INVOICE_NO, // SDCTN0073580356
      BillingAccountNumber: billView.ACCOUNT_NO, // 9039976354
      SSACode: billView.SSA_CODE, // SLM
      // InvoiceDate: '20240203', // 20240203
      // InvoiceNumber: 'SDCTN0077791956', // SDCTN0073580356
      // BillingAccountNumber: '9039976354', // 9039976354
      // SSACode: 'SLM', // SLM
  };

  return await CommonImportUtil.FetchText(`https://mybillview.bsnl.co.in/BSNLSelfcare_OntheFlyV1.0.6/CRSOntheFlyService/OntheFly/statement`, {
      method: 'POST',
      headers: CommonImportUtil.HEADER_FORMURLENCODED,
      body: CommonImportUtil.FetchObjToUrlEncodedStr(body)
  });
}

function parseStatementCharges(statement) {
  const charges = {};
  let [_, ccChargesType, ccCharges] = statement.replace(/[^ -~]/g, '').match(/var\s+ccSummary\s*=\s*(.*)?\s*;\s*var\s+ccValue\s*=\s*(.*)?\s*;\s*var\s+categoriesArray/);
  ccChargesType = JSON.parse(ccChargesType.replace(',]', ']'));
  ccCharges = JSON.parse(ccCharges.replace(',]', ']'));
  ccChargesType.forEach((charge, index) => charges[charge] = ccCharges[index]);
  return charges;
}

function parseStatementPlanInfo(statement) {
  let [_, planInfo] = statement.split('TARRIF PLAN')[1].replace(/[^ -~]/g, '').match(/<p.*?>([^<>]*)<\/p>/);
  return planInfo;
}

function parseDataVoiceUsage(statement) {
  let [_any1, months, voiceUsage, dataUsage] = statement.replace(/[^ -~]/g, '').match(/var\s+categoriesArray\s*=\s*(.*)?\s*;\s*var\s+data1\s*=\s*(.*)?\s*;\s*var\s+data2\s*=\s*(.*?);/);
  // months = JSON.parse(months.replace(',]', ']'));
  // voiceUsage = JSON.parse(voiceUsage.replace(',]', ']'));
  // dataUsage = JSON.parse(dataUsage.replace(',]', ']'));
  return { months, voiceUsage, dataUsage };
}

function getStatementInfo(statement) {
  const retval = {};
  Object.assign(retval, parseStatementCharges(statement));
  Object.assign(retval, parseDataVoiceUsage(statement));
  Object.assign(retval, { Plan: parseStatementPlanInfo(statement) });
  return retval;
}

module.exports = exports = {
  FRANCHISES,

  parsePhoneNumber,
  parseDataVoiceUsage,
  parseStatementCharges,
  parseStatementPlanInfo,

  getBillView,
  getStatement,
  getStatementInfo,

  getCustomerServiceAccounts,
  getAllCustomerAccounts,
  getAllFranchiseCustomerAccounts,

  getFaults,
  getAllFaults,
  getAllFranchiseFaults,
};
