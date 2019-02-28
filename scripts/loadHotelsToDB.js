const mongoose = require("mongoose");
const mockData = require("../mockData/hotels.json");
const HotelModel = require("../server/models/Hotel");
require("dotenv").config({ path: __dirname + "/../.env" });

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${
      process.env.DB_PASS
    }@ds149885.mlab.com:49885/hotels`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    const savePromises = mockData.map(hotel => {
      const { guid, title, picture, phone, address, shortDescription } = hotel;

      let { price } = hotel;
      price = price.substring(1);

      const hotelItem = new HotelModel({
        guid,
        title,
        price,
        picture,
        phone,
        address,
        shortDescription
      });

      return hotelItem.save();
    });

    return Promise.all(savePromises);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(e => {
    console.log("Error while connection to the database");
    mongoose.connection.close();
  });
