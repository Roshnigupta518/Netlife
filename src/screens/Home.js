import React, { useState, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, Dimensions, BackHandler, PermissionsAndroid, Platform, Image, StyleSheet } from "react-native";
import { View } from 'react-native-animatable';
import { connect } from 'react-redux';
import { BarChart } from "react-native-chart-kit";
import Feather from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from "react-native-linear-gradient";

import ButtoOutline from "../components/ButtoOutline";
import st from "../constants/style";
import Global from "../constants/Global";
import API from "../constants/API"
import { destory } from "../redux/actions/auth";


const chartConfig = {
  backgroundGradientFrom: "#c62910",
  backgroundGradientTo: "#fff",
  barPercentage: 0.7,
  height: 5000,
  fillShadowGradient: `#c62910`,
  color: (opacity = 1) => `#c62910`,
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0, // optional, defaults to 2dp
  labelColor: (opacity = 1) => `#c62910`,
  style: {
    borderRadius: 16,
    fontFamily: "Lato-Regular",
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: "#e3e3e3",
    strokeDasharray: "0",
  },
  propsForLabels: {
    fontFamily: "Lato-Regular",
  },
};

function Home({ route, navigation, destory }) {

  const [avatarSource, setavatarSource] = useState(null)

  /////////////////START IMAGE SELECTION/////////////////////////////////////////////////////////////////////////
  const pickImage = async () => {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message:
          "App needs access to your camera " +
          "so you can take pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    console.log(granted, 'xxxx')

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      launchImageLibrary(options, setImage);
    } else {
      alert("Camera permission denied")
      console.log("Camera permission denied");
    }
  }

  const setImage = async (response) => {

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      let { uri, fileName, fileSize, height, isVertical, originalRotation, path, type, width, } = response.assets[0]

      // let base64 = await RNFS.readFile(uri, 'base64')

      let check = getFileExtention(fileName)
      const addExtension = type.substring(type.indexOf('/') + 1);
      if (check === undefined) {
        fileName = fileName + "." + addExtension
      }

      const source = {
        // data: base64,
        uri: uri,
        fileName: fileName,
        fileSize: fileSize,
        height: height,
        isVertical: isVertical,
        originalRotation: originalRotation,
        path: path || '/temp',
        type: type,
        width: width,
      };

      setavatarSource(source)

    }
  }

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };
  /////////////////END IMAGE SELECTION/////////////////////////////////////////////////////////////////////////

  const logout = async () => {
    destory()
    Global.removeData(API.AUTH_KEY)
  }

  return (
    <ScrollView style={[st.container]}>


      <View style={[st.card, st.row, st.justify_al_C, st.p24]}>

        <TouchableOpacity onPress={() => logout()} style={styl.logout}>
          <Feather name="log-out" style={[st.colorP, st.tx20]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => pickImage()} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 100 }}>
          <Image
            style={{ height: 60, width: 60, borderRadius: 100 }}
            source={avatarSource || require(`../assets/userimage.png`)}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={st.mH16}>
          <Text style={[st.tx18, st.LB]}>Abdul Rehman</Text>
          <Text style={st.tx14}>0544786924</Text>
        </View>
      </View>


      <View style={st.card}>
        <BarChart
          data={{
            labels: ["Mon", "Tues", "Wed", 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [13, 1, 10, 2, 3, 12]
              }
            ]
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          // withHorizontalLabels={false}
          // withCustomBarColorFromData={true}
          // flatColor={true}
          // verticalLabelRotation={90}
          fromZero={true}
          showBarTops={false}
          // showValuesOnTopOfBars={true}
          chartConfig={chartConfig}
          style={{
            margin: -16,
            backgroundColor: '#fff',
            // borderWidth: 1,
            // borderColor: '#CCC',
            borderRadius: 10
          }}
        />
      </View>

      <View style={st.mB20} />
    </ScrollView>
  );
}

const styl = StyleSheet.create({
  logout: {
    position: 'absolute',
    right: 8,
    top: 8,
  }
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    userdata: state.user.userdata,
  }
}
const mapDispatchToProps = {
  destory,
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);