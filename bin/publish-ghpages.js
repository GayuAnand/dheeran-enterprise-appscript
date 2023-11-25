var ghpages = require("gh-pages");

var publishOptions = {
  add: true,
  repo: 'git@gayu.github.com:GayuAnand/dheeran-enterprise-appscript.git',
};

ghpages.publish("dist/cap-webview", publishOptions, (err) =>
  err
    ? console.error("Error occurred while publishing documentation", err)
    : "Published docs site successfully"
);
