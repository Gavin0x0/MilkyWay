import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import LottieView from "lottie-react-native";

export default class AppLoading extends React.Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#1e1e1e",
          }}
          source={require("../assets/Lottie/196-material-wave-loading.json")}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <View style={styles.buttonContainer}>
          <Text style={styles.smallText}>
            首次启动会加载字体文件,大约需要一分钟
          </Text>
          <Text style={styles.smallText}>嘘 ~</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  buttonContainer: {
    paddingTop: 20,
  },
  smallText: {
    paddingTop: 20,
    color: "white",
    textAlign: "center",
  },
});
