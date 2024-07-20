// const mongoose = require("mongoose");

// const SaleSchema = new mongoose.Schema(
//   {
//     userID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//       required: true,
//     },
//     ProductID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "product",
//       required: true,
//     },
//     StoreID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "store",
//     },
//     StockSold: {
//       type: Number,
//       required: true,
//     },
//     SaleDate: {
//       type: String,
//       required: true,
//     },
//     TotalSaleAmount: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Sales = mongoose.model("sales", SaleSchema);
// module.exports = Sales;
const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // Optional
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    StoreID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      default: null,  // Optional
    },
    StockSold: {
      type: Number,
      required: true,
    },
    SaleDate: {
      type: String,
      required: true,
    },
    TotalSaleAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model("sales", SaleSchema);
module.exports = Sales;
