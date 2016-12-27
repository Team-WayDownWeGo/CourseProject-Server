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
        birthDate: { type: Date },
        email: { type: String, match: constants.EMAIL_REGEX },
        image: { type: String, default: '' },
        competitions: [{
            // TODO: decide on information
        }],
        facebookId: { type: String },
        facebookToken: { type: String },
        roles: [{ type: String, default: 'normal', minlength: constants.MIN_ROLE_LENGTH, maxlength: constants.MAX_ROLE_LENGTH }]
    });

userSchema.methods = {
    isValidPassword(password) {
        const realPassHash = this.passHash,
            currentPassHash = encryptor.getPassHash(this.salt, password);
        if (currentPassHash === realPassHash) {
            return true;
        } else {
            return false;
        }
    }
};

userSchema.statics.getOrganizatorMinimumPoints = function() {
    return constants.ORGANIZATOR_MINIMALPOINTS;
};

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');