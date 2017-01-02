module.exports = ({ data }) => {
    return {
        sendMessage(req, res) {
            const body = req.body,

                message = {
                    message: body.message.message,
                    date: Date.now(),
                    user: {
                        username: req.params.username
                    },
                    isViewed: false
                },
                username = body.user;


            data.sendMessage({ username, message })
                .then((mess) => {
                    return res.json(mess);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        getAllInboxMessages(req, res) {
            const username = 'Ivanna';
            data.getAllInboxMessages(username)
                .then((inbox) => {
                    return res.json(inbox);
                })
                .catch(err => {
                    return res.json({ message: err });
                })

        },
        getAllOutboxMessages(req, res) {
            const username = 'Ivanna';

            data.getAllOutboxMessages(username)
                .then(outbox => {
                    return res.json(outbox);
                })
                .catch(err => {
                    return res.json({ message: err });
                })
        },
        getAllOutboxMessagesToUser(req, res) {
            data.getAllOutboxMessagesToUser({ username, queryUser })
                .then(outbox => {
                    return res.json(outbox);
                })
                .catch(err => {
                    return res.json({ message: err });
                })

        },
        getAllInboxMessagesFromUser(req, res) {
            const username = req.body.user;
            const queryUser = req.params.username
            data.getAllInboxMessagesFromUser({ username, queryUser })
                .then(outbox => {
                    return res.json(outbox);
                })
                .catch(err => {
                    return res.json({ message: err });
                })
        },
        getUserByUsername(req, res) { //
            const username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {
                    res.json(user);
                })
                .catch((err) => {
                    res.json({ message: err });
                });
        },
        editProfile(req, res) {
            console.log('here');
            console.log(req.body);

            const username = req.params.username;

            const userInfo = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                passHas: req.body.password
            };

            data.updateUserInformation(username, userInfo)
                .then(() => {
                    return res.json({ success: 'Updated successfully' });
                })
                .catch((err) => {
                    res.json({ error: 'Failed.' });
                });
        }
    }
}