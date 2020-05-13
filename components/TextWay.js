import React from "react";
import styled from "styled-components";
import { View, Animated, Dimensions, Text } from "react-native";
import * as Font from "expo-font";
import { connect } from "react-redux";

let customFonts = {
  "Ali-Bold": require("../assets/fonts/Alibaba-PuHuiTi-Bold.ttf"),
};

//接收redux传来的参数
function mapStateToProps(state) {
  return {
    action: state.action,
    text: state.text,
    fontSize: state.fontSize,
    fontWeight: state.fontWeight,
    textSpeed: state.textSpeed,
    durationTime: state.durationTime,
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
    fontsLoaded: false,
    x: new Animated.Value(-screenWidth / 2),
    text: "自身state中设置的Loding",
    width: 0,
    reverse: -1,
  };

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
      toValue: (screenWidth / 2 + this.state.width / 2) * this.state.reverse,
      useNativeDriver: true,
      duration: this.props.durationTime,
      easing: null,
    }).start(() => {
      this.state.x.setValue(
        (-screenWidth / 2 - this.state.width / 2) * this.state.reverse
      );
      this.startRoll();
    });
  }
  //异步字体加载
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  //初次渲染完毕弹幕开始滚动
  componentDidMount() {
    this._loadFontsAsync();
    this.startRoll();
  }

  componentDidUpdate() {}

  render() {
    if (this.state.fontsLoaded) {
      return (
        <Container>
          <TextWrap>
            <AnimatedText
              onLayout={({ nativeEvent: e }) => this.layout(e)}
              style={{
                transform: [{ translateX: this.state.x }],
                fontSize: this.props.fontSize,
                fontWeight: this.props.fontWeight,
                fontFamily: "Ali-Bold",
              }}
            >
              {this.props.text}
            </AnimatedText>
          </TextWrap>
          <View style={{ top: 100 }}>
            <DebugText>动作:{this.props.action}</DebugText>
            <DebugText>文字大小:{this.props.fontSize}</DebugText>
            <DebugText>文字粗细:{this.props.fontWeight}</DebugText>
            <DebugText>文本速度:{this.props.textSpeed}</DebugText>
            <DebugText>文本宽度:{this.state.width}</DebugText>
            <DebugText>所需时间:{this.props.durationTime}</DebugText>
          </View>
        </Container>
      );
    } else {
      return <Text>AppLoading</Text>;
    }
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
