'use strict';

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 6; // for testing. Default will be 10/15

module.exports = ({ data }) => {
    return {
        loadForumPosts(req, res) {

            console.log('1');
            const page = Number(req.params.page || DEFAULT_PAGE);
            Promise.all([data.getForumPosts({ page, pageSize: PAGE_SIZE }), data.getForumPostCount()])
                .then(([forumPosts, allPostsCount]) => {
                    const pageCount = Math.ceil(allPostsCount / PAGE_SIZE);

                    return res.json({ forumPosts, pageCount });
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
                    user: { username: body.user },
                    category: body.category
                })
                .then((post) => {
                    const postToBeAdded = {
                        title: post.title,
                        _id: post._id
                    };

                    data.addPostToCategory(post.category, postToBeAdded);

                    return (post._id);
                })
                .then(id => {
                    res.json({ message: 'success', id })
                }).catch((err) => {
                    console.log('in error');
                    console.log(err);
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
                    res.json({ message: 'error' });
                });
        },
        addComment(req, res) { //
            const body = req.body,
                user = body.user,
                id = req.params.id;

            data.addAnswerToForumPost(id, {
                    content: body.commentMessage,
                    user: { username: user }
                })
                .then(() => {
                    res.json({ message: "success" })
                }).catch((err) => {
                    res.json(err)
                });
        },
        addLikeToPost(req, res) {
            console.log(req.body);
            console.log('-----');
            const body = req.body;
            const id = req.params.id;
            req.user = {
                username: body.user
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
            const body = req.body;
            const id = req.params.id;
            req.user = {
                username: body.user
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
            const postId = req.params.id,
                answerId = req.params.answerid,
                body = req.body;

            req.user = {
                username: body.user
            }

            data.incrementForumPostAnswerLikes(postId, answerId)
                .then(() => data.addUsernameToPostAnswerUsersLiked(postId, answerId, req.user.username))
                .then(() => {
                    res.json({ message: "success" })
                }).catch((err) => {
                    res.json({ message: "error" });
                });
        },
        unlikePostAnswer(req, res) {
            const postId = req.params.id,
                answerId = req.params.answerid,
                body = req.body;

            req.user = {
                username: body.user
            }

            data.decrementForumPostAnswerLikes(postId, answerId)
                .then(() => data.removeUsernameFromPostAnswerUsersLiked(postId, answerId, req.user.username))
                .then(() => {
                    res.json({ message: "success" })
                }).catch((err) => {
                    res.json({ message: "error" });
                });
        },
        searchPost(req, res) {
            const body = req.body,
                searchName = req.params.search || '';

            data.filterForumPosts(searchName)
                .then((competitions) => {
                    res.json(competitions);
                })
                .catch((err) => {
                    res.json({ message: "error" });
                });
        },
        getPostsByUsername(req, res) { //
            const username = req.params.username;

            data.getForumPostsByUsername(username)
                .then(forumPosts => {
                    res.json(forumPosts);
                })
                .catch((err) => {
                    res.json({ message: 'error' });
                });
        }
    };
};