/* globals require module __dirname */
'use strict';

const fs = require('fs'),
    path = require('path');

//module.exports = ({ app, data, controllers, uploadUserImage, uploadCompetitionImage, uploadCategoryImage }) => {

module.exports = ({ app, controllers }) => {
    fs.readdirSync('./routers')
        .filter(x => x.includes('-router'))
        .forEach(file => {
            // require(path.join(__dirname, file))({ app, data, controllers, authentication, uploadUserImage, uploadCompetitionImage, uploadCategoryImage });
            require(path.join(__dirname, file))({ app, controllers });
        });
    app.all("*", (req, res) => {
        res.status(404);
        res.json(404)
        res.end();
    });
    // app.get('*', function(req, res) {
    //     res.status(404).redirect('/404');
    // });

};