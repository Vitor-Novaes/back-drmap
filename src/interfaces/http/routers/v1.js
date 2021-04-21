const { Router } = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const controller = require('../utils/createControllerRoutes');

const healthCheck = (_, res) => {
  res.json({ message: 'I am here' });
  res.status(200);
};

module.exports = ({
  containerMiddleware,
}) => Router()
  .use(bodyParser.json())
  .use(containerMiddleware)
  .use(compression())
  .use('/status', healthCheck)
  .use('/roadmaps', controller('roadmap/RoadmapController'))
  .use('/tasks', healthCheck)
  .use('/points', healthCheck);
// .use('/credentials/users', controller('auth/UsersAuthController'))
// .use('/users', controller('user/UsersController'))
