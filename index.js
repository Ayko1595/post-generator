const express = require("express");
const {
  body,
  validationResult,
  check,
  checkSchema,
} = require("express-validator");
const { FileModel } = require("./models/FileModel");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(
  "/generateVideo",
  checkSchema({
    imageFiles: {
      isArray: {
        errorMessage: "imageFiles has to be an array.",
      },
      notEmpty: {
        errorMessage: "imageFiles cannot be empty.",
      },
    },
    ...FileModel.getSchema("imageFiles"),
    ...FileModel.getSchema("audioFiles"),
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("Hello World!");
  }
);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
