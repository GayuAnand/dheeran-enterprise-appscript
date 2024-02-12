const Util = require("./../util/util");
const FmsUtil = require("./../util/fms.util");
const GSheetUtil = require("./../util/gsheet.util");

const CONVERSIONACCOUNTS_SHEETNAME = 'ConversionAccounts';

async function getConversionAccounts() {
  const d = await GSheetUtil.getSheetData(CONVERSIONACCOUNTS_SHEETNAME);
  return Util.transformDataToObj(d.data);
}

async function updateConversionAccountsInfo(force) {
  const dataArr = await getConversionAccounts();

  for (let i = 0; i < dataArr.length; i++) {
    let statement = '';
    if (force || !dataArr[i].PLAN || (dataArr[i].PLAN.startsWith('ERROR'))) {
      console.log(`Processing ${i} of ${dataArr.length}...`);
      try {
        const phoneNumber = dataArr[i]['PHONE#'];
        statement = await FmsUtil.getStatement(phoneNumber);
        const statementInfo = FmsUtil.getStatementInfo(statement) || {};
        console.log(statementInfo);

        dataArr[i]['MONTHLY_CHARGES'] = statementInfo['Monthly Charges'];
        dataArr[i].PLAN = statementInfo.Plan;
        dataArr[i].MONTHS = statementInfo.months;
        dataArr[i].VOICEUSAGE = JSON.parse(statementInfo.voiceUsage.replace(',]', ']')).map(d => parseInt(d).toString()).join(', ');
        dataArr[i].DATAUSAGE = JSON.parse(statementInfo.dataUsage.replace(',]', ']')).map(d => parseInt(d).toString()).join(', ');
        await GSheetUtil.saveOrUpdateRecordById(CONVERSIONACCOUNTS_SHEETNAME, 'PHONE#', dataArr[i]);
      } catch (e) {
        dataArr[i].PLAN = `ERROR: ${e.toString().split('\n')}`;
        await GSheetUtil.saveOrUpdateRecordById(CONVERSIONACCOUNTS_SHEETNAME, 'PHONE#', dataArr[i]);
      }
    }
  }
}

// node getPlanInfo.js -> Update missing plan details
// node getPlanInfo.js 1 -> Force update existing plan details as well
const force = process.argv[2];

/** MAIN EXECUTIONS */
updateConversionAccountsInfo(force);
