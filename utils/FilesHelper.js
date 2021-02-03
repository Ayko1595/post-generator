class FilesHelper {
  // Creates an object inner joining form data fields based on same file names (excludes extension)
  static joinByFilenames(fields, files) {
    const fileObjects = {};

    fields.forEach((field) => {
      files[field].forEach((file) => {
        const name = file.originalname.split(".")[0];
        fileObjects[name] = { ...fileObjects[name] };
        fileObjects[name][field] = file;
      });
    });

    return fileObjects;
  }
}

module.exports = {
  FilesHelper,
};
