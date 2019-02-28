import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import throttle from "lodash.throttle";
import { fetchHotels, fetchByName } from "../redux/ducks/hotels";
import InputRange from "react-input-range";
import("react-input-range/lib/css/index.css");

const styles = {
  input: {
    border: "2px solid black",
    width: "200px",
    height: "30px",
    fontSize: "26px",
    marginRight: "20px"
  },
  rangeInput: {
    width: "400px",
    marginTop: "40px"
  },
  sortButton: {
    border: "2px solid black",
    background: "transparent",
    marginRight: "10px"
  },
  form: {
    marginBottom: "50px"
  }
};

class Filters extends React.Component {
  onPriceChange = value => {
    const { page, fetchHotels, sorting, direction } = this.props;
    const { min, max } = value;

    this.input.value = "";
    fetchHotels(min, max, page, sorting, direction);
  };

  onHotelSearch = e => {
    const {
      fetchByName,
      page,
      priceRange: { min, max },
      fetchHotels
    } = this.props;

    const hotelToSearch = e.target.value;

    // if the input is empty - fetch all hotels according to price range filter
    if (hotelToSearch.length) {
      fetchByName(hotelToSearch.toUpperCase());
      return;
    }

    fetchHotels(min, max, page);
  };

  onSort = (sorting, e) => {
    e.preventDefault();
    const {
      page,
      priceRange: { min, max },
      direction,
      fetchHotels
    } = this.props;

    this.input.value = "";
    fetchHotels(min, max, page, sorting, direction === 1 ? -1 : 1);
  };

  render() {
    const throttledSearch = throttle(this.onPriceChange, 500, {
      trailing: false
    });

    const { classes } = this.props;

    return (
      <form className={classes.form}>
        <input
          ref={ref => (this.input = ref)}
          type="text"
          onChange={this.onHotelSearch}
          className={classes.input}
        />
        <button
          className={classes.sortButton}
          onClick={this.onSort.bind(null, "title")}
        >
          Sort by name
        </button>
        <button
          className={classes.sortButton}
          onClick={this.onSort.bind(null, "price")}
        >
          Sort by price
        </button>
        <div className={classes.rangeInput}>
          <InputRange
            formatLabel={value => `$${value}`}
            maxValue={1000}
            minValue={0}
            step={25}
            value={this.props.priceRange}
            onChange={throttledSearch}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { page, priceRange, sorting, direction } = state.hotelsReducer;
  return { page, priceRange, sorting, direction };
};

export default connect(
  mapStateToProps,
  { fetchHotels, fetchByName }
)(injectSheet(styles)(Filters));
