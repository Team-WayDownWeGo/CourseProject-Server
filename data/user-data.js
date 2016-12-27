'use strict';

const hashing = require('../utilities/encryption');

module.exports = function (models) {

    return {
        createUser(user) {
            return new Promise((resolve, reject) => {
                const salt = hashing.getSalt(),
                    passHash = hashing.getPassHash(salt, user.passHash);
                    console.log('vutre');
                const User = new User({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    passHash: passHash,
                    salt: salt
                });
                newUser.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newUser);
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ 'username': username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
    }
}