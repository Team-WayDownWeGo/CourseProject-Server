/* globals require */
'use strict';

module.exports = ({ app, controllers }) => {
    const controller = controllers.category;
    app.get('/category', controller.getCategory);
    app.post('/category', controller.createCategory)
};