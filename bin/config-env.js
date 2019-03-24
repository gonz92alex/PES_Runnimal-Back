
exports.config = function(){
    
    var envJSON = require('./environment.json');
    var node_env = process.env.NODE_ENV || 'local';
    return envJSON[node_env];
}

