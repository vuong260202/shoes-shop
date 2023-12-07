var express = require("express");
const multer = require("multer");
var router = express.Router();

const webUtils = require("../utils/webUtils");

router.get(
  "/get-transaction",
  webUtils.isLoggedIn,
  webUtils.isAdmin,
  async function (req, res) {
    try {
      console.log(req.body);

      let Transaction = global.sequelizeModels.Transaction;

      let transactions = await Transaction.findAndCountAll();

      let total = transactions.count;
      transactions = transactions.rows.map(async (transaction) => {
        console.log(transaction);
      });

      console.log("transactions", transactions);
      return res.status(200).json({
        status: 200,
        data: {
          total: total,
          transactions: transactions,
        },
      });
    } catch (e) {
      console.log("error: ", e);
      return res.status(500).json({
        status: 500,
        message: "Server internal error.",
      });
    }
  }
);

router.post(
  "/update-transaction",
  webUtils.isLoggedIn,
  webUtils.isAdmin,
  async function (req, res) {
    try {
      console.log("body:", req.body);

      let transaction = await global.sequelizeModels.Transaction.update(
        { status: req.body.status },
        { where: { id: req.body.transaction } }
      );

      return res.status(200).json({
        status: 200,
        data: {
          transaction: transaction,
        },
      });
    } catch (e) {
      console.log("error: ", e);
      return res.status(500).json({
        status: 500,
        message: "Server internal error.",
      });
    }
  }
);

router.post("/add-transaction", webUtils.isLoggedIn, async function (req, res) {
  try {
    console.log(req.body);

    let Transaction = global.sequelizeModels.Transaction;
    let product = await global.sequelizeModels.Product.findOne({
      id: req.body.productId,
    });

    let newTransaction = new Transaction();
    newTransaction.userId = req.body.userId;
    newTransaction.productId = req.body.productId;
    newTransaction.name = req.body.name;
    newTransaction.total = req.body.total;
    newTransaction.address = req.body.address;
    newTransaction.numberPhone = req.body.numberPhone;
    newTransaction.status = "pending";
    newTransaction.createdAt = new Date();
    newTransaction.amount = product.price * req.body.total;

    product.total = product.total - req.body.total;

    await product.save();
    await newTransaction.save();

    return res.status(200).json({
      status: 200,
      data: {
        newTransaction,
      },
    });
  } catch (e) {
    console.log("error: ", e);
    return res.status(500).json({
      status: 500,
      message: "Server internal error.",
    });
  }
});

router.post("/update-product", (req, res) => {
  return res.status(400).json({
    status: 400,
    message: "Product does not exits.",
  });
});

module.exports = router;
