
// IMPORTS
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');


// Create the Tag model
class Tag extends Model {}


// Define table columns + configuration
Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            // 'allowNull: false' is automatically implied by <primaryKey: true> and <autoIncrement: true>
        },
        tag_name: {
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
        modelName: 'tag'
    }
);


// EXPORT
module.exports = Tag;