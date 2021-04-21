const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');

// const UserSerializer = require('./interfaces/http/user/UserSerializer');

const Server = require('./interfaces/http/Server');
const logger = require('./interfaces/http/logging/logger');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const { v1Router, rootRouter } = require('./interfaces/http/routers/index');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const {
  GetAllRoadmaps,
  CreateRoadmap,
} = require('src/app/roadmap');

const {
  Lambdas,
  PublicService,
} = require('src/infra/services');

const SequelizeRoadmapRepository = require('./infra/roadmap/SequelizeRoadmapRepository');
//const SequelizePointRepository = require('./infra/point/SequelizePointRepository');
//const SequelizeTaskRepository = require('./infra/task/SequelizeTaskRepository');

const {
  database,
  Points,
  Roadmaps,
  Tasks,
} = require('./infra/database/models');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    rootRouter: asFunction(rootRouter).singleton(),
    v1Router: asFunction(v1Router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton(),
  })

  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  roadmapRepository: asClass(SequelizeRoadmapRepository).singleton()
});

// Services
container.register({
  lambdas: asClass(Lambdas).singleton(),
  plubicService: asClass(PublicService).singleton(),
});

// Database
container.register({
  database: asValue(database),
  RoadmapModel: asValue(Roadmaps),
  PointModel: asValue(Points),
  TaskModel: asValue(Tasks),
});

// Operations
container.register({
  getAllRoadmaps: asClass(GetAllRoadmaps),
  createRoadmap: asClass(CreateRoadmap),
  // getUser: asClass(GetUser),
  // updateUser: asClass(UpdateUser),
  // deleteUser: asClass(DeleteUser)
});

// Serializers
container.register({
  // userSerializer: asValue(UserSerializer)
});

module.exports = container;
