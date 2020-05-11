import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";

//redux中初始状态值
const initialState = {
  text: "Milky Way",
  fontSize: 80,
  fontWeight: "bold",
  textSpeed: 0.2,
};
//状态包装器,把状态打包
const reducer = (state = initialState, action) => {
  switch (action.type) {
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
