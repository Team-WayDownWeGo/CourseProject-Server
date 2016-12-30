/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    encryptor = require('../utilities/encryption'),
    Schema = mongoose.Schema,
    constants = require('../utilities/constants'),

    userSchema = new Schema({
        username: {
            type: String,
            match: constants.USERNAME_REGEX,
            unique: true,
            required: true,
            minlength: constants.MIN_USERNAME_LENGTH,
            maxlength: constants.MAX_USERNAME_LENGTH
        },
        firstName: {
            type: String,
            match: constants.NAME_REGEX,
            required: true,
            minlength: constants.MIN_NAME_LENGTH,
            maxlength: constants.MAX_NAME_LENGTH
        },
        lastName: {
            type: String,
            match: constants.NAME_REGEX,
            required: true,
            minlength: constants.MIN_NAME_LENGTH,
            maxlength: constants.MAX_NAME_LENGTH
        },
        passHash: { type: String, required: true },
        salt: { type: String, required: true },
        inbox: [{
            message: {
                type: String,
                required: true,
                minlength: constants.MIN_MESSAGE_LENGTH,
                maxlength: constants.MAX_MESSAGE_LENGTH
            },
            user: {
                username: { type: String, required: true },
                id: { type: String }
            },
            date: { type: Date, required: true },
        }],
        outbox: [{
            message: {
                type: String,
                required: true,
                minlength: constants.MIN_MESSAGE_LENGTH,
                maxlength: constants.MAX_MESSAGE_LENGTH
            },
            user: {
                username: { type: String, required: true },
                id: { type: String }
            },
            date: { type: Date, required: true },
        }]
    });

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');