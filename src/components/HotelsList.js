import React from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { fetchHotels } from "../redux/ducks/hotels";
import HotelItem from "./HotelItem";

class HotelsList extends React.Component {
  state = {
    error: false,
    loading: true
  };

  componentDidMount() {
    const {
      fetchHotels,
      page,
      priceRange: { min, max },
      sorting,
      direction
    } = this.props;

    fetchHotels(min, max, page, sorting, direction)
      .then(() => {
        this.setState({ error: false, loading: false });
      })
      .catch(e => {
        console.log(e);
        this.setState({ error: true, loading: false });
      });
  }

  render() {
    const { error, loading } = this.state;
    const { hotels } = this.props;
    const hotelsToDisplay = hotels.map(hotel => {
      return <HotelItem key={hotel._id} {...hotel} />;
    });

    if (error) {
      return <p>There is an error while fetching hotels list :(</p>;
    }

    if (loading) {
      return (
        <ReactLoading
          type={"spokes"}
          color={"black"}
          height={"15%"}
          width={"15%"}
        />
      );
    }

    if (!hotels.length) {
      return <p>There are no items to display :(</p>;
    }

    return (
      <div>
        <p style={{ fontSize: "36px" }}>Hotels:</p>
        {hotelsToDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { page, priceRange, sorting, direction, hotels } = state.hotelsReducer;
  return { page, priceRange, sorting, direction, hotels };
};

export default connect(
  mapStateToProps,
  { fetchHotels }
)(HotelsList);
