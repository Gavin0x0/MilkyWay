import React from "react";
import styled from "styled-components";
import { Animated, Easing, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

//获取redux中的数据作为Props
function mapStateToProps(state) {
  return {
    isLinkMenuOpen: state.isLinkMenuOpen,
  };
}
//创建dispatch方法发布更新命令及传参
function mapDispatchToProps(dispatch) {
  return {
    openLnikMenu: () => {
      dispatch({
        type: "OPEN_LINKMENU",
      });
    },
    closeLnikMenu: () => {
      dispatch({
        type: "CLOSE_LINKMENU",
      });
    },
  };
}

class DirectionButton extends React.Component {
  //创建组件内变量
  state = {};

  render() {
    if (!this.props.isLinkMenuOpen) {
      return <Container></Container>;
    }
    return <Container></Container>;
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DirectionButton);

const Container = styled.View`
  height: 50%;
  width: 100%;
  background-color: yellowgreen;
`;
