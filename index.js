const fs = require("fs");
const { VideoGenerator } = require("./VideoGenerator");

const imagesPath = "./images";

fs.readdir(imagesPath, onRead);

function onRead(error, files) {
  if (error) console.log("An error occurred duing read", error.message);

  const filtered = files.filter((file) => !file.startsWith(".")); // Filters out junk files

  filtered.forEach((file) => {
    const splitFile = file.split(".");
    const name = splitFile[0];
    VideoGenerator.generate(file, name, "./audio", imagesPath);
  });
}
