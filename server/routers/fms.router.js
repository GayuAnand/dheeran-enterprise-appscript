const ImportUtil = require("../util/app-import.util");

const FmsRouter = ImportUtil.Express.Router({ mergeParams: true });

FmsRouter.get('/faults', async (req, res) => {
    const retval = await ImportUtil.FmsUtil.getAllFranchiseFaults();
    ImportUtil.ResHandlerUtil.setContentType(res, ImportUtil.ResHandlerUtil.CONTENT_TYPES.JSON);
    ImportUtil.ResHandlerUtil.successResponse(res, retval);
});

module.exports = exports = FmsRouter;
