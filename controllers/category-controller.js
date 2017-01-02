module.exports = ({ data }) => {
    return {
        getCategory(req, res) {
            data.getCategory()
                .then(categories => {
                    res.json(categories);
                }).catch(err => {
                    res.json({ message: 'error' });
                })
        },
        createCategory(req, res) {
            const body = req.body;
            console.log(body);
            data.createCategory({
                    title: body.categoryName,
                    description: body.categoryDescription
                })
                .then((category) => {
                    res.json(category)
                }).catch((err) => {
                    console.log(err);
                    res.json({ message: 'error' });
                });
        }
    }
}