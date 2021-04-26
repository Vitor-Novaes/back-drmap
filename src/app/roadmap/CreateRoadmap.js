const Operation = require('src/app/Operation');
const Roadmap = require('src/domain/Roadmap');

class CreateRoadmap extends Operation {
  constructor({
    roadmapRepository,
    publicService,
    lambdas,
    taskRepository,
    pointsRepository
  }) {
    super();
    this.roadmapRepository = roadmapRepository;
    this.pointsRepository = pointsRepository;
    this.taskRepository = taskRepository;
    this.publicService = publicService;
    this.lambdas = lambdas;
  }

  async execute(roadmapData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    try {
      const roadmap = await this.lambdas.getAllRoadmaps()
        .body.filter(roadmap => roadmap.id = roadmapData.id);
      console.log(roadmap);
      const data = await this.publicService.getDataByRoadmapCode(roadmap.publicService);
      console.log(data);

      //const roadmap = new Roadmap(roadmapData);
      //const { valid, errors } = roadmap.validate();

      //if(!valid) {
      // const error = new Error('ValidationError');
      //error.details = errors;

      //throw error;
      //}

      //const newRoadmap = await this.roadmapRepository.create(roadmap);
      //console.log(newRoadmap);

      this.emit(SUCCESS, '');
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateRoadmap.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateRoadmap;
