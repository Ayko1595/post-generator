class DataModel {
  constructor(name, data, extension, duration = undefined) {
    this.name = name;
    this.data = data;
    this.extension = extension;
    this.duration = duration;
  }
}

module.exports = { DataModel };
