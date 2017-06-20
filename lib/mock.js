var fs = require('fs');
var path = require('path');

// 递归创建文件路径
function createPath(pathName) {
    pathName = path.resolve(pathName);
    var parentPath = path.dirname(pathName);
    if (!fs.existsSync(parentPath)) {
        createPath(parentPath);
    }
    if (!fs.existsSync(pathName)) {
        fs.mkdirSync(pathName);
    }
}

function touchFile(filePath) {
    filePath = path.resolve(filePath);
    var dirPath = path.dirname(filePath);
    createPath(dirPath);
    fs.writeFileSync(filePath, 'module.exports = {mockKey: "mockValue"}');
}

module.exports = function (regTable) {
    return function (req, res, next) {
        var matchFlag = false;
        if (req.originalUrl.indexOf('.map') !== -1) {
            return;
        }
        for (var i = 0; i < regTable.length; i++) {
            if (regTable[i].test(req.originalUrl)) {
                matchFlag = true;
                break;
            }
        }
        if (matchFlag) {
            // var filePath = path.resolve('./mock' + req.path + '.js');
            // if (!fs.existsSync(filePath)) {
            //     touchFile(filePath);
            // }
            // delete require.cache[filePath];
            // var result = require(filePath);
            var result = {
                num: Math.ceil(Math.random()*10)
            };
            res.send(result);
        }
        else {
            res.send('invalid api path!');
        }
    };
};
