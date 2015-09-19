import fs = require('fs');
import path = require('path');
export = packageJson;

var packagePath = path.resolve(path.join('..', 'package.json'));
var packageJson: PackageJson = JSON.parse(fs.readFileSync(packagePath).toString());

interface PackageJson {
    name: string,
    version: string,
    description: string,
    main: string,
    author: string,
    license: string,
    homepage: string,
};