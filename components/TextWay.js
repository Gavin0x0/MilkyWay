import React from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { action: state.action, text: state.text };
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
  };

  startRoll() {
    Animated.sequence([
      Animated.timing(this.state.x, {
        toValue: screenWidth / 2,
        duration: 5000,
      }),
      Animated.timing(this.state.x, {
        toValue: -screenWidth / 2,
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
        <AnimatedText
          style={{
            width: 5000,
            textAlign: "center",
            left: this.state.x,
            color: "#FFFFFF",
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          {this.props.text}
        </AnimatedText>
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
});
