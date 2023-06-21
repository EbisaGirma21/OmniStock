const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productCatagory: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },
    requestType: {
      type: String,
    },
    requestStatus: {
      type: String,
    },
    readStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
