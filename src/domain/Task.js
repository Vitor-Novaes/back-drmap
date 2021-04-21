const structure = require('structure');

const Task = structure.attributes(
  {
    id: Number,
    markAsDone: Boolean,
    createdAt: Date,
    updatedAt: Date,
    description: String,
    title: {
      require: true,
      type: String,
    },
    moment: {
      type: Date,
      require: true,
    },
    pointId: {
      type: Number,
      require: true,
    },
  }
)(class Task {});

module.exports = Task;
