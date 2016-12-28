'use strict';

const hashing = require('../utilities/encryption');

module.exports = function(models) {
    const User = models.User;
    return {
        createUser(user) {
            return new Promise((resolve, reject) => {
                const salt = hashing.getSalt(),
                    passHash = hashing.getPassHash(salt, user.passHash);
                console.log('vutre vutre vutre');
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
        sendMessage({ username, message }) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $push: { 'outbox': message } })
                    .then(() => {
                        let inboxMessage = {
                            message: message.message,
                            date: message.date,
                            user: {
                                username: username
                            }
                        }

                        username = message.user.username;
                        return ({ username, inboxMessage })
                    }).then(({ username, inboxMessage }) => {
                        User.findOneAndUpdate({ 'username': username }, { $push: { 'inbox': inboxMessage } })
                            .then((done) => {
                                resolve(done);
                            }).catch(err => reject(err));
                    });
            });
        },
        getAllInboxMessages(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user.inbox);
                })
            })
        },
        getAllOutboxMessages(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user.outbox);
                })
            })
        },

        getAllOutboxMessagesToUser({ username, queryUser }) {
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    let messages = user.outbox.filter((el) => {
                        return (el.user.username == queryUser);
                    });

                    return resolve(messages);
                })
            })
        },
        getAllInboxMessagesFromUser({ username, queryUser }) {
            console.log('here')
            console.log(username);
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    console.log('here')
                    console.log(username);
                    console.log(user);
                    let messages = user.inbox.filter((el) => {
                        return (el.user.username == queryUser);
                    });

                    return resolve(messages);
                })
            })
        },

    }
};