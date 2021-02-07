const { FileModel } = require("../models/FileModel");
const { VideoGenerator } = require("../VideoGenerator");

class FilesHelper {
  // Creates an object inner joining form data fields based on same file names (excludes extension)
  static joinByFilenames(fields, files) {
    const fileObjects = {};

    if (!fields) return files;
    if (fields.length === 0) return files;

    fields.forEach((field) => {
      files[field].forEach((file) => {
        const name = file.originalname.split(".")[0];
        fileObjects[name] = { ...fileObjects[name] };
        fileObjects[name][field] = file;
      });
    });

    return fileObjects;
  }

  static async generateVideos(arr) {
    if (!arr) return false;
    if (arr.length === 0) return false;

    for (const fileObj of arr) {
      const imgObj = FileModel.initFromFileObject(fileObj["imageFiles"]);
      const audioObj = FileModel.initFromFileObject(fileObj["audioFiles"]);

      const videoGenerator = new VideoGenerator(imgObj, audioObj);
      await videoGenerator.generate();
    }

    return true;
  }
}

module.exports = {
  FilesHelper,
};
