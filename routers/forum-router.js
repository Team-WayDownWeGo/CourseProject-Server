/* globals require */
'use strict';

module.exports = ({ app, controllers }) => {
    const controller = controllers.forum;

    app.get('/forum/all/:page', controller.loadForumPosts);
    app.post('/forum/create', controller.createForumPost);
    app.get('/forum/:id', controller.getByID);
    app.post('/forum/:id/comment', controller.addComment);
    app.put('/forum/:id/like', controller.addLikeToPost);
    app.put('/forum/:id/unlike', controller.unlikePost);
    app.put('/forum/:id/comment/:answerid/like', controller.addLikeToAnswer);
    app.put('/forum/:id/comment/:answerid/unlike', controller.unlikePostAnswer);
};