const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(ffmpegPath);

class VideoGenerator {
  static generate(fullImageName, imageName, audioPath, imagesPath) {
    const command = ffmpeg(`${imagesPath}/${fullImageName}`);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    command
      .on(`Progress (${imageName}):`, VideoGenerator.onProgress)
      .on(`End (${imageName}):`, VideoGenerator.onEnd)
      .on(`Error (${imageName}):`, VideoGenerator.onError)
      .loop(3)
      .addInput(`${audioPath}/${imageName}.m4a`)
      .videoBitrate("2048k")
      .videoCodec("mpeg4")
      .size("1024x1024")
      .save(
        `./output/${year}${month < 10 ? 0 : ""}${month}${day}${imageName}.mp4`
      );
  }

  static onProgress(progress) {
    console.log("Progress:\n", progress);
  }

  static onEnd() {
    console.log("Finished!");
  }

  static onError(error) {
    console.log("An error occurred:", error.message);
  }
}

module.exports = { VideoGenerator };
