module.exports = ({ data }) => {
    return {
        getCategory() {
            data.getCategory()
                .then(categories => {
                    res.json(categories);
                }).catch(err => {
                    res.json({ message: 'error' });
                })
        },
        createCategory() {
            const body = req.body;
            data.createCategory({
                    title: body.title,
                    description: body.description
                })
                .then((post) => {
                    res.json(post)
                }).catch((err) => {
                    res.json({ message: 'error' });
                });
        }
    }
}