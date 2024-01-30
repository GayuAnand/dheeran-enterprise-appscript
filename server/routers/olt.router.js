const ImportUtil = require("../util/app-import.util");

const OltRouter = ImportUtil.Express.Router({ mergeParams: true });

OltRouter.get('/login', async (req, res) => {
  const olt = ImportUtil.CONSTANTS.OLTs[req?.query?.olt];
  if (olt) {
    await ImportUtil.OltUtil.login(olt);
    ImportUtil.ResHandlerUtil.successResponse(res);
  } else {
    ImportUtil.ResHandlerUtil.badRequestResponse(res);
  }
});

// Not tested
OltRouter.get('/logout', async (req, res) => {
  const olt = ImportUtil.CONSTANTS.OLTs[req?.query?.olt];
  if (olt) {
    await ImportUtil.OltUtil.logout(olt);
    ImportUtil.ResHandlerUtil.successResponse(res);
  } else {
    ImportUtil.ResHandlerUtil.badRequestResponse(res);
  }
});

OltRouter.get('/refresh-onulist', async (req, res) => {
  const olt = ImportUtil.CONSTANTS.OLTs[req.query?.olt];

  if (olt) {
    ImportUtil.OltUtil.getOnuList(olt, true)
    ImportUtil.ResHandlerUtil.successResponse(res);
  } else {
    ImportUtil.ResHandlerUtil.badRequestResponse(res);
  }
});

OltRouter.get('/onulist', async (req, res) => {
  const olt = ImportUtil.CONSTANTS.OLTs[req.query?.olt];

  if (olt) {
    const onulistData = await ImportUtil.OltUtil.getOnuList(olt);

    ImportUtil.ResHandlerUtil.setContentType(res);
    res.send(JSON.stringify(onulistData));
  } else {
    ImportUtil.ResHandlerUtil.badRequestResponse(res);
  }
});

OltRouter.get('/page', async (req, res) => {
  const r = await ImportUtil.OltUtil.getPage(ImportUtil.OltUtil.getOltPageUrl(ImportUtil.CONSTANTS.OLTs[req.query?.olt], ImportUtil.CONSTANTS.OLT_PAGES[req.query?.page]));
  res.send(r);
});

// /page?olt=NKL_MAIN&page=ONUBASIC&gponid=1&gonuid=1
// 
OltRouter.get('/onupage', async (req, res) => {
  const r = await ImportUtil.OltUtil.getPage(
    ImportUtil.OltUtil.getOnuPageUrl(
      ImportUtil.CONSTANTS.OLTs[req.query?.olt],
      ImportUtil.CONSTANTS.ONU_PAGES[req.query?.page],
      req.query?.gponid,
      req.query?.gonuid,
    )
  );
  await ImportUtil.OltUtil.getWanInfo(ImportUtil.CONSTANTS.OLTs.NKL_MAIN, req);
  res.send(r);
});

module.exports = exports = OltRouter;
