const fs = require("fs");
const archiver = require("archiver");

class ArchiveHelper {
  constructor() {
    this.archive = archiver("zip", {
      zlib: { level: 9 },
    });

    this.output = fs.createWriteStream("videos.zip");

    this.output.on("close", function () {
      console.log("ArchiverHelper finalized.");
    });

    this.output.on("end", function () {
      console.log("Data has been drained");
    });

    this.archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        console.log("ENOENT error");
      } else {
        throw err;
      }
    });

    this.archive.on("error", function (err) {
      throw err;
    });
  }

  async startCompression() {
    this.archive.directory("./output", "videos");
    this.archive.pipe(this.output);
    await this.archive.finalize();
  }
}

module.exports = {
  ArchiveHelper,
};
