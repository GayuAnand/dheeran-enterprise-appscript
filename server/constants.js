
// const OLTs = {
//   NKL_MAIN: 'https://192.168.0.42',
// };

const OLTs = {
  NKL_MAIN: 'https://117.247.111.211:55100',
  NKL_MAIN_EXT1: 'https://117.247.111.211:55199',
};

const OLT_PAGES = {
  ONUAUTHINFO: '/action/onuauthinfo.html',
};

const ONU_PAGES = {
  ONUBASIC: '/action/onuBasic.html',
  ONUCONFIG: '/action/onuconfig.html',
  WAN: '/action/onuWanv4v6.html',
};

const MSGS = {
  INTERNAL_SERVER_ERROR: 'Internal server error.',
};

module.exports = exports = {
  OLTs,
  OLT_PAGES,
  ONU_PAGES,
  MSGS,
};
