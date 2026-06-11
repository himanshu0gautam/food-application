import mongoose from "mongoose";

const DishSchema = new mongoose.Schema(
  {
    dishName: {
      type: String,
      require: true,
      index: true,
    },
    dishImage: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    typeOfFood: {
      type: String,
      required: true,
      index: true,
    },
    preprationTime: {
      type: String,
    },
    distance: {
      type: String,
    },
    dishPrice: {
      type: String,
      require: true,
      index: true,
    },
    dishHalfPrice: {
      type: String,
      require: true,
      index: true,
    },
    calories: {
      type: String,
      required: true,
    },
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodPartner",
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    Rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);


const dishModel = mongoose.model("dish", DishSchema);

export default dishModel;