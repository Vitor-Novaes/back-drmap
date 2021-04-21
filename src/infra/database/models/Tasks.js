'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
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
      type: DataTypes.DATE,
      allowNull: false,
    },
    markAsDone: {
      field: 'mark_as_done',
      type: DataTypes.BOOLEAN
    },
    pointId: {
      type: DataTypes.INTEGER,
      field: 'point_id',
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
  }, {});
  Tasks.associate = function(models) {
    Tasks.belongsTo(models.points, {
      as: 'point',
      foreignKey: 'point_id',
      sourceKey: 'id',
    });
  };
  return Tasks;
};
