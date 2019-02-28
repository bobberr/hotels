const HotelModel = require("../models/Hotel");

const hotelByName = async (req, res, next) => {
  const hotelName = req.query.hotelName;
  try {
    const hotel = await HotelModel.findOne({
      title: hotelName
    });

    res.send({ hotel });
  } catch (e) {
    next(e);
  }
};

module.exports = hotelByName;
