'use strict';

const path = require('path'),
    fs = require('fs');

module.exports = ({ data }) => {
    let controllers = [];

    fs.readdirSync(__dirname)
        .filter(f => f.includes('-controller'))
        .forEach(f => {
            let currentController = require(path.join(__dirname, f))({ data });

            let controllerName = f.substring(0, f.indexOf('-controller'));

            controllers[controllerName] = currentController;
        })

    return controllers;
}