const CommonImportUtil = require("./common-import.util");

let GSHEET_SERVICE_TOKEN = 'U2FsdGVkX1+qTcfY9EjPLKtUK2HCbVLE9twJX7q+87LoLp8gVQIucfCCLGAHKeDtBD3OryMc5IPfZWQ+JawtdxyFgSuuUv4xc9114z+VzhkMP8Hqm8lvhLaHGDUsDj5E';
const GSHEET_SCRIPT_ID = 'AKfycbxWZJNA0ToPZBIx7Qofz8s7nr_mng_hxkPF64pDimZNVfkpl7p1eBhpBBQqY0BExiXI';

function getApiUrl() {
  return `https://script.google.com/macros/s/${GSHEET_SCRIPT_ID}/exec`;
}

async function callGsheetApi(functionName, parameters) {
  const url = `${getApiUrl()}?api=1&functionName=${functionName}&functionParameters=${encodeURIComponent(JSON.stringify(parameters))}&rawData=1`;
  return await CommonImportUtil.FetchJson(url, {
    redirect: 'follow',
    follow: 10,
  });
}

async function postGsheetData(payload) {
  const url = getApiUrl();
  return await CommonImportUtil.Fetch(url, {
    method: 'POST',
    redirect: 'follow',
    follow: 10,
    body: JSON.stringify(payload)
  })
    .then(res => res.text());
}

async function saveOrUpdateRecordById(sheetName, idColumns, data) {
  return await callGsheetApi('saveOrUpdateRecordById', [sheetName, idColumns, data, GSHEET_SERVICE_TOKEN]);
}

async function getSheetData(sheetName) {
  return await callGsheetApi('getSheetData', [sheetName, GSHEET_SERVICE_TOKEN]);
}

module.exports = exports = {
  getSheetData,
  postGsheetData,
  saveOrUpdateRecordById,
};
