const fs = require("fs");
const path = require("path");
const src = path.join(__dirname, "files");
const dist = path.join(__dirname, "files-copy");

(function copyDir() {
  fs.mkdir(dist, { recursive: true }, (error) => {
    if (error) {
      throw new Error(error.message);
    }
  })

  fs.readdir(src, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error.message)
    }

    files.forEach((file) => {
      const filePath = path.join(src, file.name);
      const filePathCopy = path.join(dist, file.name);
      fs.copyFile(filePath, filePathCopy, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
}) ();