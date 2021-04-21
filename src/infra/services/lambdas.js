const axios = require('axios');
const adapter = require('axios/lib/adapters/http');

class Lambdas {
  constructor() {
    this.instance = axios.create({
      adapter,
      baseURL: '8bp38ux9fi.execute-api.us-east-1.amazonaws.com/development',
    });
  }

  async getAllRoadmaps() {
    return this.instance.get('/roadmap');
  }

  async getRoadmap(id) {
    return this.instance.get(`/roadmap?id=${id}`);
  }
}

module.exports = Lambdas;
