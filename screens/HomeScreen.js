import React from "react";
import { SplashScreen } from "expo";
import { StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import TextWay from "../components/TextWay";

function mapStateToProps(state) {
  return { text: state.text };
}

function mapDispatchToProps(dispatch) {
  return {};
}

class HomeScreen extends React.Component {
  state = {
    text: "HomeScreen的state中设置Loding",
  };

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
  }
  componentDidUpdate() {}

  render() {
    return (
      <RootView>
        <Menu />
        <Container>
          <TextWay />
        </Container>
      </RootView>
    );
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
