class FileModel {
  constructor(name, data, extension, duration = undefined) {
    this.name = name;
    this.data = data;
    this.extension = extension;
    this.duration = duration;
  }

  static initFromFileObject(file) {
    const splitName = file.originalname.split(".");
    const fileName = splitName[0];
    const fileData = file.buffer;
    const fileExtension = splitName[1];
    // TODO: If mimetype === audio -> get duration
    return new FileModel(fileName, fileData, fileExtension, 3);
  }

  static getSchema(objectName) {
    return {
      [`${objectName}.*.name`]: {
        isString: {
          errorMessage: "File name has to be a string.",
        },
        notEmpty: {
          errorMessage: "File name cannot be empty.",
        },
      },
      [`${objectName}.*.data`]: {
        notEmpty: {
          errorMessage: "File has to have data.",
        },
      },
      [`${objectName}.*.extension`]: {
        isString: {
          errorMessage: "Extension has to be a string.",
        },
        notEmpty: {
          errorMessage: "Extension cannot be empty.",
        },
      },
      [`${objectName}.*.duration`]: {
        optional: { options: { nullable: true } },
        isInt: {
          errorMessage: "Duration has to be a positive number.",
          options: {
            min: 0,
          },
        },
      },
    };
  }
}

module.exports = { FileModel };