import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

//获取redux中的数据作为Props
function mapStateToProps(state) {
  return {
    action: state.action,
    text: state.text,
    fontSize: state.fontSize,
    fontWeight: state.fontWeight,
  };
}
//创建dispatch方法发布更新命令及传参
function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => {
      dispatch({
        type: "CLOSE_MENU",
      });
    },
    updateText: (text, fontSize, fontWeight) => {
      dispatch({
        type: "UPDATE_TEXT",
        text: text,
        fontSize: fontSize,
        fontWeight: fontWeight,
      });
    },
  };
}

//获取屏幕高度
const screenHeight = Dimensions.get("screen").height;

class Menu extends React.Component {
  //创建组件内变量
  state = {
    //菜单距顶端距离变量
    top: new Animated.Value(screenHeight),
    //飞机按钮距顶端距离变量
    fly: new Animated.Value(120),
    //不透明度
    opacity: new Animated.Value(1),
    //输入栏文本变量
    text: "Loding",
    fontSize: 500,
    fontWeight: "600",
  };

  //初次渲染时调用
  componentDidMount() {
    this.toggleMenu();
  }
  //每次props/state更新时调用
  componentDidUpdate() {
    this.toggleMenu();
  }

  beginUpdateText = () => {
    this.props.updateText(
      this.state.text,
      this.state.fontSize,
      this.state.fontWeight
    );
  };
  //调整参数时触发渐隐
  changingText = (fontSize) => {
    this.setState({
      fontSize: fontSize,
    });
    this.beginUpdateText();
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: 0,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: 800,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  };
  //触发菜单
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      //打开菜单: 菜单上滑,飞机飞上来
      Animated.spring(this.state.top, { toValue: 66 }).start();
      Animated.timing(this.state.fly, {
        toValue: 120,
        duration: 600,
      }).start();
    }
    if (this.props.action == "closeMenu") {
      //关闭菜单:菜单下沉,飞机飞走,更新文本到redux
      Animated.spring(this.state.top, { toValue: screenHeight }).start();
      Animated.sequence([
        Animated.timing(this.state.fly, {
          toValue: -screenHeight - 44,
          duration: 500,
        }),
        Animated.timing(this.state.fly, {
          toValue: screenHeight,
          duration: 0,
        }),
      ]).start();
      this.beginUpdateText();
    }
  };

  //文本输入栏输入时更新state
  textChange = (text) => {
    this.setState({
      text: text,
    });
  };

  render() {
    return (
      <AnimatedContainer
        style={{ top: this.state.top, opacity: this.state.opacity }}
      >
        <Cover>
          <Title>Setting</Title>
          <Subtitle>Designer & 😺 & 🌙</Subtitle>
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
          <TouchableOpacity onPress={this.props.closeMenu}>
            <Ionicons
              name='md-airplane'
              size={30}
              color='#1e1e1e'
              position='absolute'
            />
          </TouchableOpacity>
        </AnimatedCloseView>

        <Content>
          <TextToShot
            placeholder='Type here to shot!'
            onChangeText={(text) => this.textChange(text)}
          />
          <MenuItem>
            <MenuText>字体大小</MenuText>

            <FontSizeSlider
              minimumValue={5}
              maximumValue={500}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#FFFFFF'
              thumbTintColor='#1e1e1e'
              onValueChange={(fontSize) => this.changingText(fontSize)}
            />
          </MenuItem>
        </Content>
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
  height: ${screenHeight - 142};
  background: #f0f3f5;
  padding: 40px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  align-items: center;
  justify-content: center;
`;

const TextToShot = styled.TextInput`
  border-radius: 30px;
  background: #1e1e1e;
  padding: 20px;
  color: white;
`;
const MenuItem = styled.View`
  flex-direction: row;
  margin-top: 30px;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-around;
`;

const MenuText = styled.Text`
  font-weight: 700;
  font-size: 18px;
  color: rgba(1, 1, 1, 0.8);
`;

const FontSizeSlider = styled.Slider`
  width: 80%;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);
const AnimatedContainer = Animated.createAnimatedComponent(Container);
