var ghpages = require("gh-pages");

// Contents of folder which needs to be published to Github Pages.
var basePath = "dist/cap-webview";

// Target directory in gh-pages branch under which the documentation will be published.
var targetDir = "de/latest";

var publishOptions = {
  add: true,
  dest: targetDir,
  repo: 'git@github.com:GayuAnand/dheeran-enterprise-appscript.git'
};

ghpages.publish(basePath, publishOptions, (err) =>
  err
    ? console.error("Error occurred while publishing documentation", err)
    : "Published docs site successfully"
);
