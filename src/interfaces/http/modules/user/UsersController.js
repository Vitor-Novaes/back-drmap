const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

//  TODO this is better implementation for DI with cradle here ?
const { jwtStrategy, httpAuthorization } = require('src/container').cradle;


const optionsAuthJWT = () => {
  return { session: false };
};

const UsersController = {
  get router() {
    const router = Router();

    /**  GET v1/auth/users/
     *  @return {users} Returns all users
     */
    router.get('/',
      jwtStrategy.authenticateJWT(optionsAuthJWT()),
      inject(({ getAllUsers }) => (_, res, next) => {
        const { SUCCESS, ERROR } = getAllUsers.outputs;

        getAllUsers
          .on(SUCCESS, (users) => {
            res
              .status(Status.OK)
              .json(users);
          })
          .on(ERROR, next);

        getAllUsers.execute();
      })
    );

    /**  GET v1/auth/users/profile
     *  @return {user} Returns current user authenticated
     */
    router.get('/profile',
      jwtStrategy.authenticateJWT(optionsAuthJWT()),
      httpAuthorization.authorization('USER'),
      inject(({ getProfileUser }) => (req, res, next) => {
        const { SUCCESS, ERROR, NOT_FOUND_ERROR } = getProfileUser.outputs;
        const token = req.headers.authorization;

        getProfileUser
          .on(SUCCESS, (user) => {
            res
              .status(Status.OK)
              .json(user);
          })
          .on(NOT_FOUND_ERROR, (error) => {
            res
              .status(Status.NOT_FOUND_ERROR)
              .json({
                type: 'NotFoundError',
                details: error.message
              });
          })
          .on(ERROR, next);

        getProfileUser.execute(token);
      })
    );


    // router.put('/:id', inject('updateUser'), this.update);
    // router.delete('/:id', inject('deleteUser'), this.delete);

    return router;
  },
};

module.exports = UsersController;
