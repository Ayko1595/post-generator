var ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
var ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(ffmpegPath);

console.log("Running command");

var command = ffmpeg("test-files/images/lion.jpg");

command
  .on("progress", onProgress)
  .on("end", onEnd)
  .on("error", onError)
  .loop(3)
  .addInput("test-files/audio/lion.m4a")
  .videoBitrate("2048k")
  .videoCodec("mpeg4")
  .save("./output/test.mp4"); // output the first video file

function onProgress(progress) {
  console.log("Progress:\n", progress);
}

function onEnd() {
  console.log("Finished!");
}

function onError(error) {
  console.log("An error occurred:", error.message);
}
