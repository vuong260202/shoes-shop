const Sequelize = require('sequelize');
// var bcrypt = require('bcrypt-nodejs');

const tableName = 'products'

module.exports = function (sequelize) {
  const Product = sequelize.define('products',
    {
      // attributes
      id: {
        field: 'ID',
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      productName: {
        field: 'PRODUCT_NAME',
        type: Sequelize.STRING(100),
        defaultValue: '',
        allowNull: false,
      },
      price: {
        field: 'PRICE',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      category: {
        field: 'CATEGORY',
        type: Sequelize.STRING(100),
        defaultValue: '',
        allowNull: false,
      },
      total: {
        field: 'TOTAL',
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      path: {
        field: 'PATH',
        type: Sequelize.STRING(100),
        defaultValue: '',
        allowNull: false,
      },
      createdAt: {
        field: 'CREATED_AT',
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      size: {
        field: 'SIZE',
        type: Sequelize.INTEGER,
        defaultValue: '30'
      },
      updateAt: {
        field: 'UPDATE_AT',
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    },
    {
      tableName: tableName,
      timestamps: false,
    }
  );

  Product.sync({force: false, alter: true}).then(() => {
    if (!global.sequelizeModels) {
      global.sequelizeModels = {}
    }
    global.sequelizeModels.Product = Product
    console.log('sync Product done')

  });

  return Product
}