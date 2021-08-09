const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { FileModel } = require("../models/FileModel");

class FilesHelper {
	// Creates an object inner joining form data fields based on same file names (excludes extension)
	static joinByFilenames(fields, files) {
		const fileObjects = {};

		if (!fields) return files;
		if (fields.length === 0) return files;

		fields.forEach((field) => {
			files[field].forEach((file) => {
				const name = file.originalname.split(".")[0];
				fileObjects[name] = { ...fileObjects[name] };
				fileObjects[name][field] = file;
			});
		});

		return fileObjects;
	}

	static folderExists(directory) {
		const directoryName = directory.split("/")[0];
		if (fs.existsSync(directoryName)) {
			return true;
		}
		return false;
	}

	static createFolder(directory) {
		const directoryName = directory.split("/")[0];
		try {
			fs.mkdirSync(directoryName);
		} catch (error) {
			console.log("An error occurred:\n", error.message);
		}
	}

	static saveDataToFile(data, directory, isImage = false) {
		try {
			if (!FilesHelper.folderExists(directory)) {
				FilesHelper.createFolder(directory);
			}
			fs.writeFileSync(directory, data);

			// Resize images
			if (isImage) {
				sharp(directory)
					.resize(512, 512)
					.toBuffer((err, buffer) => {
						if (err) throw error;
						fs.writeFileSync(directory, buffer);
					});
			}
		} catch (error) {
			console.log("An error occurred:\n", error.message);
		}
	}

	static deleteFile(directory) {
		try {
			fs.unlinkSync(directory);
		} catch (error) {
			console.log("An error occurred:\n", error.message);
		}
	}

	static clearFolder(directory) {
		try {
			fs.readdir(directory, (err, files) => {
				if (err) throw err;

				for (const file of files) {
					FilesHelper.deleteFile(path.join(directory, file));
				}
			});
		} catch (error) {
			console.log("An error occurred:\n", error.message);
		}
	}

	static getAllFilesInFolder(directory) {
		const filesArr = [];
		try {
			fs.readdirSync(directory).forEach((file) => {
				filesArr.push(`${directory}/${file}`);
			});
		} catch (error) {
			console.log("An error occurred:\n", error.message);
		}

		console.log(filesArr);
		return filesArr;
	}
}

module.exports = {
	FilesHelper,
};
