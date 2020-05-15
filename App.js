import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Dimensions, DeviceInfo } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { toHsv } from "react-native-color-picker";

//获取屏幕宽高
const screenWidth = Math.round(Dimensions.get("screen").width);
const screenHeight = Math.round(Dimensions.get("screen").height);

//redux中初始状态值
const initialState = {
  text: "Milky Way",
  fontSize: 80,
  fontWeight: "200",
  textWidth: 900,
  textSpeed: 0.2,
  durationTime: 2000,
  isPickerOpen: false,
  isLinkMenuOpen: false,
  textColor: toHsv("white"),
  //文字方向,向右为正
  textDirection: 1,
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
      };
    case "UPDATE_SPEED":
      return {
        ...state,
        textSpeed: action.textSpeed,
        durationTime: (screenWidth + state.textWidth) / action.textSpeed,
      };
    case "UPDATE_WIDTH":
      return {
        ...state,
        textWidth: action.textWidth,
        durationTime: (screenWidth + action.textWidth) / state.textSpeed,
      };
    case "OPEN_PICKER":
      return {
        ...state,
        isPickerOpen: true,
      };
    case "CLOSE_PICKER":
      return {
        ...state,
        isPickerOpen: false,
      };
    case "OPEN_LINKMENU":
      return {
        ...state,
        isLinkMenuOpen: true,
      };
    case "CLOSE_LINKMENU":
      return {
        ...state,
        isLinkMenuOpen: false,
      };
    case "UPDATE_COLOR":
      return {
        ...state,
        textColor: action.textColor,
      };
    case "CHANGE_TEXTDIRECTION":
      return {
        ...state,
        textDirection: action.textDirection,
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
