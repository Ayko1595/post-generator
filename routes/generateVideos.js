const express = require("express");
const router = express.Router();
const multer = require("multer");
const { FilesHelper } = require("../utils/FilesHelper");
const { ArchiveHelper } = require("../models/ArchiveHelper");
const IMAGE_FILES = "imageFiles";
const AUDIO_FILES = "audioFiles";
const upload = multer().fields([{ name: IMAGE_FILES }, { name: AUDIO_FILES }]);
const fs = require("fs");
const { FilesValidator } = require("../utils/FilesValidator");

const filesValidatorMiddleW = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.files) {
      return res.status(403).json({
        message: "No files were sent.",
      });
    }

    if (!(req.files[IMAGE_FILES] && req.files[AUDIO_FILES])) {
      return res.status(403).json({
        message:
          "Both fields 'imageFiles' and 'audioFiles' have to be in the form.",
      });
    } else if (
      !(
        FilesValidator.onlyMimetype("image", req.files[IMAGE_FILES]) &&
        FilesValidator.onlyMimetype("audio", req.files[AUDIO_FILES])
      )
    ) {
      return res.status(415).json({
        message: "Only images and audio files are allowed.",
      });
    }
    next();
  });
};

router.use(filesValidatorMiddleW);

router.post("/generateVideos", async (req, res) => {
  const files = req.files;
  const fileKeys = Object.keys(files);
  const fileObjects = FilesHelper.joinByFilenames(fileKeys, files);

  await FilesHelper.generateVideos(Object.values(fileObjects));

  const archiveHelper = new ArchiveHelper();
  await archiveHelper.startCompression();
  const readStream = await fs.createReadStream("./videos.zip");

  res.setHeader("content-type", "application/zip");
  readStream.on("close", () => res.end());
  readStream.pipe(res);
});

module.exports = router;
