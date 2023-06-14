const Variant = require("../models/variantModel");
const Store = require("../models/storeModel");

// get all Brands
const transferVariant = async (req, res) => {
  //   const variants = await Variant.find({}).sort({ createdAt: -1 });
  const { amount, variant, store } = req.body;

  const stores = Store.findById(store);

  const exists = await Variant.findOne({
    variantName: variant.variantName,
    store: store,
  });
  let variants = [];
  if (exists) {
    variants = await Variant.findOneAndUpdate(
      { variantName: variant.variantName, store: store },
      { $inc: { amount: +amount } }
    );
  } else {
    console.log(variant);
    variants = await Variant.create({
      productName: variant.productName,
      brandName: variant.brandName,
      modelName: variant.modelName,
      variantName: variant.variantName,
      images: variant.images,
      sizes: variant.sizes,
      colors: variant.colors,
      price: variant.price,
      amount: amount,
      condition: variant.condition,
      gender: variant.gender,
      shortDescription: variant.shortDescription,
      productCatagory: variant.productCatagoryId,
      store: store,
    });
  }
  const reducedVariant = await Variant.findOneAndUpdate(
    { _id: variant._id },
    {
      amount: +variant.amount - +amount,
    }
  );

  if (!variants) {
    return res.status(400).json({ error: "No such store" });
  }
  res.status(200).json(variants);
};

module.exports = { transferVariant };
