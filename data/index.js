/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path');

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    const ForumPost = require('../models/forum-post-model'),
        User = require('../models/user-model'),
        Category = require('../models/category-model'),
        models = { ForumPost, User, Category },
        data = {};

    fs.readdirSync('./data')
        .filter(x => x.includes('-data'))
        .forEach(file => {
            const dataModule =
                require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
}