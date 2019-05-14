const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const CustomItem = new Schema ({
    userId: String,
    name: String,
    category: String
});

module.exports = mongoose.model('CustomItem', CustomItem);