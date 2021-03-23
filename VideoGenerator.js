const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const cliProgress = require("cli-progress");

const { FilesHelper } = require("./utils/FilesHelper");
const { FileModel } = require("./models/FileModel");

ffmpeg.setFfmpegPath(ffmpegPath);

class VideoGenerator {
  constructor(imageObject, audioObject) {
    this.timeLabel = `Merge (${imageObject.originalname}) and (${audioObject.originalname})`;
    this.imageObject = imageObject;
    this.audioObject = audioObject;

    FilesHelper.saveDataToFile(
      this.imageObject.data,
      path.join("./temp", this.imageObject.originalname)
    );
    FilesHelper.saveDataToFile(
      this.audioObject.data,
      path.join("./temp", this.audioObject.originalname)
    );

    this.bar = new cliProgress.SingleBar(
      {
        stopOnComplete: true,
        format: `${this.timeLabel} {bar} {percentage}% | ETA: {eta_formatted} | DUR: {duration_formatted}`,
      },
      cliProgress.Presets.shades_classic
    );
  }

  static async generateVideos(arr) {
    if (!arr) return false;
    if (arr.length === 0) return false;

    let promises = [];

    for (const fileObj of arr) {
      const imgObj = FileModel.initFromFileObject(fileObj["imageFiles"]);
      const audioObj = FileModel.initFromFileObject(fileObj["audioFiles"]);

      const videoGenerator = new VideoGenerator(imgObj, audioObj);
      promises.push(videoGenerator.generate());
    }

    await Promise.all(promises);

    return true;
  }

  generate() {
    const imageName = this.imageObject.name;
    const command = ffmpeg(`./temp/${this.imageObject.originalname}`);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // this.bar.start(7500, 0);

    return new Promise((resolve, reject) => {
      command
        .on("progress", (progress) => {
          // this.bar.update(progress.percent);
          console.log(`Current percentage: ${progress.percent / 100}%`);
        })
        .on("end", () =>
          this.onEnd(this.imageObject, this.audioObject, resolve)
        )
        .on("error", (err) => {
          return reject(new Error(err));
        })
        .loop(this.audioObject.duration)
        .addInput(`./temp/${this.audioObject.originalname}`)
        .videoBitrate("2048k")
        .videoCodec("mpeg4")
        .size("1024x1024")
        .save(
          `./output/${year}${month < 10 ? 0 : ""}${month}${day}${imageName}.mp4`
        );
    });
  }

  onEnd(imageObject, audioObject, resolve) {
    FilesHelper.deleteFile(path.join(`./temp`, imageObject.originalname));
    FilesHelper.deleteFile(path.join(`./temp`, audioObject.originalname));
    resolve();
  }
}

module.exports = { VideoGenerator };
