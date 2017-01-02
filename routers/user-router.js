/* globals require */
'use strict';

module.exports = ({ app, controllers }) => {
    const controller = controllers.user;

    // app.get('/forum/', controller.loadForumPosts);
    // app.post('/forum/create', controller.createForumPost);
    app.get('/user/:username', controller.getUserByUsername);
    app.post('/users/:username/edit', controller.editProfile);
    app.post('/user/message/:username', controller.sendMessage);
    app.get('/user/message/inbox', controller.getAllInboxMessages);
    app.get('/user/message/outbox', controller.getAllOutboxMessages);
    app.get('/user/message/outbox/:username', controller.getAllOutboxMessagesToUser);
    app.get('/user/message/inbox/:username', controller.getAllInboxMessagesFromUser);
    // app.post('/forum/:id/comment', controller.addComment);
    // app.put('/forum/:id/like', controller.addLikeToPost);
    // app.put('/forum/:id/unlike', controller.unlikePost);
    // app.put('/forum/:id/comment/:answerid/like', controller.addLikeToAnswer);
    // app.put('/forum/:id/comment/:answerid/unlike', controller.unlikePostAnswer);
};