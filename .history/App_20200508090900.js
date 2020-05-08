import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import TextWay from "./components/TextWay";

export default function App() {
  state = {
    x: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.spring(this.state.x, { toValue: 300 }).start();
  }

  return (
    <View style={styles.container}>
      <AnimatedText style={{left: this.state.x}}/> 
    </View>
  );
}

const AnimatedText = Animated.createAnimatedComponent(TextWay)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
