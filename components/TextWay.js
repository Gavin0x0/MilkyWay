import React from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

export default class TextWay extends React.Component {
  state = {
    x: new Animated.Value(-screenWidth / 2),
  };
  startRoll() {
    Animated.sequence([
      Animated.timing(this.state.x, {
        toValue: screenWidth / 2,
        duration: 1000,
      }),
      Animated.timing(this.state.x, {
        toValue: -screenWidth / 2,
        duration: 1000,
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
        <AnimatedText style={{ left: this.state.x, color: "#FFFFFF" }}>
          Milky Way
        </AnimatedText>
      </View>
    );
  }
}

const AnimatedText = Animated.createAnimatedComponent(Text);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
