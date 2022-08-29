
// IMPORT MODELS
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');



// ASSOCIATIONS

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

Category.hasMany(Product, {
    foreignKey: 'category_id'
});


Product.belongsToMany(Tag, {
    through: ProductTag,
    as: 'tags',
    foreignKey: 'product_id'
});

Tag.belongsToMany(Product, {
    through: ProductTag,
    as: 'products',
    foreignKey: 'tag_id'
});



// EXPORT MODELS
module.exports = {
    Product,
    Category,
    Tag,
    ProductTag
};
