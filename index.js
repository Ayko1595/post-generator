const express = require("express");
const {
  body,
  validationResult,
  check,
  checkSchema,
} = require("express-validator");
const { FileModel } = require("./models/FileModel");
const app = express();
const port = 3000;
const cors = require("cors");
const multer = require("multer");
const { VideoGenerator } = require("./VideoGenerator");
const { FilesHelper } = require("./utils/FilesHelper");
const upload = multer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// TODO: Add validation
app.post(
  "/generateVideo",
  upload.fields([{ name: "imageFiles" }, { name: "audioFiles" }]),
  (req, res) => {
    if (!req.files) {
      return res.status(400).json({ errors: "TEST" });
    }

    const files = req.files;
    const fileKeys = Object.keys(files);
    const fileObjects = FilesHelper.joinByFilenames(fileKeys, files);

    Object.values(fileObjects).forEach((fileObj) => {
      const imgObj = FileModel.initFromFileObject(fileObj["imageFiles"]);
      const audioObj = FileModel.initFromFileObject(fileObj["audioFiles"]);

      const videoGenerator = new VideoGenerator(imgObj, audioObj);
      videoGenerator.generate();
    });

    res.send("Hello World!");
  }
);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
