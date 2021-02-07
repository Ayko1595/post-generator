// const FormData = require("form-data");
const fs = require("fs");
const { FilesHelper } = require("../utils/FilesHelper");

const fields = ["imageFiles", "audioFiles"];
const form = new FormData();
// const imageFile = fs.readFileSync(__dirname + "test-files/airport.jpg");
// const audioFile = fs.readFileSync(__dirname + "test-files/airport.m4a");

const testObject = {
  imageFiles: [
    {
      fieldname: "imageFiles",
      originalname: "airport.jpg",
      mimetype: "image/jpeg",
      buffer: undefined,
    },
  ],
  audioFiles: [
    {
      fieldname: "audioFiles",
      originalname: "airport.m4a",
      mimetype: "audio/x-m4a",
      buffer: undefined,
    },
  ],
};

const joinedTestObject = {
  airport: {
    imageFiles: {
      fieldname: "imageFiles",
      originalname: "airport.jpg",
      mimetype: "image/jpeg",
    },
    audioFiles: {
      fieldname: "audioFiles",
      originalname: "airport.m4a",
      mimetype: "audio/x-m4a",
    },
  },
};

describe("joinByFilenames(fields, files)", () => {
  test("returns object joined by file name", () =>
    expect(FilesHelper.joinByFilenames(fields, testObject)).toMatchObject(
      joinedTestObject
    ));

  test("returns the same object if fields is undefined", () =>
    expect(FilesHelper.joinByFilenames([], testObject)).toMatchObject(
      testObject
    ));

  test("returns the same object if fields is empty", () =>
    expect(FilesHelper.joinByFilenames([], testObject)).toMatchObject(
      testObject
    ));
});
