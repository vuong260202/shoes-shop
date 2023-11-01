
const Sequelize = require('sequelize');

let CONFIG = require('../config');

let sequelize = new Sequelize(CONFIG.db.dbname, 'root', '', {
    host: CONFIG.db.host,
    dialect: 'mysql'
});

  // console.log('connecting to postgres', process.env.POSTGRESQL_HOST);
sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    global.sequelize = sequelize;

    // Init all models here
    require('./mysql/User')(sequelize);
    // Add other models as needed...

})
.catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
});