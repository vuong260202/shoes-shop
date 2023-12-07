const Sequelize = require("sequelize");
// var bcrypt = require('bcrypt-nodejs');

const tableName = "transactions";

module.exports = function (sequelize) {
  const Transaction = sequelize.define(
    "transactions",
    {
      // attributes
      id: {
        field: "ID",
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        field: "USER_ID",
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberPhone: {
        field: "NUMBER_PHONE",
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      name: {
        field: "NAME",
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      productId: {
        field: "PRODUCT_ID",
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total: {
        field: "TOTAL",
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      address: {
        field: "ADDRESS",
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      amount: {
        field: "AMOUNT",
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        field: "STATUS",
        type: Sequelize.ENUM("pending", "done", "process"),
        defaultValue: "pending",
      },
      createdAt: {
        field: "CREATED_AT",
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      doneAt: {
        field: "DONE_AT",
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: tableName,
      timestamps: false,
    }
  );

  Transaction.sync({ force: false, alter: true }).then(() => {
    if (!global.sequelizeModels) {
      global.sequelizeModels = {};
    }
    global.sequelizeModels.Transaction = Transaction;
    console.log("sync Product done");
  });

  return Transaction;
};
