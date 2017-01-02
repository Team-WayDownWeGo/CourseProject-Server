'use strict';

const User = require('../models/user-model');
const passport = require('passport');
const encryption = require('../utilities/encryption');
const jwt = require('jwt-simple');

function getToken(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = ({ data, config }) => {
    return {
        registerUser(req, res) {
            const body = req.body;
            let foundUser = false;
            const user = {
                username: body.username,
                firstName: body.firstName,
                lastName: body.lastName,
                passHash: body.password
            };


            data.getUserByUsername(user.username)
                .then(user => {
                    if (user) {
                        foundUser = true;
                        return res.json({ error: `User with username ${user.username} already exists.` });
                    }
                })
                .then(() => {
                    if (!foundUser) {
                        data.createUser(user)
                            .then(() => {
                                res.json({ success: 'Registration successfull' });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({ error: 'Registration failed' });
                            });
                    }
                });
        },
        loginUser(req, res, next) {
            const username = req.body.username,
                password = req.body.password;

            data.getUserByUsername(username)
                .then(user => {
                    if (!user) {
                        return res.json({ error: `${username} is not registered user` });
                    }
                    if (user.isValidPassword(password)) {
                        let token = 'JWT ' + jwt.encode(user, config.jwtSecret);

                        let result = {
                            token,
                            username: user.username,
                            isAdmin: user.isAdmin
                        };

                        return res.json({ result, success: `${username}, successfully logged in` });
                    }

                })
                .catch(err => {
                    console.log(err);
                })
        },
        // logoutUser(req, res) {
        //     req.logout();
        //     res.sendStatus(200);
        // },
        // verifyLogin(req, res) {
        //     var token = getToken(req.headers);
        //     if (token) {
        //         let decoded = jwt.decode(token, config.jwtSecret);
        //         User.findOne({
        //             username: decoded.username
        //         }, function (err, user) {
        //             if (err) throw err;

        //             if (!user) {
        //                 return res.json({ success: false, message: 'User not found.' });
        //             } else {
        //                 res.json({
        //                     success: true,
        //                     user: {
        //                         token,
        //                         username: user.username,
        //                         firstname: user.firstname,
        //                         lastname: user.lastname,
        //                         _id: user._id,
        //                         about: user.about,
        //                         signature: user.signature,
        //                         imageDataUrl: user.imageDataUrl
        //                     }
        //                 });
        //             }
        //         });
        //     } else {
        //         return res.json({ success: false, message: 'No token provided' });
        //     }
        // }
    };
};