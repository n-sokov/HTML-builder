const { stdout } = process;
const path = require("path");
const fs = require("fs");
const pathSourceFile = path.join(__dirname, "text.txt");
const input = fs.createReadStream(pathSourceFile, "utf-8");

let outputData = "";

input.on("data", (chunk) => outputData += chunk);
input.on("end", () => stdout.write(outputData));
input.on("error", (error) => stdout.write(error.message));