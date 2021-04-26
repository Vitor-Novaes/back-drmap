const Operation = require('src/app/Operation');

class GetAllRoadmaps extends Operation {
  constructor({ lambdas }) {
    super();
    this.lambdas = lambdas;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const roadmaps = await this.lambdas.getAllRoadmaps().body;

      this.emit(SUCCESS, roadmaps);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }

}

GetAllRoadmaps.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllRoadmaps;
