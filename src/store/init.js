var fs = require('fs');
var location = require('./location');
function init() {
    try {
        var exists = fs.statSync(location.main);
        return false;
    }
    catch (ex) {
        var base = fs.readFileSync(location.base);
        fs.writeFileSync(location.main, base);
        return true;
    }
}
module.exports = init;
//# sourceMappingURL=init.js.map