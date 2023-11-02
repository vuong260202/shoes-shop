const Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

const tableName = 'users'

module.exports = function (sequelize) {
  const User = sequelize.define(tableName,
    {
      id: {
        field: 'ID',
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        field: 'username',
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        field: 'password',
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          const hashedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(8), null);
          this.setDataValue('password', hashedPassword);
        }
      },
      // createAt:{
      //   field: 'create_at',
      //   type: 
      // }
      // Add other attributes here...
    },
    {
      tableName: tableName,
      timestamps: false
    }
  );

  User.sync({force: false, alter: true}).then(() => {
    if (!global.sequelizeModels) {
      global.sequelizeModels = {}
    }
    global.sequelizeModels.User = User
    console.log('sync User done')

  });


  User.prototype.hashPassword = function (plainPassword) {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(8), null);
  }

  User.prototype.validPassword = function (plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
  }
};