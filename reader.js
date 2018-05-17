
var fs = require('fs');

var yaml = require('js-yaml');
var program = require('commander');
program
    .version('0.1.0')
    .option('-d, --dryrun', "Don't save the output, just print it on screen")
    .option('-f, --file [file]', 'The file to load or create')
    .option('-s, --set [options]', 'Variables to set separated by commas - e.g. "build=true,system.image.version=12"')

    .parse(process.argv);

    if(!program.file){
        console.log("Please pass in a file with the -f or --file argument");
        process.exit(1);
    }

    if(!program.set){
        console.log('Please pass in variables with the -s or --set argument. Variables to set separated by commas - e.g. "build=true,system.image.version=12"');
        process.exit(1);
    }

    var file = program.file;
    var set = program.set;
    var dry = program.dryrun;

    if(dry){
        console.log("Doing a dry run");
    }
    
try {

    var doc;

    if(fs.existsSync(file)){
        doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));    
    }else{
        doc = {};
    }

    //console.log(doc);
    var lIn = set;//"build.number=21,something.else='skdlfjlksdf'";
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
    
    if(!dry){
        console.log(`Writing: ${file}`)
        fs.writeFileSync(file, d);
    }
    console.log(d);
} catch (e) {
    console.log(e);
}