const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Category = new Schema ({
    name: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Category', Category);