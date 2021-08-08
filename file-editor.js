const fs = require("fs");
const path = require("path");
var glob = require("glob");

const workspaceDirectoryPath = path.join(
  __dirname,
  "../sounds-components/src/components"
);

const componentsType = "organisms";

const fileReader = (path, callback) =>
  fs.readFile(path, (error, data) => {
    if (error) {
      throw error;
    }
    return callback(data.toString(), path);
  });

const fileWriter = async (path, fileUpdate) =>
  await fs.writeFileSync(path, fileUpdate, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

const updateCSS = (fileUpdateCallback) => {
  const componentsPath = `${workspaceDirectoryPath}/${componentsType}/**/*.scss`;
  glob(componentsPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    files.forEach(function (file) {
      fileReader(file, fileUpdateCallback);
      // console.log(file)
    });
  });
};

module.exports = {
  updateCSS,
  fileWriter,
};
