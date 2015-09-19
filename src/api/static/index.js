var path = require('path');
var resolve = require('resolve');
var basePath = path.resolve(__dirname, '../../../');
var options = {
    baseDir: basePath,
    moduleDirectory: 'node_modules',
    package: 'package.json'
};
console.log(resolve.sync('bootstrap', options));
//# sourceMappingURL=index.js.map