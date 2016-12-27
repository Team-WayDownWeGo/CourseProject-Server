"use strict";

const passport = require("passport");

module.exports = ({ app, controllers }) => {
    console.log('here');
    app.post("/auth/register", controllers.auth.registerUser);
    // app.post("/auth/login", controllers.auth.loginUser);
    // app.get("/auth/logout", controllers.auth.logoutUser);
    // app.post("/auth/verify", controllers.auth.verifyLogin);
};