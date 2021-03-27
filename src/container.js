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

// const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const { database } = require('./infra/database/models');

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
  // usersRepository: asClass(SequelizeUsersRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  // UserModel: asValue(UserModel)
});

// Operations
container.register({
  // createUser: asClass(CreateUser),
  // getAllUsers: asClass(GetAllUsers),
  // getUser: asClass(GetUser),
  // updateUser: asClass(UpdateUser),
  // deleteUser: asClass(DeleteUser)
});

// Serializers
container.register({
  // userSerializer: asValue(UserSerializer)
});

module.exports = container;
