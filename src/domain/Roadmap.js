const structure = require('structure');
const Point = require('src/domain/Point');

const Roadmap = structure.attributes(
  {
    id: Number,
    title: {
      type: String,
      require: true,
    },
    hex: {
      type: String,
      require: true,
    },
    thumb: {
      type: String,
      require: true,
    },
    points: {
      type: Array,
      itemType: Point,
    },
    createdAt: Date,
    updatedAt: Date,
  }
)(class Roadmap { });

module.exports = Roadmap;
