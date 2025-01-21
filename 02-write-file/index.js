const { stdin, stdout } = process;
const path = require("path");
const pathSourceFile = path.join(__dirname, "text.txt");
const fs = require("fs");
const output = fs.createWriteStream(pathSourceFile);

stdout.write("Hi, please, enter the text:\n");
stdin.on("data", (data) => {
  if (data.toString().trim().toLowerCase() === "exit") {
    process.exit();
  }
  output.write(data);
})

process.on("exit", () => {
  stdout.write("Goodbye!");
});

process.on("SIGINT", () => {
  process.exit();
})