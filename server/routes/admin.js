const express = require("express");
const adminRouter = express.Router();
const admin = require("../middleware/admin");
const { Product } = require("../models/product"); 
// const user = require("../middleware/auth");

adminRouter.post("/admin/add-product", admin, async (req, res) => {
    try {
      const {name, description, images, quantity, price, category, keywordlist, os, ram, rom, screentech, userId } = req.body;
      let product= new Product({
        name,
        description,
        images,
        quantity,
        price,
        category, 
        keywordlist,
        os,
        ram,
        rom,
        screentech,
        userId
      });
      product = await product.save();
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


  // Get all your products
  // adminRouter.get("/admin/get-products", admin, async (req, res) => {
  //   try {
  //     const products = await Product.find({});
  //     res.json(products);
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // });

  //NEWLY ADDED : FETCHING ONLY THOSE PRODUCTS WHICH HAVE THE SAME EMAILID
  adminRouter.get("/admin/get-products/:userId", admin, async (req, res) => {
    try {
      const userId = req.params.userId;
      const products = await Product.find({userId:userId}); 
      res.json(products); 
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // Delete the product
adminRouter.post("/admin/delete-product", admin, async (req, res) => {
  try {
    const { id } = req.body;
    let product = await Product.findByIdAndDelete(id);
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;