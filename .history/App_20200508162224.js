import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import TextWay from "./components/TextWay";

export default class App extends React.Component {
  state = {
    x: new Animated.Value(800),
  };

  componentDidMount() {
    Animated.spring(this.state.x, { toValue: 0 }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatedText style={{ top: this.state.x }} />
      </View>
    );
  }
}

const AnimatedText = Animated.createAnimatedComponent(TextWay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
