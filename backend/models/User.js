const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);

// So, in summary, the line module.exports = mongoose.model('User', UserSchema); exports a Mongoose model 
// named 'User' with the specified schema UserSchema, making it accessible for use in other parts of your Node.js 
// application. Other files can import this model using require() and then interact with the MongoDB collection 
// associated with the 'User' model.
