#! /usr/bin/env node

const 
    path = require("path"),
    fs = require("fs")
;

try{
    const configPath = path.join(process.cwd(), "jdmconfig.json");
    try {
        fs.statSync(configPath);
    } catch(e) {
        throw new Error("config file not found");
    }

    const config : JdmConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

    let rootPath = checkPath(config.rootPath);

    const files: Array<string> = fs.readdirSync(rootPath);
    const targetFiles: Array<string> = [];
    console.log(files);
    for(let file of files) {
        file = path.join(rootPath, file);
        const fileStat = fs.statSync(file);
        if(fileStat.isFile()) {
            throw new Error(`Found a file, don't have files!\n${file}`);
        }
        targetFiles.push(file);
    }

    let outputPath = checkPath(config.outPath);

    for(const file of targetFiles) {
        
    }


} catch(e) {
    console.log("\x1b[31m%s\x1b[0m", `Error: ${e.message}`);
}

interface JdmConfig {
    readonly rootPath: string;
    readonly outPath: string;
}

function checkPath(filePath: string): string {
    try {
        fs.stat(filePath);
    } catch(e) {
        filePath = path.join(process.cwd(), path);
        try {
            fs.stat(filePath);
        } catch(e) {
            throw new Error("outPath is invalid");
        }
    }
    return filePath;
}