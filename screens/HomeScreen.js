import React from "react";
import { SplashScreen } from "expo";
import { StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import TextWay from "../components/TextWay";
import AppLoding from "../components/AppLoding";
import * as Font from "expo-font";

//加载本地字体文件
let customFonts = {
  "Ali-Bold": require("../assets/fonts/Alibaba-PuHuiTi-Bold.ttf"),
  "Ali-Heavy": require("../assets/fonts/Alibaba-PuHuiTi-Heavy.ttf"),
  "Ali-Light": require("../assets/fonts/Alibaba-PuHuiTi-Light.ttf"),
  "Ali-Medium": require("../assets/fonts/Alibaba-PuHuiTi-Medium.ttf"),
  "Ali-Regular": require("../assets/fonts/Alibaba-PuHuiTi-Regular.ttf"),
};

function mapStateToProps(state) {
  return { text: state.text };
}

function mapDispatchToProps(dispatch) {
  return {};
}

class HomeScreen extends React.Component {
  state = {
    text: "HomeScreen的state中设置Loding",
    //判断字体是否加载完毕
    fontsLoaded: false,
  };

  //异步字体加载
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    //状态栏深色
    StatusBar.setBarStyle("dark-content", true);
    this.setState({
      //文本(暂时也没用)
      text: this.props.text,
    });
    //使本地初始屏幕（在app.json中配置）保持可见，直到调用hide为止。
    SplashScreen.preventAutoHide();
    SplashScreen.hide();
    this._loadFontsAsync();
  }
  componentDidUpdate() {}

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <RootView>
          <Menu />
          <Container>
            <TextWay />
          </Container>
        </RootView>
      );
    } else {
      return <AppLoding />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #1e1e1e;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
