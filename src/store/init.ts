import fs = require('fs');
import location = require('./location');
export = init;

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