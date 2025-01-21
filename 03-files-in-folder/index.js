const path = require("path");
const pathSourceDir = path.join(__dirname, "secret-folder");
const fs = require("fs");

fs.readdir(pathSourceDir, { withFileTypes: true }, (error, files) => {
  if (error) {
    throw new Error(error.message)
  }
  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat(path.join(pathSourceDir, file.name), (err, info) => {
        if (err) {
          throw new Error(err.message);
        }
        const ext = path.extname(file.name);
        const name = path.basename(file.name, ext);
        const size = (info.size / 1000).toFixed(1) + "kb";
        console.log(`${name} - ${ext} - ${size}`);
      })
    }
  })
})