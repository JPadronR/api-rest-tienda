const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const adminSchema = Schema({
    usuario:{
        type: String,
        require: true,
        unique: true
    },
    pass:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);