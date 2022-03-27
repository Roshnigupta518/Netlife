import React, { useState, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, Dimensions, BackHandler, ActivityIndicator, Platform, Image, StyleSheet } from "react-native";
import { View } from 'react-native-animatable';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { connect } from 'react-redux';
import { BarChart } from "react-native-chart-kit";
import Feather from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from "react-native-linear-gradient";
import Fontisto from 'react-native-vector-icons/Fontisto';

import ButtoOutline from "../components/ButtoOutline";
import st from "../constants/style";
import Global from "../constants/Global";
import API from "../constants/API"
import { logoutUser } from "../redux/actions/auth";


const chartConfig = {
  backgroundGradientFrom: "#c62910",
  backgroundGradientTo: "#ffffff",
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

function Home({ navigation, logoutUser, userdata }) {

  let userImage = userdata?.image ? { uri: `${API.IMAGE_URL}${userdata.image}` } : null

  const [avatarSource, setavatarSource] = useState(userImage)
  const [imageLoading, setimageLoading] = useState(false)

  useEffect(() => {

  }, [])

  /////////////////START IMAGE SELECTION/////////////////////////////////////////////////////////////////////////
  const pickImage = async () => {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const granted = await requestMultiple([Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA]).then((result) => {
      return true
    });

    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    //   {
    //     title: "App Camera Permission",
    //     message:
    //       "App needs access to your camera " +
    //       "so you can take pictures.",
    //     buttonNeutral: "Ask Me Later",
    //     buttonNegative: "Cancel",
    //     buttonPositive: "OK"
    //   }
    // );
    if (granted) {
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
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
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
      updateImage(source)
    }
  }

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };
  /////////////////END IMAGE SELECTION/////////////////////////////////////////////////////////////////////////

  const updateImage = async (source) => {
    setimageLoading(true)

    let formdata = new FormData();
    formdata.append('image', {
      name: source.fileName,
      type: source.type,
      uri: Platform.OS === 'ios' ? source.uri.replace('file://', '') : source.uri,
    });

    Global.postRequest(API.USER_UPDATE, formdata)
      .then(async (res) => {
        if (res.data.success) {
          alert('Image Uploaded')
        } else {
          alert('unable to upload image please try again')

        }
        setimageLoading(false)
      })

  }


  const logout = async () => {
    logoutUser()
  }

  return (
    <ScrollView style={[st.container, st.pT16]}>


      <View style={[st.card, st.row, st.justify_al_C, st.p24]}>

        <TouchableOpacity onPress={() => logout()} style={styl.logout}>
          <Feather name="log-out" style={[st.colorP, st.tx20]} />
        </TouchableOpacity>
        {imageLoading ? < ActivityIndicator size="large" color='#c62910' /> :
          <TouchableOpacity onPress={() => pickImage()} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 100 }}>
            <Image
              style={{ height: 60, width: 60, borderRadius: 200 }}
              source={avatarSource || require(`../assets/userimage.png`)}
              resizeMode="cover"
            />
          </TouchableOpacity>}

        <View style={st.mH16}>
          <Text style={[st.tx18, st.LB]}>{userdata?.name}</Text>
          <Text style={st.tx14}>{userdata?.phone || "not available"}</Text>
        </View>
      </View>


      <View style={st.card}>
        <BarChart
          data={{
            labels: ["Mon", "Tues", "Wed", 'Thu', 'Fri', 'Sat'],
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
            borderRadius: 8
          }}
        />
        <View style={[st.row, st.mT16]}>

          <View style={{ width: 60 }} />

          <View style={{ width: 68 }}>
            <Fontisto name="checkbox-passive" style={[st.colorP, st.tx16]} />
          </View>
          <View style={{ width: 65 }}>
            <Fontisto name="checkbox-passive" style={[st.colorP, st.tx16]} />
          </View>
          <View style={{ width: 68 }}>
            <Fontisto name="checkbox-active" style={[st.colorP, st.tx16]} />
          </View>
          <View style={{ width: 65 }}>
            <Fontisto name="checkbox-passive" style={[st.colorP, st.tx16]} />
          </View>
          <View style={{ width: 65 }}>
            <Fontisto name="checkbox-passive" style={[st.colorP, st.tx16]} />
          </View>
          <View style={{ width: 35 }}>
            <Fontisto name="checkbox-active" style={[st.colorP, st.tx16]} />
          </View>



        </View>
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
    userdata: state.auth.userdata,
    pratica: state.auth.userdata?.pratica,
  }
}
const mapDispatchToProps = {
  logoutUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);