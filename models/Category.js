
// IMPORTS
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');


// Create the Category model
class Category extends Model {}


// Define table columns + configuration
Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            // 'allowNull: false' is automatically implied by <primaryKey: true> and <autoIncrement: true>
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1] // must be at least 1 character long
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category'
    }
);


// EXPORT
module.exports = Category;