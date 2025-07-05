import express from "express";
import crypto from "crypto";

const router = express.Router();

let products = [];

router.get("/products", (_req, res) => {
  try {
    if (products.length === 0) {
      return res
        .status(200)
        .json({ message: "No products found", success: false });
    }

    res
      .status(200)
      .json({ message: "Products found", success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

router.get("/products/:id", (req, res) => {
  try {
    const { id } = req.params;

    const product = products.find((p) => p._id === id);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({
      message: `Details of product with ID: ${id}`,
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

router.post("/products", (req, res) => {
  try {
    const { productName, cost, stockStatus } = req.body;

    if (!productName || !cost || !stockStatus) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const product = {
      _id: crypto.randomUUID(),
      productName,
      cost,
      stockStatus,
      createdAt: new Date().toISOString(),
    };

    products.push(product);

    res.status(201).json({
      message: `Product created: ${product.productName}`,
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

router.patch("/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const index = products.findIndex((p) => p._id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    res.status(200).json({
      message: `Product with ID: ${id} updated`,
      success: true,
      data: products[index],
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

router.patch("/products/:id/:status", (req, res) => {
  try {
    const { id, status } = req.params;

    const index = products.findIndex((p) => p._id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    products[index].stockStatus = status;
    products[index].updatedAt = new Date().toISOString();

    res.status(200).json({
      message: `Stock status for product ID: ${id} updated to '${status}'`,
      success: true,
      data: products[index],
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

router.delete("/products/:id", (req, res) => {
  try {
    const { id } = req.params;

    const index = products.findIndex((p) => p._id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    const deletedProduct = products.splice(index, 1)[0];

    res.status(200).json({
      message: `Product with ID: ${id} deleted`,
      success: true,
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

export default router;
