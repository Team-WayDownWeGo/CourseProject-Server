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
    },
});

mongoose.model('Category', categorySchema);

module.exports = mongoose.model('Category');