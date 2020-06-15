const path = require('path');

class FileXfer {
  constructor(adb, destinationDir) {
    this._adb = adb;
    this._dir = destinationDir;
  }

  async prepareDestinationDir(deviceId) {
    await this._adb.shell(deviceId, `rm -fr ${this._dir}`);
    await this._adb.shell(deviceId, `mkdir -p ${this._dir}`);
  }

  async send(deviceId, sourcePath, destinationFilename) {
    const destinationPath = path.join(this._dir, destinationFilename);
    await this._adb.push(deviceId, sourcePath, destinationPath);
    return destinationPath;
  }
}

const EMU_TEMP_PATH = '/data/local/tmp';
const EMU_TEMP_INSTALL_PATH = `${EMU_TEMP_PATH}/detox`;

class TempFilesXfer extends FileXfer {
  constructor(adb) {
    super(adb, EMU_TEMP_INSTALL_PATH);
  }
}

module.exports = FileXfer;
module.exports.TempFilesXfer = TempFilesXfer;
