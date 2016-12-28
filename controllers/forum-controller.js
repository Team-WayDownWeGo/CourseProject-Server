'use strict';

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 6; // for testing. Default will be 10/15

module.exports = ({ data }) => {
    return {
        loadForumPosts(req, res) {
            const page = Number(req.query.page || DEFAULT_PAGE);
            Promise.all([data.getForumPosts({ page, pageSize: PAGE_SIZE }), data.getForumPostCount()])
                .then(([forumPosts, allPostsCount]) => {
                    const pages = Math.ceil(allPostsCount / PAGE_SIZE);

                    return res.json(forumPosts);
                })
                .catch((err) => {
                    res.json(err);
                });
        },
        createForumPost(req, res) {
            const body = req.body;
            data.createForumPost({
                    title: body.title,
                    description: body.description,
                    user: { username: 'Gosho' }
                })
                .then((post) => {
                    res.json({ message: 'success', id: post._id })
                }).catch((err) => {
                    res.json(err);
                });
        },
        getByID(req, res) { //
            const id = req.params.id;
            const currentUser = req.user;
            data.getForumPostById(id)
                .then(forumPost => {
                    res.json(forumPost);
                })
                .catch((err) => {
                    res.json(err);
                });
        },
        addComment(req, res) { //
            const body = req.body,
                user = req.user,
                id = req.params.id;

            data.addAnswerToForumPost(id, {
                    content: body.content,
                    user: { username: 'Ivan' }
                })
                .then(() => {
                    res.json({ message: "success" })
                }).catch((err) => {
                    res.json(err)
                });
        },
        addLikeToPost(req, res) {
            const id = req.params.id;
            req.user = {
                username: 'Pesho'
            }
            data.incrementForumPostLikes(id)
                .then(() => data.addUsernameToPostUsersLiked(id, req.user.username))
                .then(() => {
                    res.json({ message: "success" })
                }).catch((err) => {
                    res.json(err)
                });
        },
        unlikePost(req, res) {
            const id = req.params.id;
            req.user = {
                username: 'Pesho'
            }

            data.decrementForumPostLikes(id)
                .then(() => data.removeUsernameFromPostUsersLiked(id, req.user.username))
                .then(() => {
                    res.json({ message: "success" })
                }).catch((err) => {
                    res.json(err)
                });
        },
        addLikeToAnswer(req, res) {
            const postId = req.params.id;
            const answerId = req.params.answerid;
            req.user = {
                username: 'Pesho'
            }

            data.incrementForumPostAnswerLikes(postId, answerId)
                .then(() => data.addUsernameToPostAnswerUsersLiked(postId, answerId, req.user.username))
                .then(() => {
                    res.json({ message: "success" })
                }).catch((err) => {
                    res.json(err);
                });
        },
        unlikePostAnswer(req, res) {
            const postId = req.params.id;
            const answerId = req.params.answerid;
            req.user = {
                username: 'Pesho'
            }

            data.decrementForumPostAnswerLikes(postId, answerId)
                .then(() => data.removeUsernameFromPostAnswerUsersLiked(postId, answerId, req.user.username))
                .then(() => {
                    res.json({ message: "success" })
                }).catch((err) => {
                    res.json(err);
                });
        }
    };
};