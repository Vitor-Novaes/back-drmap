'use strict';
module.exports = (sequelize, DataTypes) => {
  const Points = sequelize.define('Points', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completedDate: {
      field: 'completed_date',
      type: DataTypes.DATETIME
    },
    markAsDone: {
      field: 'mark_as_done',
      type: DataTypes.BOOLEAN,
    },
    roadmapId: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
      references: {
        model: 'Roadmaps',
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
  Points.associate = (models) => {
    Points.belongsTo(models.roadmaps, {
      as: 'points',
      foreignKey: 'roadmap_id',
      targetKey: 'id',
    });
  };
  return Points;
};
