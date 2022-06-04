const fs = require("fs");
const request = require('request');
const readLine = require('readline');

module.exports = {
    pwd: (args, done) => done(process.cwd()),
    date: (args, done) => done(Date()),
    ls: (args, done) => {
        let output = "";
        fs.readdir(".", (err, files) => {
            if (err) throw err;
            files.forEach((file) => {
                output += file.toString() + "\n";
            });
            done(output);
        });
    },
    echo: (args, done) => done(args.join(" ")),
    cat: (args, write) => {
        fs.readFile(args[0], "utf-8", (err, data) => {
            if (err) throw err;
            write(data);
        });
    },
    head: (args, done) => {
        fs.readFile(args[0], "utf-8", (err, data) => {
            if (err) throw err;
            const lines = data.split("\n");
            done(lines.slice(0, (args[1] ? parseInt(args[1]) : 10)).join("\n"));
        });
    },
    tail: (args, done) => {
        fs.readFile(args[0], "utf-8", (err, data) => {
            if (err) throw err;
            const lines = data.split("\n");
            done(lines.slice((args[1] ? parseInt(args[1]) : 10) * -1).join("\n"));
        });
    },
    curl: (args, done) => {
        request(args[0], function (error, response, body) {
            if (error) throw error;
            done(body);
        });
    },
    wc: (args, done) => {
        //pendiente
    }
}