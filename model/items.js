var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
    item:String
    
});

module.exports = mongoose.model('Item',item);