/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    constants = require('../utilities/constants'),
    Status = constants.competitionStatus;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: constants.MIN_TITLE_LENGTH,
        maxlength: constants.MAX_TITLE_LENGTH
    },
    description: {
        type: String,
        minlength: constants.MIN_DESCRIPTION_LENGTH,
        maxlength: constants.MAX_DESCRIPTION_LENGTH
    },
    // image: { type: String, required: true },
    competitions: [{
        _id: { type: String, required: true },
        title: {
            type: String,
            required: true,
            // minlength: constants.MIN_NAME_LENGTH,
            // maxlength: constants.MAX_NAME_LENGTH
        }
        // image: {type: String, required: true}
    }]
});

mongoose.model('Category', categorySchema);

module.exports = mongoose.model('Category');