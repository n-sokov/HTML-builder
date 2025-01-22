const fs = require("fs/promises");
const path = require("path");
const src = path.join(__dirname, "files");
const dist = path.join(__dirname, "files-copy");

copy(src, dist);

async function copy(pathSourceDir, pathDestDir) {
  try {
    await fs.mkdir(pathDestDir, { recursive: true });

    const assetsFiles = await fs.readdir(pathSourceDir, { withFileTypes: true });

    for (const el of assetsFiles) {
      const pathSource = path.join(pathSourceDir, el.name);
      const pathDest = path.join(pathDestDir, el.name);

      if (el.isDirectory()) {
        copy(pathSource, pathDest);
      }
      if (el.isFile()) {
        await fs.copyFile(pathSource, pathDest);
      }
    }
  } catch (err) {
    console.error("Error copying files:", err.message);
  }
}

exports.copy = copy;