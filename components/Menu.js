import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { action: state.action, text: state.text };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU",
      }),
  };
}

const screenHeight = Dimensions.get("screen").height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight),
    fly: new Animated.Value(120),
    text: "Loding",
  };

  componentDidMount() {
    this.toggleMenu();
    this.setState({
      text: this.props.text,
    });
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, { toValue: 66 }).start();
      Animated.timing(this.state.fly, {
        toValue: 120,
        duration: 200,
      }).start();
    }
    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, { toValue: screenHeight }).start();
      Animated.timing(this.state.fly, {
        toValue: -screenHeight - 44,
        duration: 500,
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Title>Setting</Title>
          <Subtitle>Designer at design & code</Subtitle>
        </Cover>

        <AnimatedCloseView
          style={{
            position: "absolute",
            top: this.state.fly,
            left: "50%",
            marginLeft: -22,
            zIndex: 11,
          }}
        >
          <TouchableOpacity onPress={this.props.closeMenu} style={{}}>
            <Ionicons
              name='md-airplane'
              size={30}
              color='#1e1e1e'
              position='absolute'
            />
          </TouchableOpacity>
        </AnimatedCloseView>

        <Content></Content>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 10;
  border-radius: 10px;

  position: absolute;
`;

const Cover = styled.View`
  height: 142px;
  background: #1e1e1e;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;
const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;
const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  align-items: center;
  justify-content: center;
`;
const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);
const AnimatedContainer = Animated.createAnimatedComponent(Container);
