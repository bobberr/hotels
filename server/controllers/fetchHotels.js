const HotelModel = require("../models/Hotel");

const fetchHotels = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const minPrice = +req.query.minPrice || 0;
  const maxPrice = +req.query.maxPrice || 1000;
  const sorting = req.query.sorting;
  const sortDirection = +req.query.sortDir;
  const skip = (page - 1) * limit;

  const options = {
    limit,
    skip
  };

  if (sorting && sortDirection) {
    options.sort = {
      [sorting]: sortDirection
    };
  }

  try {
    const hotels = await HotelModel.find(
      {
        price: {
          $gte: minPrice,
          $lte: maxPrice
        }
      },
      [
        "_id",
        "guid",
        "title",
        "price",
        "picture",
        "phone",
        "address",
        "shortDescription"
      ],
      options
    );

    const allQueriedHotels = await HotelModel.countDocuments({
      price: {
        $gte: minPrice,
        $lte: maxPrice
      }
    });

    res.send({ hotels, pages: Math.ceil(allQueriedHotels / limit) });
  } catch (e) {
    next(e);
  }
};

module.exports = fetchHotels;
