const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video"], required: true },
  src: { type: String, required: true }, // file path
}, { timestamps: true });

module.exports = mongoose.model("Media", mediaSchema);
