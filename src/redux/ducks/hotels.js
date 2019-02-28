import config from "../../config/";

// Actions
const LOAD_HOTELS = "hotels/LOAD_HOTELS";

const initialState = {
  hotels: [],
  page: 1,
  pages: 0,
  priceRange: {
    min: 0,
    max: 1000
  },
  sorting: "",
  direction: 0
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_HOTELS: {
      return Object.assign({}, state, {
        ...action
      });
    }
    default:
      return state;
  }
}

// Action creators
export function fetchHotels(min, max, page, sorting = "", direction = 0) {
  return dispatch => {
    return fetch(
      `${config.server_host}/hotels-by-price?page=${page}&limit=${
        config.items_per_page
      }&minPrice=${min}&maxPrice=${max}&sorting=${sorting}&sortDir=${direction}`
    )
      .then(data => data.json())
      .then(response => {
        dispatch({
          type: LOAD_HOTELS,
          ...response,
          page: 1, //always reset page to initial after applied price filter
          priceRange: { min, max },
          direction,
          sorting
        });
      });
  };
}

export function paginateHotels(min, max, page, sorting = "", direction = 0) {
  return dispatch => {
    return fetch(
      `${config.server_host}/hotels-by-price?page=${page}&limit=${
        config.items_per_page
      }&minPrice=${min}&maxPrice=${max}&sorting=${sorting}&sortDir=${direction}`
    )
      .then(data => data.json())
      .then(response => {
        dispatch({
          type: LOAD_HOTELS,
          ...response,
          page
        });
      });
  };
}

export function fetchByName(hotelName) {
  return dispatch => {
    return fetch(`${config.server_host}/hotel-by-name?hotelName=${hotelName}`)
      .then(data => data.json())
      .then(response => {
        const hotelToFind = response.hotel;
        dispatch({
          type: LOAD_HOTELS,
          hotels: hotelToFind ? [hotelToFind] : [],
          pages: 0
        });
      });
  };
}
