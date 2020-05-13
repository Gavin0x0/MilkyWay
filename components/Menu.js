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
      });
    },
    updateSpeed: (textSpeed) => {
      dispatch({
        type: "UPDATE_SPEED",
        textSpeed: textSpeed,
      });
    },
  };
}

//获取屏幕高度
const screenHeight = Math.round(Dimensions.get("screen").height);

class Menu extends React.Component {
  //创建组件内变量
  state = {
    //菜单是否启动
    isOpen: false,
    //菜单Y轴位移变量
    MenuY: new Animated.Value(screenHeight),
    //飞机按钮距顶端距离变量
    fly: new Animated.Value(120),
    //不透明度
    opacity: new Animated.Value(1),
    //底部小箭头位移
    bottomIconY: new Animated.Value(0),
    //底部小箭头不透明度
    bottomIconOpacity: new Animated.Value(0),
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
      onPanResponderGrant: this.onPanResponderGrant,
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
  //手势激活反馈
  //使用native渲染,不影响js线程
  onPanResponderGrant = () => {
    if (!this.state.isOpen) {
      Animated.sequence([
        Animated.timing(this.state.bottomIconOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.bottomIconY, {
          toValue: -55,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.bottomIconY, {
          toValue: -15,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.bottomIconY, {
          toValue: -44,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.bottomIconY, {
          toValue: -12,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.bottomIconOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  //手势滑动反馈
  onPanResponderMove = (evt, gestureState) => {
    if (this.state.isOpen) {
      //菜单下滑
      if (gestureState.dy > 0) {
        console.log("菜单下滑 ", gestureState.dy);
        let height = gestureState.dy;
        Animated.spring(this.state.MenuY, {
          toValue: 66 + height,
        }).start();
      }
    } else {
      //菜单上滑
      if (gestureState.dy < 0) {
        console.log("菜单上滑", gestureState.dy);
        let height = -gestureState.dy;
        Animated.spring(this.state.MenuY, {
          toValue: screenHeight - 66 - height,
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
        console.log("_handlePanResponderEnd zyx dy", gestureState.dy);
        if (height > screenHeight / 6) {
          console.log("执行了关闭");
          Animated.timing(this.state.MenuY, {
            toValue: screenHeight,
            duration: 300,
          }).start();
          console.log("关闭了菜单");
          this.setState({
            isOpen: false,
          });
        } else {
          console.log("没执行关闭");
          Animated.timing(this.state.MenuY, {
            toValue: 66,
            duration: 300,
          }).start();
        }
      }
    } else {
      if (gestureState.dy < 0) {
        // 执行向上移动画
        let height = -gestureState.dy;
        console.log("_handlePanResponderEnd zyx dy", gestureState.dy);
        if (height > screenHeight / 6) {
          Animated.timing(this.state.MenuY, {
            toValue: 66,
            duration: 300,
          }).start();
          console.log("打开了菜单");
          this.setState({
            isOpen: true,
          });
        } else {
          Animated.timing(this.state.MenuY, {
            toValue: screenHeight,
            duration: 300,
          }).start();
        }
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
    this.props.updateFont(fontSize, this.state.fontWeight);
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: 0,
        //useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: 800,
        //useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        //useNativeDriver: true,
      }),
    ]).start();
  };
  //调整速度时触发渐隐,并提交
  changingSpeed = (textSpeed) => {
    this.setState({
      textSpeed: textSpeed,
    });
    //直接提交
    this.props.updateSpeed(textSpeed);
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: 0,
        //useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0.1,
        duration: 1500,
        //useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        //useNativeDriver: true,
      }),
    ]).start();
  };
  //触发菜单
  toggleMenu = () => {
    console.log("触发了一次toggleMenu");
  };

  //文本输入栏输入时直接提交
  textChange = (text) => {
    this.props.updateText(text);
  };

  render() {
    return (
      <TransparentContainer {...this._panResponder.panHandlers}>
        <AnimatedIconContainer
          style={{
            opacity: this.state.bottomIconOpacity,
            transform: [{ translateY: this.state.bottomIconY }],
          }}
        >
          <Ionicons name='md-arrow-round-up' size={44} color='white' />
        </AnimatedIconContainer>
        <AnimatedContainer
          style={{
            transform: [{ translateY: this.state.MenuY }],
            top: 0,
            opacity: this.state.opacity,
          }}
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
                name='md-link'
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
  align-items: center;
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 10;
  border-radius: 10px;
`;
const IconWrap = styled.View`
  position: absolute;
  bottom: 15px;
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
const AnimatedIconContainer = Animated.createAnimatedComponent(IconWrap);
