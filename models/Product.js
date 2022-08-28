
// IMPORTS
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


// Create the Category model
class Product extends Model {}


// Define table columns + configuration
Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            // 'allowNull: false' is automatically implied by <primaryKey: true> and <autoIncrement: true>
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1] // must be at least 1 character long
            }
        },
        price: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                isInt: true,
                min: 0
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product'
    }
);


// EXPORT
module.exports = Product;
