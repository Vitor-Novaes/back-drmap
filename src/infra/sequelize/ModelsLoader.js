const fs = require('fs');
const path = require('path');

module.exports = {
  load({
    sequelize, Sequelize, baseFolder, indexFile = 'index.js',
  }) {
    const loaded = {};

    fs
      .readdirSync(baseFolder)
      .filter(file => (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js'))
      .forEach((file) => {
        const model = sequelize.import(path.join(baseFolder, file));
        const modelName = file.split('.')[0];
        loaded[modelName] = model;
      });

    loaded.database = sequelize;
    loaded.Sequelize = Sequelize;

    return loaded;
  },
};
