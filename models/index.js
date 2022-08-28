
// IMPORT MODELS
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// ASSOCIATIONS

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)


// EXPORT MODELS
module.exports = {
    Product,
    Category,
    Tag,
    ProductTag
};
