import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { TriangleColorPicker, toHsv, fromHsv } from "react-native-color-picker";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

//接收redux传来的参数
function mapStateToProps(state) {
  return {
    isPickerOpen: state.isPickerOpen,
    textColor: state.textColor,
  };
}

//向redux提交参数
function mapDispatchToProps(dispatch) {
  return {
    openPicker: () => {
      dispatch({
        type: "OPEN_PICKER",
      });
    },
    closePicker: () => {
      dispatch({
        type: "CLOSE_PICKER",
      });
    },
    updateColor: (textColor) => {
      dispatch({
        type: "UPDATE_COLOR",
        textColor: textColor,
      });
    },
  };
}

class ExampleControlledTriangle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: toHsv("white"),
      oldColor: toHsv("black"),
      isPickerOpen: false,
    };
    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange(color) {
    this.setState({ color });
  }

  //更新颜色并关闭颜色拾取器
  _updateColor(color) {
    this.setState({ oldColor: color });
    this.props.updateColor(color);
    this.props.closePicker();
  }

  render() {
    if (!this.props.isPickerOpen) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.props.openPicker()}>
            <Ionicons
              name='md-color-palette'
              size={44}
              color={fromHsv(this.props.textColor)}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{}}>
        <TriangleColorPicker
          oldColor='purple'
          color={this.state.color}
          oldColor={this.state.oldColor}
          onColorChange={this.onColorChange}
          onColorSelected={(color) => this._updateColor(color)}
          onOldColorSelected={(color) => this._updateColor(color)}
          style={{ height: 210, width: 210 }}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleControlledTriangle);
