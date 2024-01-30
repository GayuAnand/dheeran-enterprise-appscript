const ImportUtil = require("../util/app-import.util");
const Util = require("./../util/util");

const GsheetRouter = ImportUtil.Express.Router({ mergeParams: true });

GsheetRouter.get('/sheetData', async (req, res) => {
  const sheetName = req.query?.sheetName;

  if (sheetName) {
    const retval = await ImportUtil.GsheetUtil.getSheetData(sheetName);

    if (retval.success && retval.data) {
      ImportUtil.ResHandlerUtil.successResponse(res, Util.transformDataToObj(retval.data));
    } else {
      ImportUtil.ResHandlerUtil.internalServerErrorResponse(res);
    }
  } else {
    ImportUtil.ResHandlerUtil.badRequestResponse(res, 'Invalid sheetName.')
  }
});

GsheetRouter.get('/testpost', async (req, res) => {
  // const retval = await ImportUtil.GsheetUtil.postGsheetData({ test: 123, asdf: 'fewer' });
  // console.log(retval);
  const r = await ImportUtil.FmsUtil.getAllCustomerAccounts();
  console.log(await ImportUtil.FmsUtil.getAllFranchiseFaults());
  ImportUtil.ResHandlerUtil.setContentType(res, ImportUtil.ResHandlerUtil.CONTENT_TYPES.JSON);
  ImportUtil.ResHandlerUtil.successResponse(res, r);
});

module.exports = exports = GsheetRouter;
