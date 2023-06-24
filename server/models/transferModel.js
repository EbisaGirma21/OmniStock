const mongoose = require("mongoose");

const TransferSchema = mongoose.Schema(
  {
    senderStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    receiverStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    productCatagory: {
      type: String,
      required: true,
    },
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
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", TransferSchema);
module.exports = Transfer;
