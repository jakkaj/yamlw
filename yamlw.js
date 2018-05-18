// (c) 2018 Jordan Knight (jakkaj@gmail.com)
// This code is licensed under MIT license (see LICENSE.txt for details)

var fs = require('fs');
var fs2 = require("fs-extra");
var path = require('path');
var yaml = require('js-yaml');


var yamlwriter = function (file, dryrun, optionsstring) {
    try {

        var doc;

        if (fs.existsSync(file)) {
            doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        } else {
            doc = {};
        }

        var lIn = optionsstring;

        var splitted = lIn.split(',');

        for (let item of splitted) {
            if(item.indexOf('=')==-1){
                break;
            }
            var splitEquals = item.split("=");

            var splitItem = splitEquals[0].split('.');
           
            var base = doc;

            for (let pathItem of splitItem) {
                
                pathItem = pathItem.trim();
                
                if (pathItem == splitItem[splitItem.length - 1]) {
                    break;
                }

                let item = base[pathItem];
                if (!item) {

                    base[pathItem] = {};
                }
                base = base[pathItem];
            }
            var lProc = "doc." + item;
            eval(lProc);
        }

        var d = yaml.safeDump(doc);

        if (dryrun === false) {
            console.log(`Writing file: ${file}`)
            fs2.ensureDirSync(path.dirname(file));
            fs.writeFileSync(file, d);
        } else {
            console.log(`Dry-run. Skipping file write`);
        }
        //console.log(d);

        return d;
    } catch (e) {
        console.log(e);
    }
}

module.exports = yamlwriter;

