import React from "react";
import styled from "styled-components";
import { Animated, Easing } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { fromHsv } from "react-native-color-picker";

//获取redux中的数据作为Props
function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    textDirection: state.textDirection,
  };
}
//创建dispatch方法发布更新命令及传参
function mapDispatchToProps(dispatch) {
  return {
    closePicker: () => {
      dispatch({
        type: "CLOSE_PICKER",
      });
    },
    changeTextDirection: (textDirection) => {
      dispatch({
        type: "CHANGE_TEXTDIRECTION",
        textDirection: textDirection,
      });
    },
  };
}

class DirectionButton extends React.Component {
  //创建组件内变量
  state = {
    //文字方向
    direction: -1,
    //按钮方向
    iconDirection: new Animated.Value(1),
  };

  spin = () => {
    if (this.props.textDirection > 0) {
      this.spinToLeft();
      this.props.changeTextDirection(-1);
    } else {
      this.spinToRight();
      this.props.changeTextDirection(1);
    }
  };
  //旋转至朝左方法
  spinToLeft = () => {
    Animated.timing(this.state.iconDirection, {
      toValue: 0.5, // 最终值 为1，这里表示最大旋转 360度
      duration: 1500,
      easing: Easing.in(Easing.elastic(4)),
    }).start();
  };
  //旋转至朝右方法
  spinToRight = () => {
    Animated.timing(this.state.iconDirection, {
      toValue: 1, // 最终值 为1，这里表示最大旋转 360度
      duration: 1500,
      easing: Easing.in(Easing.elastic(4)),
    }).start();
  };

  render() {
    //映射 0-1的值 映射 成 0 - 360 度
    const spin = this.state.iconDirection.interpolate({
      inputRange: [0, 1], //输入值
      outputRange: ["0deg", "360deg"], //输出值
    });
    return (
      <Container>
        <TouchableContainer onPress={() => this.spin()}>
          <AnimatedIconContainer style={{ transform: [{ rotateZ: spin }] }}>
            <Ionicons
              name='md-arrow-round-forward'
              size={40}
              color={fromHsv(this.props.textColor)}
              style={{
                height: 40,
              }}
            />
          </AnimatedIconContainer>
        </TouchableContainer>
      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DirectionButton);
const Container = styled.View``;
const TouchableContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  background-color: #1e1e1e;
  opacity: 0.8;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
const AnimatedIconContainer = Animated.createAnimatedComponent(IconContainer);
