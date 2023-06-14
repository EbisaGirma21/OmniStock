const mongoose = require("mongoose");

const VariantSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    variantName: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ], 
    sizes: [
      {
        type: Number,
      },
    ],
    colors: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    productCatagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCatagory",
      required: true,
    },
  },
  { timestamps: true }
);
// Ensure academicYear is unique across documents
// VariantSchema.index({ variantName: 1, model: 1 }, { unique: true });

const Variant = mongoose.model("Variant", VariantSchema);
module.exports = Variant;
