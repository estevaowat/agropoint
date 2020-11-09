"use strict";
module.exports = function (sequelize, DataTypes) {
    var Position = sequelize.define('Position', {
        latitude: DataTypes.NUMBER,
        longitude: DataTypes.NUMBER,
    });
    Position.associate = function (models) {
        // associations can be defined here
    };
    return Position;
};
