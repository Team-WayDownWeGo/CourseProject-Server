/* globals module require */
'use strict';

module.exports = function(models) {
    const Category = models.Category;
    return {
        createCategory(category) {
            const newCategory = new Category({
                title: category.title,
                description: category.description,
                competitions: []
            });
            return new Promise((resolve, reject) => {
                newCategory.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newCategory);
                });
            });
        },

        getCategory() {
            return new Promise((resolve, reject) => {
                ForumPost.find({}, (err, category) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                })
            })
        }

    };
};