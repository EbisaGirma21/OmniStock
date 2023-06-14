const ProductCatagory = require("../models/productCatagoryModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

// get all ProductCatagorys
const getProductCatagorys = async (req, res) => {
  const productCatagorys = await ProductCatagory.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(productCatagorys);
};

// get a single ProductCatagory
const getProductCatagory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such productCatagory" });
  }
  const productCatagory = await ProductCatagory.findById(id);

  if (!productCatagory) {
    return res.status(404).json({ error: "No such productCatagory" });
  }

  res.status(200).json(productCatagory);
};

// create a new ProductCatagory
const createProductCatagory = async (req, res) => {
  const { productCatagoryName, image, store } = req.body;
  let emptyFields = [];
  if (!productCatagoryName) {
    emptyFields.push("productCatagoryName");
  }
  if (image.length === 0) {
    emptyFields.push("image");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "psms",
    });
    const productCatagory = await ProductCatagory.create({
      productCatagoryName,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      store,
    });
    res.status(200).json(productCatagory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a ProductCatagory
const deleteProductCatagory = async (req, res) => {
  const { id } = req.params;
  const deletedProductCatagory = await ProductCatagory.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such productCatagory" });
  }
  cloudinary.uploader.destroy(
    deletedProductCatagory.image.public_id,
    (error) => {
      if (error) {
        return res.status(400).json({ error: "public Id is not correct" });
      }
    }
  );

  const productCatagory = await ProductCatagory.findOneAndDelete({ _id: id });

  if (!productCatagory) {
    return res.status(400).json({ error: "No such productCatagory" });
  }

  res.status(200).json(productCatagory);
};

// update a ProductCatagory
const updateProductCatagory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such productCatagory" });
  }

  const productCatagory = await ProductCatagory.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!productCatagory) {
    return res.status(400).json({ error: "No such ProductCatagory" });
  }

  res.status(200).json(productCatagory);
};

module.exports = {
  getProductCatagorys,
  getProductCatagory,
  createProductCatagory,
  deleteProductCatagory,
  updateProductCatagory,
};
