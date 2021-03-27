'use strict';
module.exports = function(sequelize, DataTypes) {
  const Roadmaps = sequelize.define('Roadmaps', {
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
  }, { });

  Roadmaps.associate = function(models) {
    Roadmaps.hasMany(models.points, {
      foreignKey: 'roadmap_id',
      sourceKey: 'id',
    });
  };

  return Roadmaps;
};
