const express = require("express");
const cors = require("cors");

class AppHelper {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.setup();
  }

  setup() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());

    // ROUTES
    this.app.use(require("../routes/generateVideos"));
    // this.app.use(require("../routes/auth"));
  }

  start(listener) {
    return this.app.listen(this.port, listener);
  }
}

module.exports = AppHelper;
