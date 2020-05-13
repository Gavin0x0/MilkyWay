import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import LottieView from "lottie-react-native";
let lo;
const defaultTimeOut = -1; //设置显示时间标识

export class EasyLoading {
  /**
   * 显示Loading
   *
   * @param timeout Loading显示时间，为-1时会一只显示，需要手动关闭
   */
  static show(timeout = defaultTimeOut) {
    console.log(timeout);
    lo.setState({ isShow: true, timeout: timeout });
  }

  /**
   * 关闭Loading
   */
  static dismiss() {
    lo.setState({ isShow: false });
  }
}

export class Loading extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.handle = 0;
    this.state = {
      isShow: false,
      timeout: defaultTimeOut,
    };
    lo = this;
  }

  componentWillUnmount() {
    clearTimeout(this.handle);
  }

  render() {
    clearTimeout(this.handle);

    this.state.timeout !== defaultTimeOut &&
      (this.handle = setTimeout(() => {
        EasyLoading.dismiss();
      }, this.state.timeout));

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.isShow}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={styles.container}>
          <Finish />
        </View>
      </Modal>
    );
  }
}

class Finish extends React.Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  render() {
    return (
      <View>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          speed={0.8}
          loop={false}
          style={{
            width: 400,
            height: 400,
          }}
          source={require("../assets/Lottie/1818-success-animation.json")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
