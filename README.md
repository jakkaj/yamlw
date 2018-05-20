# yamlw

[Extension on the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jakkaj.vsts-yaml-writer). 

[YouTube video](https://www.youtube.com/watch?v=MavBLz8Gmvc&feature=youtu.be) of the VSTS YamlWriter task.

A package or command line to output YAML based on input parameters. Take build variables and write them to files. 

Updates existing files or create them from scratch. 

It will edit existing values and add new ones, including deep paths. 

```
npm install yamlw
```

## CLI Usage

This tool will wither create a non-existing file or edit and existing file. Use `--dry-run` to *not* save the result - just print it on screen. 

Given this original file

```yaml
replicaCount: 1
image:
  repository: jakkaj/sampletrainer
  tag: dev
  pullPolicy: IfNotPresent
outputs:
  modelfolder: /mnt/azure/
  mountpath: /mnt/azure
build:
  number: 1
```

```
yamlw -f samples/sample.yaml --set "build.number=23,something.else='my value'"
```

```yaml
replicaCount: 1
image:
  repository: jakkaj/sampletrainer
  tag: dev
  pullPolicy: IfNotPresent
outputs:
  modelfolder: /mnt/azure/
  mountpath: /mnt/azure
build:
  number: 23
something:
  else: my value

```

## Module Usage

```javascript
var yamlwriter = require('yamlw');

var dry = true; //dry run, will not write file
var set = "build.number=23,something.else='my value'";
yamlwriter('/path/to/file', dry, set);

```


