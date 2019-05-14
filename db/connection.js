require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
    console.log('Mongoose has connected to MongoDB')
});

module.exports = mongoose
