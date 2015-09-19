import fs = require('fs');
import path = require('path');
export = packageJson;

var packagePath = path.resolve(path.join('..', 'package.json'));
var packageJson = JSON.parse(fs.readFileSync(packagePath).toString());