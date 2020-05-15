import React from "react";
import styled from "styled-components";
import {
  View,
  Animated,
  Dimensions,
  Text,
  Button,
  Easing,
  PixelRatio,
} from "react-native";
import { connect } from "react-redux";
import { EasyLoading, Loading } from "../components/LoadFinish";
import { fromHsv } from "react-native-color-picker";

//接收redux传来的参数
function mapStateToProps(state) {
  return {
    action: state.action,
    text: state.text,
    fontSize: state.fontSize,
    fontWeight: state.fontWeight,
    textSpeed: state.textSpeed,
    durationTime: state.durationTime,
    textColor: state.textColor,
    textDirection: state.textDirection,
  };
}

//向redux提交参数
function mapDispatchToProps(dispatch) {
  return {
    updateWidth: (textWidth) => {
      dispatch({
        type: "UPDATE_WIDTH",
        textWidth: textWidth,
      });
    },
  };
}

//获取屏幕宽高
const screenWidth = Math.round(Dimensions.get("screen").width);
const screenHeight = Math.round(Dimensions.get("screen").height);

class TextWay extends React.Component {
  state = {
    x: new Animated.Value(50),
    text: "自身state中设置的Loding",
    width: 0,
  };

  _showLoadFinish() {
    //EasyLoading.show();//显示
    //EasyLoading.dimiss();//关闭
    //自定义超时时间
    EasyLoading.show(3000);
  }

  //弹幕的布局发生改变时调用,每一帧都会调用,因为在不停渲染
  //提交文本宽度
  layout = (e) => {
    this.setState({
      width: e.layout.width,
    });
    this.props.updateWidth(e.layout.width);
    console.log("提交了文本宽度");
  };

  //弹幕滚动动画
  startRoll() {
    Animated.timing(this.state.x, {
      toValue:
        (screenWidth / 2 + this.state.width / 2) * this.props.textDirection,
      useNativeDriver: true,
      duration: this.props.durationTime,
      //线性运动
      easing: Easing.inOut(Easing.linear),
    }).start(() => {
      this.state.x.setValue(
        (-screenWidth / 2 - this.state.width / 2) * this.props.textDirection
      );
      this.startRoll();
    });
  }

  //初次渲染完毕弹幕开始滚动
  componentDidMount() {
    this.startRoll();
    this._showLoadFinish();
  }

  componentDidUpdate() {}

  render() {
    return (
      <Container>
        <Loading />
        <TextWrap>
          <AnimatedText
            onLayout={({ nativeEvent: e }) => this.layout(e)}
            style={{
              transform: [{ translateX: this.state.x }],
              fontSize: this.props.fontSize / PixelRatio.getFontScale(),
              fontWeight: this.props.fontWeight,
              fontFamily: "Ali-Bold",
              color: fromHsv(this.props.textColor),
            }}
          >
            {this.props.text}
          </AnimatedText>
        </TextWrap>
        <View style={{ top: 100 }}>
          <DebugText>字体大小的比例:{PixelRatio.getFontScale()}</DebugText>
          <DebugText>文字大小:{this.props.fontSize}</DebugText>
          <DebugText>文字粗细:{this.props.fontWeight}</DebugText>
          <DebugText>文本速度:{this.props.textSpeed}</DebugText>
          <DebugText>文本宽度:{this.state.width}</DebugText>
          <DebugText>屏幕宽度:{screenWidth}</DebugText>
          <DebugText>所需时间:{this.props.durationTime}</DebugText>
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextWay);

//文本固定样式
const TextToshot = styled.Text`
  text-align: center;
  color: white;
`;
const AnimatedText = Animated.createAnimatedComponent(TextToshot);

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

//滚动文字容器,最大宽度50000,决定了最长文本宽度
const TextWrap = styled.View`
  width: 50000px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DebugText = styled.Text`
  color: white;
`;
