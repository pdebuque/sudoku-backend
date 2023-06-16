"use strict";
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10; // This determines how secure the salt should be
var encryptPassword = function (password) {
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR); // This generates a random salt
    // This next line hashes the user password and the random salt
    // this salt and hash (and not the actual password) will then get stored in the database
    return bcrypt.hashSync(password, salt);
};
var comparePassword = function (candidatePassword, storedPassword) {
    /*
    This takes in the candidate password (what the user entered) to check it.
    The stored password has the original salt, so it will run the
    candidate password and salt through the same hashing process as before.
    If that result is the same as the stored password, then we have a match!
    If this interests you, check out this video https://www.youtube.com/watch?v=8ZtInClXe1Q
    */
    return bcrypt.compareSync(candidatePassword, storedPassword);
};
module.exports = {
    encryptPassword: encryptPassword,
    comparePassword: comparePassword
};
//# sourceMappingURL=encryption.js.map