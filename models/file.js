const mongoose = require("../database");
 
var mongoose = require('mongoose');
 
var fileSchema = new mongoose.Schema({
    name: String,
    user_email: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
 
module.exports = new mongoose.model('Files', fileSchema);