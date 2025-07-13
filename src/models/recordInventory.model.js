const { Schema, default: mongoose } = require("mongoose");

const recordInventorySchema = new Schema(
  {
    recordInventoryCode: {
      type: String,
      required: true,
    },
    recordInventoryDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
    },
    purpose: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEditStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "REJECTED"],
      required: true,
      default: "PENDING",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        numberOfSystem: {
          type: Number,
          required: true,
        },

        numberOfReality: {
          type: Number,
          required: true,
        },

        difference: {
          type: Number,
          required: true,
        },

        solution: {
          type: String,
        },
      },
    ],
    editStatusAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const RecordInventory = mongoose.model(
  "RecordInventory",
  recordInventorySchema
);
module.exports = RecordInventory;
