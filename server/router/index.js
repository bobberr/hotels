const fetchHotels = require("../controllers/fetchHotels");
const hotelByName = require("../controllers/hotelByName");

const router = app => {
  app.get("/hotels-by-price", fetchHotels);

  app.get("/hotel-by-name", hotelByName);
};

module.exports = router;
