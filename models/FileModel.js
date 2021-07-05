class FileModel {
	constructor(originalname, name, data, extension, duration = undefined) {
		this.originalname = originalname;
		this.name = name;
		this.data = data;
		this.extension = extension;
		this.duration = duration;
	}

	static initFromFileObject(file) {
		const splitName = file.originalname.split(".");
		const fileName = splitName[0];
		const fileData = file.buffer;
		const fileExtension = splitName[1];
		// TODO: If mimetype === audio -> get duration
		return new FileModel(
			file.originalname,
			fileName,
			fileData,
			fileExtension,
			3
		);
	}
}

module.exports = { FileModel };
