import React from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    action: state.action,
    text: state.text,
    fontSize: state.fontSize,
    fontWeight: state.fontWeight,
    textSpeed: state.textSpeed,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

class TextWay extends React.Component {
  state = {
    x: new Animated.Value(-screenWidth / 2),
    text: "自身state中设置的Loding",
    width: 0,
    time: 3000,
  };
  //每一帧都会调用,因为在不停渲染

  layout = (e) => {
    if (this.props.textSpeed) {
      this.setState({
        width: e.layout.width,
        time: (e.layout.width + screenWidth) / this.props.textSpeed,
      });
    } else {
      this.setState({
        width: e.layout.width,
      });
    }
  };

  //字幕滚动动画
  startRoll() {
    Animated.sequence([
      Animated.timing(this.state.x, {
        toValue: screenWidth / 2 + this.state.width / 2,
        duration: this.state.time,
      }),
      Animated.timing(this.state.x, {
        toValue: -screenWidth / 2 - this.state.width / 2,
        duration: 0,
      }),
    ]).start(() => this.startRoll());
  }

  componentDidMount() {
    this.startRoll();
  }

  componentDidUpdate() {}

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: 50000,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatedText
            onLayout={({ nativeEvent: e }) => this.layout(e)}
            style={{
              textAlign: "center",
              left: this.state.x,
              color: "#FFFFFF",
              fontSize: this.props.fontSize,
              fontWeight: "600",
            }}
          >
            {this.props.text}
          </AnimatedText>
        </View>

        <View style={{ top: 100 }}>
          <Text style={styles.debugtext}>动作:{this.props.action}</Text>
          <Text style={styles.debugtext}>文字大小:{this.props.fontSize}</Text>
          <Text style={styles.debugtext}>文字粗细:{this.props.fontWeight}</Text>
          <Text style={styles.debugtext}>文本速度:{this.props.textSpeed}</Text>
          <Text style={styles.debugtext}>文本宽度:{this.state.width}</Text>
          <Text style={styles.debugtext}>所需时间:{this.state.time}</Text>
          <Text style={styles.debugtext}>文本坐标:</Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextWay);

const AnimatedText = Animated.createAnimatedComponent(Text);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  debugtext: {
    color: "white",
  },
});
