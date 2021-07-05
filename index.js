require("dotenv").config();

const config = require("./config");
const AppHelper = require("./utils/AppHelper");

const app = new AppHelper(config.port);

app.start(() => {
	console.log(`App listening at http://localhost:${config.port}`);
});
