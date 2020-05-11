import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";

//redux中初始状态值
const initialState = {
  action: "closeMenu",
  text: "Milky Way",
  fontSize: 80,
  fontWeight: "bold",
  textSpeed: 0.2,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_LINK":
      return { ...state, action: "openLink" };
    case "CLOSE_LINK":
      return { ...state, action: "closeLink" };
    case "UPDATE_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "UPDATE_FONT":
      return {
        ...state,
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
