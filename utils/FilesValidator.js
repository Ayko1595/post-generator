class FilesValidator {
  static onlyMimetype(type, files) {
    if (!type || type === "") {
      return false;
    }
    let isMimetype = true;
    files.forEach((file) => {
      const mimetype = file.mimetype.split("/")[0];
      isMimetype = isMimetype && mimetype === type;
    });

    return isMimetype;
  }
}

module.exports = {
  FilesValidator,
};
