const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  guid: String,
  title: String,
  price: Number,
  picture: String,
  phone: String,
  address: String,
  shortDescription: String
});

const HotelModel = mongoose.model("Hotel", hotelSchema);

module.exports = HotelModel;
