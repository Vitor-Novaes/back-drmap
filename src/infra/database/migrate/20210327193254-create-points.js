'use strict';
module.exports = {
  up: (sequelize, DataTypes) => {
    return sequelize.createTable('Points', {
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
        field: 'roadmap_id',
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
    });
  },
  down: (sequelize) => {
    return sequelize.dropTable('Points');
  }
};
