'use strict';

const User = require('../models/user-model');
const passport = require('passport');
const encryption = require('../utilities/encryption');
const config = require('../config');
const jwt = require('jwt-simple');

// function getToken(headers) {
//     if (headers && headers.authorization) {
//         var parted = headers.authorization.split(' ');
//         if (parted.length === 2) {
//             return parted[1];
//         } else {
//             return null;
//         }
//     } else {
//         return null;
//     }
// };

module.exports = ({ data }) => {
    return {
        registerUser(req, res) {
            let body = req.body;
            const user = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastname: req.body.lastName,
                passHash: req.body.password
            };
            console.log(user);

            // if (data.getUserByUsername(user.username)) {
            //     res.json({ message: `User with username '${user.username}' already exists.` });
            //     return;
            // }

            data.createUser(user)
                
        }
        // loginUser(req, res, next) {
        //     User.findOne({ username: req.body.username }, (err, user) => {
        //         if (err) {
        //             throw err;
        //         }

        //         if (!user) {
        //             res.json('{\'error\': \'Invalid username or password.\'}');
        //         } else {
        //             if (user.isValidPassword(req.body.password)) {
        //                 let token = 'JWT ' + jwt.encode(user, config.jwtSecret);
        //                 let result = {
        //                     token,
        //                     username: user.username,
        //                     firstname: user.firstname,
        //                     lastname: user.lastname,
        //                     _id: user._id,
        //                     about: user.about,
        //                     signature: user.signature,
        //                     imageDataUrl: user.imageDataUrl
        //                 };

        //                 return res.json({ result });
        //             }

        //             return res.json('{\'error\': \'Invalid username or password.\'}');
        //         }
        //     });
        // },
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