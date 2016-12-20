/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path');

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    const ForumPost = require('../models/forum-post-model'),
        models = { ForumPost },
        data = {};

    fs.readdirSync('./data')
        .filter(x => x.includes('-data'))
        .forEach(file => {
            console.log(file);
            
            const dataModule =
                require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
}