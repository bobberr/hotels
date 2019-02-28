import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { paginateHotels } from "../redux/ducks/hotels";

const styles = {
  container: {
    width: "500px",
    margin: "0 auto 20px auto"
  },
  button: {
    border: "2px solid black",
    background: "transparent",
    cursor: "pointer",
    marginRight: "2px"
  },
  activeButton: {
    border: "2px solid black",
    background: "lightblue",
    cursor: "pointer",
    marginRight: "2px"
  }
};

const Pagination = ({
  page,
  pages,
  paginateHotels,
  priceRange: { min, max },
  sorting,
  direction,
  classes
}) => {
  const paginationButtons = [];

  for (let a = 1; a < pages + 1; a++) {
    paginationButtons.push(
      <button
        className={page === a ? classes.activeButton : classes.button}
        onClick={() => {
          if (page === a) {
            return;
          }
          paginateHotels(min, max, a, sorting, direction);
        }}
        key={a}
      >
        {a}
      </button>
    );
  }

  return <div className={classes.container}>{paginationButtons}</div>;
};

const mapStateToProps = state => {
  const { page, pages, priceRange, sorting, direction } = state.hotelsReducer;

  return { page, pages, priceRange, sorting, direction };
};

export default connect(
  mapStateToProps,
  { paginateHotels }
)(injectSheet(styles)(Pagination));
