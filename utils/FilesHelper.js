const fs = require("fs");
const path = require("path");

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

	static dirExists(directory) {
		const directoryName = directory.split("/")[0];
		if (fs.existsSync(directoryName)) {
			console.log("Dir exists: ", directoryName);
			return true;
		}
		return false;
	}

	static createDir(directory) {
		console.log("Create dir: ", directory);
		const directoryName = directory.split("/")[0];
		fs.mkdirSync(directoryName);
	}

	static saveDataToFile(data, directory) {
		try {
			if (!FilesHelper.dirExists(directory)) {
				FilesHelper.createDir(directory);
			}
			fs.writeFileSync(directory, data);
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
}

module.exports = {
	FilesHelper,
};
