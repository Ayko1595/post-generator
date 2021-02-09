const AppHelper = require("./utils/AppHelper");

const app = new AppHelper(3000);

app.start(() => {
  console.log(`App listening at http://localhost:${app.port}`);
});
