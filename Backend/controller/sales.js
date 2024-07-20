
// //Backend\controller\sales.js


// const Sales = require("../models/sales");
// const soldStock = require("../controller/soldStock");

// // Add Sales
// const addSales = (req, res) => {
//   const addSale = new Sales({
//     userID: req.body.userID,
//     ProductID: req.body.productID,
//     StoreID: req.body.storeID,
//     StockSold: req.body.stockSold,
//     SaleDate: req.body.saleDate,
//     TotalSaleAmount: req.body.totalSaleAmount,
//   });

//   addSale
//     .save()
//     .then((result) => {
//       soldStock(req.body.productID, req.body.stockSold);
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       res.status(400).send(err); // Changed status code from 402 to 400
//     });
// };

// // Get All Sales Data
// const getSalesData = async (req, res) => {
//   const findAllSalesData = await Sales.find({ userID: req.params.userID })
//     .sort({ _id: -1 })
//     .populate("ProductID")
//     .populate("StoreID"); // -1 for descending order
//   res.json(findAllSalesData);
// };

// // Get total sales amount
// const getTotalSalesAmount = async (req, res) => {
//   let totalSaleAmount = 0;
//   const salesData = await Sales.find({ userID: req.params.userID });
//   salesData.forEach((sale) => {
//     totalSaleAmount += sale.TotalSaleAmount;
//   });
//   res.json({ totalSaleAmount });
// };

// const getMonthlySales = async (req, res) => {
//   try {
//     const sales = await Sales.find();

//     // Initialize array with 12 zeros
//     const salesAmount = [];
//     salesAmount.length = 12;
//     salesAmount.fill(0);

//     sales.forEach((sale) => {
//       const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1;
//       salesAmount[monthIndex] += sale.TotalSaleAmount;
//     });

//     res.status(200).json({ salesAmount });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = { addSales, getMonthlySales, getSalesData, getTotalSalesAmount };
const Sales = require("../models/sales");
const soldStock = require("../controller/soldStock");

// Add Sales
const addSales = (req, res) => {
  const { userID, productID, storeID, stockSold, saleDate, totalSaleAmount } = req.body;

  console.log("Request Body:", req.body);

  // Validate required fields
  if (!productID || !stockSold || !saleDate || !totalSaleAmount) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const addSale = new Sales({
    userID: userID || null,  // Optional
    ProductID: productID,
    StoreID: storeID || null,  // Optional
    StockSold: stockSold,
    SaleDate: saleDate,
    TotalSaleAmount: totalSaleAmount,
  });

  addSale
    .save()
    .then((result) => {
      soldStock(productID, stockSold);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error("Error saving sale:", err);
      res.status(400).send(err);
    });
};

// Get All Sales Data
const getSalesData = async (req, res) => {
  try {
    const findAllSalesData = await Sales.find({ userID: req.params.userID })
      .sort({ _id: -1 })
      .populate("ProductID")
      .populate("StoreID");
    res.json(findAllSalesData);
  } catch (err) {
    console.error("Error fetching sales data:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get total sales amount
const getTotalSalesAmount = async (req, res) => {
  try {
    let totalSaleAmount = 0;
    const salesData = await Sales.find({ userID: req.params.userID });
    salesData.forEach((sale) => {
      totalSaleAmount += sale.TotalSaleAmount;
    });
    res.json({ totalSaleAmount });
  } catch (err) {
    console.error("Error calculating total sales amount:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sales.find();

    // Initialize array with 12 zeros
    const salesAmount = Array(12).fill(0);

    sales.forEach((sale) => {
      const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1;
      salesAmount[monthIndex] += sale.TotalSaleAmount;
    });

    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error("Error fetching monthly sales:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addSales, getMonthlySales, getSalesData, getTotalSalesAmount };
