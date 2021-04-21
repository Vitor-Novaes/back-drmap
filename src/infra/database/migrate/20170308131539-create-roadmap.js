'use strict';
module.exports = {
  up: function(sequelize, DataTypes) {
    return sequelize.createTable('Roadmaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumb: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: function(sequelize) {
    return sequelize.dropTable('Roadmaps');
  }
};
