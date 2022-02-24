import React from "react";
import { View, Dimensions, Text, Image, Animated, ImageBackground } from "react-native";

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.4);
    this.state = {
      loggedIn: null
    };
  }

  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1
    }).start();
  }


  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 100)
    )
  }

  async componentDidMount() {

    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      {
        this.props.navigation.navigate("Home1");
      }
    }
  }

  render() {
    return (
      <ImageBackground
        // source={require("../../android/app/src/main/res/drawable-xhdpi/launch_screen.jpg")}
        style={{ width: "100%", height: "100%", flex: 1,  }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              // height: 40,
              width: "50%",
            }}
            // source={require("../assets/Prelooder.gif")}
            resizeMode="contain"
          />
        </View>

      </ImageBackground>
    );
  }
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default SplashScreen;

