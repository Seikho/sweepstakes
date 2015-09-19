var fs = require('fs');
var path = require('path');
var packagePath = path.resolve(path.join('..', 'package.json'));
var packageJson = JSON.parse(fs.readFileSync(packagePath).toString());
module.exports = packageJson;
//# sourceMappingURL=package.js.map