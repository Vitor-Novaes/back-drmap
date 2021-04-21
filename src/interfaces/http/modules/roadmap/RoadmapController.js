const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');


const RoadmapController = {

  get router() {
    const router = Router();

    router.get(
      '/',
      inject(({ getAllRoadmaps, }) => (_, res, next) => {
        const { SUCCESS, ERROR } = getAllRoadmaps.outputs;

        getAllRoadmaps
          .on(SUCCESS, (roadmaps) => {
            res
              .status(Status.OK)
              .json(roadmaps);
          })
          .on(ERROR, next);

        getAllRoadmaps.execute();
      })
    );

    router.post(
      '/',
      inject(({ createRoadmap }) => (req, res, next) => {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = createRoadmap.outputs;

        createRoadmap
          .on(SUCCESS, (roadmap) => {
            res
              .status(Status.OK)
              .json(roadmap);
          })
          .on(VALIDATION_ERROR, (error) => {
            res
              .status(Status.BAD_REQUEST)
              .json({
                error: error.name,
                details: error.details,
              });
          })
          .on(ERROR, next);

        createRoadmap.execute(req.body);
      })
    );

    return router;
  },
};

module.exports = RoadmapController;

