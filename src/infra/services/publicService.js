const axios = require('axios');
const adapter = require('axios/lib/adapters/http');

class PublicService {
  constructor() {
    this.instance = axios.create({
      adapter,
      baseURL: 'https://raw.githubusercontent.com/Vitor-Novaes/public_drm/master',
    });
  }

  async getDataByRoadmapCode(code) {
    const points = await this.instance.get(`/${code}/points.csv`);
    const tasks = await this.instance.get(`/${code}/tasks.csv`);
    return { points, tasks };
  }
}

module.exports = PublicService;
