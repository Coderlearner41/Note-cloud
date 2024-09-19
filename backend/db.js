const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook?directConnection=true&tls=false&readPreference=primary"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};

module.exports = connectToMongo;