const Operation = require('src/app/Operation');

class GetAllRoadmaps extends Operation {
  constructor({ roadmapRepository }) {
    super();
    this.roadmapRepository = roadmapRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const roadmaps = await this.roadmapRepository.getAll();

      this.emit(SUCCESS, roadmaps);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }

}

GetAllRoadmaps.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllRoadmaps;
