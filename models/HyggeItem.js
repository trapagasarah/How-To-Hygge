const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const HyggeItem = new Schema ({
    name: String,
    description: String,
    category: String,
    
});

module.exports = mongoose.model('HyggeItem', HyggeItem);