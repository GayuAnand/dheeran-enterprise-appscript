var ghpages = require("gh-pages");
var versionInfo = require("./../dist/cap-webview/versionInfo.json");

if (!versionInfo?.latest) {
  throw('versionInfo is not found in dist/cap-webview.')
}

var publishOptions = {
  add: false,
  repo: 'git@gayu.github.com:GayuAnand/dheeran-enterprise-appscript.git',
  tag: versionInfo.latest,
  dotfiles: true, // To include .wellknown folder
};

ghpages.publish("dist/cap-webview", publishOptions, (err) =>
  err
    ? console.error("Error occurred while publishing documentation", err)
    : "Published docs site successfully"
);
