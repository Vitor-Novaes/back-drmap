'use strict';
module.exports = (sequelize, DataTypes) => {
  const Points = sequelize.define('Points', {
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
    completedDate: {
      field: 'completed_date',
      type: DataTypes.DATE
    },
    markAsDone: {
      field: 'mark_as_done',
      type: DataTypes.BOOLEAN,
    },
    roadmapId: {
      type: DataTypes.INTEGER,
      field: 'roadmap_id',
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
      as: 'roadmap',
      foreignKey: 'roadmap_id',
      targetKey: 'id',
    });
    Points.hasMany(models.tasks, {
      foreignKey: 'point_id',
      sourceKey: 'id',
    });
  };
  return Points;
};
