// (c) 2018 Jordan Knight (jakkaj@gmail.com)
// This code is licensed under MIT license (see LICENSE.txt for details)

var fs = require('fs');
var fs = require("fs-extra");
var path = require('path');
var yaml = require('js-yaml');


var yamlwriter = function(file, dryrun, optionsstring){
    try {

        var doc;
    
        if(fs.existsSync(file)){
            doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));    
        }else{
            doc = {};
        }
    
                var lIn = optionsstring;
        var splitted = lIn.split(',');
    
        for (let item of splitted) {

            var splitItem = item.split('.');
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
        
        if(!dryrun){
            console.log(`Writing: ${file}`)
            fs.ensureDirSync(path.dirname(file));
            fs.writeFileSync(file, d);
        }
        console.log(d);
    } catch (e) {
        console.log(e);
    }
}
    
module.exports = yamlwriter;

