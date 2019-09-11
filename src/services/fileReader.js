const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;

const fileExist = promisify(fs.exists);
const readFile = promisify(fs.readFile);

async function readJson(fileName) {
  if (path.extname(fileName) !== ".json") {
    throw "File provided should be in json format";
  }

  const fileExists = await fileExist(fileName);

  if (!fileExists) {
    throw "File on provided path does not exist";
  }

  const contents = await readFile(fileName, "utf-8");

  return JSON.parse(contents);
}

module.exports = {
  readJson
};
