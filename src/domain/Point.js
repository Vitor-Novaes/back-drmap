const structure = require('structure');
const Task = require('src/domain/Task');

const Point = structure.attributes(
  {
    id: Number,
    markAsDone: Boolean,
    createdAt: Date,
    updatedAt: Date,
    title: {
      require: true,
      type: String,
    },
    description: String,
    moment: {
      type: Date,
      require: true,
    },
    pointId: {
      type: Number,
      require: true,
    },
    tasks: {
      type: Array,
      itemType: Task,
    },
    roadmapId: {
      type: Number,
      require: true,
    }
  }
)(class Point {});

module.exports = Point;
