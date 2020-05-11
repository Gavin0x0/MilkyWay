import React from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

//获取redux中的数据作为Props
function mapStateToProps(state) {
  return {
    action: state.action,
    text: state.text,
    fontSize: state.fontSize,
    fontWeight: state.fontWeight,
    textSpeed: state.textSpeed,
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
    updateText: (text) => {
      dispatch({
        type: "UPDATE_TEXT",
        text: text,
      });
    },
    updateFont: (fontSize, fontWeight, textSpeed) => {
      dispatch({
        type: "UPDATE_FONT",
        fontSize: fontSize,
        fontWeight: fontWeight,
        textSpeed: textSpeed,
      });
    },
  };
}

//获取屏幕高度
const screenHeight = Dimensions.get("screen").height;

class Menu extends React.Component {
  //创建组件内变量
  state = {
    //菜单是否启动
    isOpen: false,
    //菜单距顶端距离变量
    top: new Animated.Value(screenHeight),
    //飞机按钮距顶端距离变量
    fly: new Animated.Value(120),
    //不透明度
    opacity: new Animated.Value(1),
    //输入栏文本变量
    text: "Loding",
    //文本速度
    textSpeed: 0.2,
    //字体大小
    fontSize: 50,
    //字体粗细
    fontWeight: "600",
  };

  constructor(props) {
    super(props);
    //创建手势组件
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
    });
  }
  //初次渲染时调用
  componentDidMount() {
    //触发菜单(启动/关闭取决于app.js中的初始action状态)
    //this.toggleMenu();
    console.log("Menu初次渲染");
  }

  //每次props/state更新时调用
  componentDidUpdate() {
    //触发菜单(启动/关闭取决于接收到的action)
    //this.toggleMenu();
    console.log("Menu重渲染");
  }

  //手势滑动反馈
  onPanResponderMove = (evt, gestureState) => {
    if (this.state.isOpen) {
      //菜单下滑
      if (gestureState.dy > 0) {
        console.log("onPanResponderMove zyx dx", gestureState.dx);
        console.log("onPanResponderMove zyx dy", gestureState.dy);
        let height = gestureState.dy;
        Animated.spring(this.state.top, {
          toValue: 1.5 * height + 66,
        }).start();
      }
    } else {
      //菜单上滑
      if (gestureState.dy < 0) {
        console.log("onPanResponderMove zyx dx", gestureState.dx);
        console.log("onPanResponderMove zyx dy", gestureState.dy);
        let height = -gestureState.dy;
        Animated.spring(this.state.top, {
          toValue: screenHeight - 1.5 * height - 100,
        }).start();
      }
    }
  };
  //手势释放反馈
  _handlePanResponderEnd = (e, gestureState) => {
    if (this.state.isOpen) {
      if (gestureState.dy > 0) {
        // 执行向下滑移动画
        let height = gestureState.dy;
        console.log("_handlePanResponderEnd zyx dx", gestureState.dx);
        console.log("_handlePanResponderEnd zyx dy", gestureState.dy);
        if (height > screenHeight / 6) {
          this.setState({
            isOpen: false,
          });
          height = screenHeight;
        } else {
          height = 66;
        }
        Animated.timing(this.state.top, {
          toValue: height,
          duration: 300,
        }).start();
      }
    } else {
      if (gestureState.dy < 0) {
        // 执行向上移动画
        let height = -gestureState.dy;
        console.log("_handlePanResponderEnd zyx dx", gestureState.dx);
        console.log("_handlePanResponderEnd zyx dy", gestureState.dy);
        if (height > screenHeight / 6) {
          this.setState({
            isOpen: true,
          });
          height = 66;
        } else {
          height = screenHeight;
        }
        Animated.timing(this.state.top, {
          toValue: height,
          duration: 300,
        }).start();
      }
    }
  };
  //将参数传入提交函数
  beginUpdateFont = () => {
    console.log("触发了一次提交");
    this.props.updateFont(
      this.state.fontSize,
      this.state.fontWeight,
      this.state.textSpeed
    );
  };
  //调整大小时触发渐隐,并提交
  changingFont = (fontSize) => {
    this.setState({
      fontSize: fontSize,
    });
    //直接提交
    this.props.updateFont(
      fontSize,
      this.state.fontWeight,
      this.state.textSpeed
    );
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
  //调整速度时触发渐隐,并提交
  changingSpeed = (textSpeed) => {
    this.setState({
      textSpeed: textSpeed,
    });
    //直接提交
    this.props.updateFont(
      this.state.fontSize,
      this.state.fontWeight,
      textSpeed
    );
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: 0,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: 1500,
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
    }
  };

  //文本输入栏输入时直接提交
  textChange = (text) => {
    this.props.updateText(text);
  };

  render() {
    return (
      <TransparentContainer {...this._panResponder.panHandlers}>
        <AnimatedContainer
          style={{ top: this.state.top, opacity: this.state.opacity }}
        >
          <Cover>
            <Title>Setting</Title>
            <Title>{this.state.isOpen ? "开着" : "关着"}</Title>
            <Subtitle>Designed by Levi & 🌙</Subtitle>
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
                step={1}
                minimumTrackTintColor='#000000'
                maximumTrackTintColor='#FFFFFF'
                thumbTintColor='#1e1e1e'
                onValueChange={(fontSize) => this.changingFont(fontSize)}
              />
            </MenuItem>
            <MenuItem>
              <MenuText>文本速度</MenuText>
              <FontSizeSlider
                minimumValue={0.05}
                maximumValue={1}
                step={0.05}
                minimumTrackTintColor='#000000'
                maximumTrackTintColor='#FFFFFF'
                thumbTintColor='#1e1e1e'
                onValueChange={(textSpeed) => this.changingSpeed(textSpeed)}
              />
            </MenuItem>
          </Content>
        </AnimatedContainer>
      </TransparentContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const TransparentContainer = styled.View`
  z-index: 2;
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  opacity: 1;
`;

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
