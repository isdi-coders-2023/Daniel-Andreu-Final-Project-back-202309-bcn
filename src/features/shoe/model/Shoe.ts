import { Schema, model } from "mongoose";
import type { ShoeStructure } from "../types";

const shoeSchema = new Schema<ShoeStructure>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  shoeStatus: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isBoxIncluded: {
    type: Boolean,
    required: true,
  },
  isChangesAccepted: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Shoe = model("Shoe", shoeSchema, "shoes");

export default Shoe;
