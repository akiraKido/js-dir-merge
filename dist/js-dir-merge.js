#! /usr/bin/env node
var path = require("path"), fs = require("fs");
try {
    var configPath = path.join(process.cwd(), "jdmconfig.json");
    try {
        fs.statSync(configPath);
    }
    catch (e) {
        throw new Error("config file not found");
    }
    var config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    var rootPath = config.rootPath;
    try {
        fs.statSync(rootPath);
    }
    catch (e) {
        rootPath = path.join(process.cwd(), rootPath);
        try {
            fs.statSync(rootPath);
        }
        catch (e) {
            throw new Error("rootPath is not a valid path");
        }
    }
    var files = fs.readdirSync(rootPath);
    console.log(files);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        file = path.join(rootPath, file);
        var fileStat = fs.statSync(file);
        if (fileStat.isFile()) {
            throw new Error("Found a file, don't have files!\n" + file);
        }
    }
}
catch (e) {
    console.log("\x1b[31m%s\x1b[0m", "Error: " + e.message);
}
