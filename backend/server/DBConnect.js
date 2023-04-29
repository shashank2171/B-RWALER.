const mongoose = require('mongoose');
const dotenv= require('dotenv')
const db = 'test';
dotenv.config();

async function dbConnect(){
    const dbUrl = process.env.DB_URI;

    mongoose.connect(dbUrl)
        .then(() => console.log('DB Connected'))
        .catch((err) => console.log(err));
}

module.exports = dbConnect;