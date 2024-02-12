const ImportUtil = require("../util/app-import.util");

const FmsRouter = ImportUtil.Express.Router({ mergeParams: true });

FmsRouter.get('/faults', async (req, res) => {
    const retval = await ImportUtil.FmsUtil.getAllFranchiseFaults();
    ImportUtil.ResHandlerUtil.setContentType(res, ImportUtil.ResHandlerUtil.CONTENT_TYPES.JSON);
    ImportUtil.ResHandlerUtil.successResponse(res, retval);
});

FmsRouter.get('/billView', async (req, res) => {
    const phoneNumber = ImportUtil.FmsUtil.parsePhoneNumber(req.query?.phonenumber);
    if (phoneNumber) {
        const retval = await ImportUtil.FmsUtil.getBillView(phoneNumber);
        ImportUtil.ResHandlerUtil.successResponse(res, retval);
    } else {
        ImportUtil.ResHandlerUtil.badRequestResponse(res, 'phonenumber parameter is required.');
    }
});

FmsRouter.get('/statement', async (req, res) => {
    const phoneNumber = ImportUtil.FmsUtil.parsePhoneNumber(req.query?.phonenumber);
    if (phoneNumber) {
        const statement = await ImportUtil.FmsUtil.getStatement(phoneNumber);
        ImportUtil.ResHandlerUtil.successResponse(res, statement);
    } else {
        ImportUtil.ResHandlerUtil.badRequestResponse(res, `Parameter 'phonenumber' is required.`);
    }
});

FmsRouter.get('/statementInfo', async (req, res) => {
    const phoneNumber = ImportUtil.FmsUtil.parsePhoneNumber(req.query?.phonenumber);
    if (phoneNumber) {
        const statement = await ImportUtil.FmsUtil.getStatement(phoneNumber);
        ImportUtil.ResHandlerUtil.successResponse(res, ImportUtil.FmsUtil.getStatementInfo(statement));
    } else {
        ImportUtil.ResHandlerUtil.badRequestResponse(res, `Parameter 'phonenumber' is required.`);
    }
});

FmsRouter.get('/billSplitup', async (req, res) => {
    const phoneNumber = ImportUtil.FmsUtil.parsePhoneNumber(req.query?.phonenumber);
    if (phoneNumber) {
        const statement = await ImportUtil.FmsUtil.getStatement(phoneNumber);
        ImportUtil.ResHandlerUtil.successResponse(res, ImportUtil.FmsUtil.parseStatementCharges(statement));
    } else {
        ImportUtil.ResHandlerUtil.badRequestResponse(res, `Parameter 'phonenumber' is required.`);
    }
});

FmsRouter.get('/planInfo', async (req, res) => {
    const phoneNumber = ImportUtil.FmsUtil.parsePhoneNumber(req.query?.phonenumber);
    if (phoneNumber) {
        const statement = await ImportUtil.FmsUtil.getStatement(phoneNumber);
        ImportUtil.ResHandlerUtil.successResponse(res, ImportUtil.FmsUtil.parseStatementPlanInfo(statement));
    } else {
        ImportUtil.ResHandlerUtil.badRequestResponse(res, `Parameter 'phonenumber' is required.`);
    }
});

module.exports = exports = FmsRouter;
