const Roadmap = require('src/domain/Roadmap');

module.exports = {
  toEntity(roadmap) {
    const {
      id,
      title,
      hex,
      thumb,
      points,
      createdAt,
      updatedAt
    } = roadmap;

    return new Roadmap({
      id,
      title,
      hex,
      thumb,
      points,
      createdAt,
      updatedAt
    });
  },

  toDatabase(roadmap) {
    const {
      id,
      title,
      hex,
      thumb,
      createdAt,
      updatedAt
    } = roadmap;

    return {
      id,
      title,
      hex,
      thumb,
      createdAt,
      updatedAt
    };
  }
};
