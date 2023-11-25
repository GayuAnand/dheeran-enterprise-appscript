const CONSTANTS = require('./constants');

let latestVersion = CONSTANTS.VERSIONINFO.latest;
const versionNumbers = latestVersion.split('.');
const previousBuildNumber = parseInt(versionNumbers[versionNumbers.length - 1]);
latestVersion = latestVersion.replace(/\.(\d+)$/, `.${previousBuildNumber + 1}`);

console.info(`Incrementing build number from ${previousBuildNumber} to ${previousBuildNumber + 1}.`);
console.info(`New version: ${latestVersion}`);

CONSTANTS.fs.writeFileSync(CONSTANTS.VERSIONINFO_FILEPATH, JSON.stringify({ latest: latestVersion }), 'utf8');
