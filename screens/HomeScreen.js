import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import TextWay from "../components/TextWay";

const screenHeight = Dimensions.get("screen").height;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
}

class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    text: "Loding",
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    this.setState({
      text: this.props.text,
    });
  }
  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, { toValue: 0.5 }).start();

      StatusBar.setBarStyle("light-content", true);
    }
    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, { toValue: 1 }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };
  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <TextWay />
          <TouchableOpacity
            onPress={this.props.openMenu}
            style={{ position: "absolute", top: screenHeight - 64 }}
          >
            <Ionicons name='md-arrow-dropup-circle' size={44} color='white' />
          </TouchableOpacity>
        </AnimatedContainer>
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
