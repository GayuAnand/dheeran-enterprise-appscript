const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const CONSTANTS = {
  fs,
  path,
  archiver,
  VERSIONINFO_FILENAME: 'versionInfo.json',
};

CONSTANTS.VERSIONINFO_FILEPATH = path.join(__dirname, '..', 'src', CONSTANTS.VERSIONINFO_FILENAME);
CONSTANTS.VERSIONINFO = require(CONSTANTS.VERSIONINFO_FILEPATH);

CONSTANTS.WEB_BUILD_OUTPUT = path.join(__dirname, '..', 'dist', 'cap-webview');

CONSTANTS.TMP_ZIP_FOLDERPATH = path.join(__dirname, '..', 'dist', 'zip');
CONSTANTS.TMP_ZIPFILE_PATH = path.join(CONSTANTS.TMP_ZIP_FOLDERPATH, `${CONSTANTS.VERSIONINFO.latest}.zip`);

fs.mkdirSync(path.join(CONSTANTS.WEB_BUILD_OUTPUT, 'zip'), { recursive: true });
CONSTANTS.DEST_ZIPFILE_PATH_FIX = path.join(CONSTANTS.WEB_BUILD_OUTPUT, `android.zip`);
CONSTANTS.DEST_ZIPFILE_PATH_FIX1 = path.join(CONSTANTS.WEB_BUILD_OUTPUT, 'zip', `${CONSTANTS.VERSIONINFO.latest}.zip`);
CONSTANTS.DEST_ZIPFILE_PATH_FIX2 = path.join(CONSTANTS.WEB_BUILD_OUTPUT, `ui-package.zip`);
CONSTANTS.DEST_ZIPFILE_PATH = path.join(CONSTANTS.WEB_BUILD_OUTPUT, `${CONSTANTS.VERSIONINFO.latest}.zip`);

CONSTANTS.SRC_APKPATH = path.join(__dirname, '..', 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
CONSTANTS.DEST_APKPATH = path.join(CONSTANTS.WEB_BUILD_OUTPUT, `${CONSTANTS.VERSIONINFO.latest}.apk`);

CONSTANTS.cleanupDir = function cleanupDir(dirPath) {
  if (CONSTANTS.fs.existsSync(dirPath)) CONSTANTS.fs.rmSync(dirPath, { recursive: true });
  CONSTANTS.fs.mkdirSync(dirPath);
};

CONSTANTS.zipDirectory = function zipDirectory(sourceDir, outPath) {
  const archive = CONSTANTS.archiver('zip', { zlib: { level: 9 }});
  const stream = CONSTANTS.fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());
    archive.finalize();
  });
};

module.exports = exports = CONSTANTS;
