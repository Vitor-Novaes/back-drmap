
const UserSerializer = {
  serialize(users) {
    if(Array.isArray(users)) {
      users.map(user => this.serializeEntity(user));
    }

    return this.serializeEntity(users);
  },

  serializeEntity(user) {
    const {
      _id: id,
      name,
      email,
    } = user;

    return {
      id,
      name,
      email,
    };
  },
};

module.exports = UserSerializer;
