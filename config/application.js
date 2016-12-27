/* globals require module */
'use strict';

const express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cors = require('cors'),
    app = express();

const secretStrings = {
    production: process.env.SECRET_STRING,
    development: 'james bond 007'
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: secretStrings[process.env.NODE_ENV || "development"], resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
    });
app.options("*", cors());
//secret: read from file!

module.exports = app;