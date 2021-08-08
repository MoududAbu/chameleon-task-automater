const fs = require("fs");

const fileReader = (path, callback) => fs.readFile(path, (error, data) => {
    if(error) {
        throw error;
    }
    return callback(data.toString());
});

const fileWriter = (path, fileUpdate) => fs.writeFile(path, fileUpdate, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

module.exports = {
    fileReader,
    fileWriter
}