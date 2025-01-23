const fs = require("fs/promises");
const path = require("path");
const src = path.join(__dirname, "files");
const dist = path.join(__dirname, "files-copy");

copy(src, dist);

async function copy(sourceDir, destDir) {
  try {
    await fs.mkdir(destDir, { recursive: true });

    const sourceFiles = await fs.readdir(sourceDir, { withFileTypes: true });
    const destFiles = await fs.readdir(destDir, { withFileTypes: true });

    const sourceFileNames = new Set(sourceFiles.map((el) => el.name));

    for (const file of destFiles) {
      const destPath = path.join(destDir, file.name);
      if (!sourceFileNames.has(file.name)) {
        await fs.rm(destPath, { recursive: true, force: true });
      }
    }

    for (const file of sourceFiles) {
      const sourcePath = path.join(sourceDir, file.name);
      const destPath = path.join(destDir, file.name);

      if (file.isDirectory()) {
        await copy(sourcePath, destPath);
      } else if (file.isFile()) {
        await fs.copyFile(sourcePath, destPath);
      }
    }
  } catch (err) {
    console.error("Error copy directories:", err.message);
  }
}

exports.copy = copy;