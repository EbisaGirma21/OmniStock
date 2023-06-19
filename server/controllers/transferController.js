const Variant = require("../models/variantModel");
const Store = require("../models/storeModel");

// get all Brands
const transferVariant = async (req, res) => {
  try {
    const { amounts, variant, store } = req.body;

    const storeExists = await Store.findById(store);
    if (!storeExists) {
      return res.status(400).json({ error: "No such store" });
    }

    const updatedVariants = await Promise.all(
      variant.map(async (sVariant, index) => {
        const exists = await Variant.findOne({
          modelName: sVariant.modelName,
          store: store,
        });

        if (exists) {
          return Variant.findOneAndUpdate(
            { modelName: sVariant.modelName, store: store },
            { $inc: { amount: +amounts[index] } },
            { new: true }
          );
        } else {
          return Variant.create({
            productName: sVariant.productName,
            brandName: sVariant.brandName,
            modelName: sVariant.modelName,
            images: sVariant.images,
            sizes: sVariant.sizes,
            colors: sVariant.colors,
            price: sVariant.price,
            amount: amounts[index],
            condition: sVariant.condition,
            gender: sVariant.gender,
            shortDescription: sVariant.shortDescription,
            productCatagory: sVariant.productCatagoryId,
            store: store,
          });
        }
      })
    );

    const reducedVariants = await Promise.all(
      variant.map((sVariant, index) => {
        return Variant.findOneAndUpdate(
          { _id: sVariant._id },
          { $inc: { amount: -amounts[index] } },
          { new: true }
        );
      })
    );

    res.status(200).json({ updatedVariants, reducedVariants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { transferVariant };
