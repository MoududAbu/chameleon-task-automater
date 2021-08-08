const fs = require("fs");
const path = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const directoryPath = path.join(
  __dirname,
  "../sounds-components/src/components"
);

const fileReader = (path, callback) =>
  fs.readFile(path, (error, data) => {
    if (error) {
      throw error;
    }
    return callback(data.toString());
  });

const fileWriter = (path, fileUpdate) =>
  fs.writeFile(path, fileUpdate, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

const outputDir = (directoryPath) => {
  console.log(directoryPath);
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
      console.log(file);
    });
  });
};

const getDirInput = (rootPath) => {
  rl.question("Choose a directory: \n", function (chosenDirectory) {
    const newPath = `${rootPath}/${chosenDirectory}`;
    // TODO create a new function to read all files and read only scss
    rl.close();
  });
};

const getDirPath = () => {
  outputDir(directoryPath);
  getDirInput(directoryPath, outputDir);
};

module.exports = {
  fileReader,
  fileWriter,
  getDirPath,
};
