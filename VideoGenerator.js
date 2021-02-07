const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

class VideoGenerator {
  constructor(imageObject, audioObject) {
    this.imageObject = imageObject;
    this.audioObject = audioObject;
    this.saveDataToFile(
      imageObject.data,
      imageObject.name,
      imageObject.extension
    );
    this.saveDataToFile(
      audioObject.data,
      audioObject.name,
      audioObject.extension
    );
  }

  saveDataToFile(data, name, extension) {
    try {
      fs.writeFileSync(`./temp/${name}.${extension}`, data);
    } catch (error) {
      this.printError(error);
    }
  }

  deleteFile(name, extension) {
    try {
      fs.unlinkSync(`./temp/${name}.${extension}`);
    } catch (error) {
      this.printError(error);
    }
  }

  generate() {
    const imageName = this.imageObject.name;
    const command = ffmpeg(`./temp/${imageName}.${this.imageObject.extension}`);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return new Promise((resolve, reject) => {
      command
        .on("progress", this.onProgress)
        .on("end", () =>
          this.onEnd(this.imageObject, this.audioObject, resolve)
        )
        .on("error", (err) => {
          return reject(new Error(err));
        })
        .loop(this.audioObject.duration)
        .addInput(
          `./temp/${this.audioObject.name}.${this.audioObject.extension}`
        )
        .videoBitrate("2048k")
        .videoCodec("mpeg4")
        .size("1024x1024")
        // TODO: Should probably divide based on current user or something
        .save(
          `./output/${year}${month < 10 ? 0 : ""}${month}${day}${imageName}.mp4`
        );
    });
  }

  onProgress(progress) {
    console.log("Progress:\n", progress);
  }

  onEnd(imageObject, audioObject, resolve) {
    console.log("Finished!");
    this.deleteFile(imageObject.name, imageObject.extension);
    this.deleteFile(audioObject.name, audioObject.extension);
    resolve();
  }

  printError(error) {
    console.log("An error occurred:\n", error.message);
  }
}

module.exports = { VideoGenerator };
