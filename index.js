const fs = require("fs");
const { DataModel } = require("./models/DataModel");
const { VideoGenerator } = require("./VideoGenerator");

const imagesPath = "./images";
const audioPath = "./audio";

fs.readdir(imagesPath, onRead);

function onRead(error, files) {
  if (error) console.log("An error occurred duing read", error.message);

  const filtered = files.filter((file) => !file.startsWith(".")); // Filters out junk files

  filtered.forEach((file) => {
    const splitFile = file.split(".");
    const name = splitFile[0];

    const imageFile = fs.readFileSync(`${imagesPath}/${name}.jpg`);
    const audioFile = fs.readFileSync(`${audioPath}/${name}.m4a`);

    const imageObject = new DataModel(name, imageFile, "jpg");
    const audioObject = new DataModel(name, audioFile, "m4a", 3);

    const videoGen = new VideoGenerator(imageObject, audioObject);
    videoGen.generate();
  });
}
