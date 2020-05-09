import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";

const initialState = {
  action: "",
  text: "App.js的Loding...",
  fontSize: 50,
  fontWeight: 500,
  textSpeed: 0.2,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_TEXT":
      return {
        text: action.text,
        fontSize: action.fontSize,
        fontWeight: action.fontWeight,
        textSpeed: action.textSpeed,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default App;
