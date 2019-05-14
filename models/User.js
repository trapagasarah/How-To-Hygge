const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const User = new Schema ({
    id: String,
    name: String,
    email: String,
    hyggeItems: [],
});

module.exports = mongoose.model('User', User);