import React from "react";
import "./App.css";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducer";
import Filters from "./components/Filters";
import HotelsList from "./components/HotelsList";
import Pagination from "./components/Pagination";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = ({ classes }) => {
  return (
    <Provider store={store}>
      <div style={{ width: "1000px", margin: "0 auto", marginTop: "30px" }}>
        <Filters />
        <HotelsList />
        <Pagination />
      </div>
    </Provider>
  );
};

export default App;
