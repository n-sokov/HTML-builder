const fs = require("fs/promises");
const path = require("path");
const { copy } = require("../04-copy-directory/index");
const { compileCssFile } = require("../05-merge-styles/index");

async function bundle(pathComponentsDir, pathTemplate, pathDestDir) {
  try {
    const componentsFiles = await fs.readdir(pathComponentsDir, { withFileTypes: true });
    const componentsHtmlFiles = componentsFiles.filter((file) => {
      return path.extname(file.name) === ".html";
    });
    const componentsHtmlFilesNames = componentsHtmlFiles.map((file) => {
      return file.name.replace(".html", "");
    });
    const componentsHtmlFilesContent = await Promise.all(
      componentsHtmlFilesNames.map((el) => {
        return fs.readFile(path.join(pathComponentsDir, el + ".html"), "utf-8");
      })
    );

    const componentsContentObj = componentsHtmlFilesNames.map((el, index) => {
      const contentObj = {};
      contentObj[el] = componentsHtmlFilesContent[index];
      return contentObj;
    });

    const templateContent = await fs.readFile(pathTemplate, "utf-8");
    let indexContent = templateContent;

    componentsContentObj.forEach((obj) => {
      for (const prop in obj) {
        indexContent = indexContent.replace(`{{${prop}}}`, obj[prop]);
      }
    });

    await fs.writeFile(pathDestDir, indexContent);

  } catch (err) {
    console.error(err);
  }
}

async function build() {
  await copy(path.join(__dirname, "assets"), path.join(__dirname, "project-dist", "assets"));
  await compileCssFile(path.join(__dirname, "styles"), path.join(__dirname, "project-dist", "style.css"));
  await bundle(path.join(__dirname, "components"), path.join(__dirname, "template.html"), path.join(__dirname, "project-dist", "index.html"));
}

build();