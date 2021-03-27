const { Router } = require('express');
// const statusMonitor = require('express-status-monitor');
const methodOverride = require('method-override'); // to do

// /* istanbul ignore if */
// if (config.env === 'development') {
//   router.use(statusMonitor());
// }

// /* istanbul ignore if */
// if (config.env !== 'test') {
//   router.use(loggerMiddleware);
// }
const corsMiddleware = (req, res, next) => {
  // res.setHeader(
  //   'Access-Control-Allow-Origin',
  //   process.env.CORS_ORIGIN,
  // );
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   process.env.CORS_HEADERS,
  // );
  // res.setHeader(
  //   'Access-Control-Allow-Methods',
  //   process.env.CORS_METHODS,
  // );
  // res.setHeader(
  //   'Access-Control-Expose-Headers',
  //   process.env.CORS_EXPOSE_HEADERS,
  // );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = ({
  errorHandler,
  v1Router,
}) => Router()
  .use(errorHandler)
  .use(methodOverride('X-HTTP-Method-Override'))
  .use(corsMiddleware)
  .use('/v1/drm', v1Router);
