const path = require("path");
const pathSourceDir = path.join(__dirname, "styles");
const pathSourceFile = path.join(__dirname, "project-dist", "bundle.css");
const fs = require("fs/promises");

compileCssFile(pathSourceDir, pathSourceFile);

async function compileCssFile(pathSourceDir, pathSourceFile) {
  try {
    const files = await fs.readdir(pathSourceDir, { withFileTypes: true });

    const cssFiles = files.filter((file) => {
      return path.extname(file.name) === ".css";
    });

    const result = await Promise.all(cssFiles.map((file) => {
      return fs.readFile(path.join(pathSourceDir, file.name));
    }));

    await fs.writeFile(pathSourceFile, result.join("\n"));
  } catch (err) {
    console.error(err);
  }
};

exports.compileCssFile = compileCssFile;