const RoadmapMapper = require('./SequelizeRoadmapMapper');

class SequelizeRoadmapRepository {
  constructor({ RoadmapModel }) {
    this.roadmapModel = RoadmapModel;
  }

  async getAll() {
    const roadmap = await this.roadmapModel.findAll({ order: [['createdAt', 'DESC']] });
    return roadmap.length > 0 ? roadmap.map(RoadmapMapper.toEntity()) : { };
  }

  async create(roadmap) {
    const newRoadmap = await this.roadmapModel.create(RoadmapMapper.toDatabase(roadmap));
    return RoadmapMapper.toEntity(newRoadmap);
  }

  async getRoadmap() {

  }
}

module.exports = SequelizeRoadmapRepository;
