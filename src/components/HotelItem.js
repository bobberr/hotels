import React from "react";
import injectSheet from "react-jss";

const styles = {
  image: {
    height: "200px",
    marginRight: "10px"
  },
  item: {
    display: "flex",
    marginBottom: "30px",
    border: "1px solid grey",
    padding: "10px"
  },
  name: {
    margin: "10px"
  },
  paragraph: {
    margin: "5px 0 5px 0"
  }
};

const HotelItem = ({
  title,
  price,
  picture,
  phone,
  address,
  shortDescription,
  classes
}) => {
  return (
    <div className={classes.item}>
      <img className={classes.image} src={picture} alt="hotel" />
      <div>
        <h3 className={classes.name}>{title}</h3>
        <p className={classes.paragraph}>
          <b>Price:</b> ${price}
        </p>
        <p className={classes.paragraph}>
          <b>Phone:</b> {phone}
        </p>
        <p className={classes.paragraph}>
          <b>Address:</b> {address}
        </p>
        <span>{shortDescription}</span>
      </div>
    </div>
  );
};

export default injectSheet(styles)(HotelItem);
