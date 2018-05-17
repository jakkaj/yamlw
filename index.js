#!/usr/bin/env node

// (c) 2018 Jordan Knight (jakkaj@gmail.com)
// This code is licensed under MIT license (see LICENSE.txt for details)

//example:
//yw -f samples/sample2.yaml --set "build.number=23,something.else='skdlfjlksdf'"

var program = require('commander');
var yamlwriter = require('./yamlwriter');

program
    .version('0.1.0')
    .option('-d, --dryrun', "Don't save the output, just print it on screen")
    .option('-f, --file [file]', 'The file to load or create')
    .option('-s, --set [options]', 'Variables to set separated by commas - e.g. "build=true,system.image.version=12"')

    .parse(process.argv);

if (!program.file) {
    console.log("Please pass in a file with the -f or --file argument");
    process.exit(1);
}

if (!program.set) {
    console.log('Please pass in variables with the -s or --set argument. Variables to set separated by commas - e.g. "build=true,system.image.version=12"');
    process.exit(1);
}

var file = program.file;
var set = program.set;
var dry = program.dryrun;

if (dry) {
    console.log("Doing a dry run");
}

yamlwriter(file, dry, set);