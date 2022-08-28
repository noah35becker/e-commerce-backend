
// IMPORTS
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// Create the ProductTag model
class ProductTag extends Model {}


// Define table columns + configuration
ProductTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            // 'allowNull: false' is automatically implied by <primaryKey: true> and <autoIncrement: true>
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'product',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product_tag'
    }
);


// EXPORT
module.exports = ProductTag;