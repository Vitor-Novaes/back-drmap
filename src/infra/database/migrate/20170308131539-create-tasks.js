'use strict';
module.exports = {
  up: (sequelize, DataTypes) => {
    return sequelize.createTable('Tasks', {
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
      description: {
        type: DataTypes.STRING,
      },
      moment: {
        type: DataTypes.DATETIME,
        allowNull: false,
      },
      markAsDone: {
        field: 'mark_as_done',
        type: DataTypes.BOOLEAN
      },
      pointId: {
        field: 'point_id',
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: 'Points',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
  down: (sequelize) => {
    return sequelize.dropTable('Tasks');
  }
};
