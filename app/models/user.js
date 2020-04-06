var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable
var bcrypt = require('bcrypt-nodejs'); // Import Bcrypt Package


// User Mongoose Schema
var UserSchema = new Schema({
    email: { type: String, lowercase: true, required: true, unique: true},
    password: { type: String, required: true},
    
});


// Middleware to ensure password is encrypted before saving user to database
UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next(); // If password was not changed or is new, ignore middleware

    // Function to encrypt password 
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err); // Exit if error is found
        user.password = hash; // Assign the hash to the user's password so it is saved in database encrypted
        next(); // Exit Bcrypt function
    });
});

module.exports = mongoose.model('User', UserSchema)