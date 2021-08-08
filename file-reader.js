const fs = require("fs");

// __dirname means relative to script. Use "./data.txt" if you want it relative to execution path.
const fileReader = (path, callback) => fs.readFile(path, (error, data) => {
    if(error) {
        throw error;
    }
    return callback(data.toString());
});

module.exports = {
    fileReader
}