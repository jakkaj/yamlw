
var fs = require('fs');

var yaml = require('js-yaml');

var yamlwriter = function(file, dryrun, optionsstring){
    try {

        var doc;
    
        if(fs.existsSync(file)){
            doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));    
        }else{
            doc = {};
        }
    
        //console.log(doc);
        var lIn = optionsstring;//"build.number=21,something.else='skdlfjlksdf'";
        var splitted = lIn.split(',');
    
        for (let item of splitted) {
            var splitItem = item.split('.');
            var base = doc;
    
            for (let pathItem of splitItem) {
    
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
            fs.writeFileSync(file, d);
        }
        console.log(d);
    } catch (e) {
        console.log(e);
    }
}
    
export default yamlwriter;

