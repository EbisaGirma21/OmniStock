const mongoose = require("mongoose");

const SellSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productCatagory: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Sell = mongoose.model("Sell", SellSchema);
module.exports = Sell;
