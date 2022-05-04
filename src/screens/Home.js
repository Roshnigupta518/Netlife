import React, { useState, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, Dimensions, RefreshControl,NativeEventEmitter, NativeModules, ActivityIndicator, Platform, Image, StyleSheet } from "react-native";
import { View } from 'react-native-animatable';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { connect } from 'react-redux';
import { BarChart } from "react-native-chart-kit";
import Feather from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from "react-native-linear-gradient";
import Fontisto from 'react-native-vector-icons/Fontisto';
import I18n from '../language/i18n';
import HeaderBar from '../constants/Header'

import ButtoOutline from "../components/ButtoOutline";
import st from "../constants/style";
import Global from "../constants/Global";
import API from "../constants/API"
import { logoutUser, getUserData } from "../redux/actions/auth";
import ReactNativeAN from 'react-native-alarm-notification';

const {RNAlarmNotification} = NativeModules;
const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

const maxWidth = Dimensions.get('window').width
const isIOS = Platform.OS === 'ios' ? true : false

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

function Home({ navigation, logoutUser, userdata, getUserData }) {
  // console.log(userdata.image, 'userdata.image')
  let userImage = userdata?.image ? { uri: `${API.IMAGE_URL}${userdata.image}` } : null

  const [avatarSource, setavatarSource] = useState(null)
  const [imageLoading, setimageLoading] = useState(false)
  const [Loading, setLoading] = useState(true)
  const [graphData, setgraphData] = useState({
    days: [],
    counts: [],
    status: [],
  })

  useEffect(() => {
    getgraphData()
    alarm_home()
  }, [])

  const getStart = () => {
    setLoading(true)
    getUserData()
    getgraphData()
  }

  const getgraphData = () => {
    setLoading(true)
    Global.postRequest(API.GRAPH)
      .then(async (res) => {

        if (res.data.success) {
          let temp = {
            days: [],
            counts: [],
            status: [],
          }
          res.data?.data?.forEach((val) => {
            temp.days.push(val.day)
            temp.counts.push(val.data[0]?.count ? val.data[0]?.count : 0.1)
            temp.status.push(val.data[0]?.status ? val.data[0]?.status : 0)
          })

          setgraphData(temp)
        } else {
          alert(I18n.t('unable to get try again'))
        }
        setLoading(false)
      })

  } 

  const alarm_home = () => {
    RNEmitter.addListener(
      'OnNotificationDismissed',
      (data) => {
        const obj = JSON.parse(data);
        console.log(`notification id: ${obj} dismissed`);
        ReactNativeAN.stopAlarmSound();
        ReactNativeAN.removeAllFiredNotifications();
      },
    );
  
     RNEmitter.addListener(
      'OnNotificationOpened',
      (data) => {
        console.log(data);
        const obj = JSON.parse(data);
        console.log(`app opened by notification: ${obj}`);
        ReactNativeAN.stopAlarmSound();
        ReactNativeAN.removeAllFiredNotifications();
      },
    );
  // check ios permissions
  if (Platform.OS === 'ios') {
      showPermissions();

      ReactNativeAN.requestPermissions({
          alert: true,
          badge: true,
          sound: true,
      }).then(
          (data) => {
              console.log('RnAlarmNotification.requestPermissions', data);
          },
          (data) => {
              console.log('RnAlarmNotification.requestPermissions failed', data);
          },
      );
  }
  }

  const showPermissions = () => {
    ReactNativeAN.checkPermissions((permissions) => {
        console.log(permissions);
    });
};

  /////////////////START IMAGE SELECTION/////////////////////////////////////////////////////////////////////////
  const pickImage = async () => {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const granted = await requestMultiple([isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA]).then((result) => {
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
      alert(I18n.t("Camera permission denied"))
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
        uri: isIOS ? uri.replace('file://', '') : uri,
        fileName: fileName,
        name: fileName,
        fileSize: fileSize,
        height: height,
        isVertical: isVertical,
        originalRotation: originalRotation,
        path: path || '/temp',
        type: type,
        width: width,
      };
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
    const token = await Global.getData(API.AUTH_KEY)

    let formdata = new FormData();
    formdata.append('image', { uri: source.uri, name: source.fileName, type: source.type, });

    const header = {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'content-type': 'multipart/form-data',
    }
    fetch(API.BASE_URL + API.USER_UPDATE, {
      method: 'POST',
      headers: header,
      body: formdata,
    }).then(response => response.json())
      .then(res => {
        console.log(res.success, 'rrrrrrrrr')
        if (res.success) {
          if (res.data.imageStatus) {
            setavatarSource(source)
            alert(I18n.t('Image Uploaded'))
          }
        } else {
          alert(I18n.t('unable to upload image please try again'))
        }
        setimageLoading(false)
      })
  }


  const logout = async () => {
    logoutUser()
  }

  return (
    <>
      <HeaderBar
        title={I18n.t("Home")}
        logout
      // navigation={navigation}
      // goBack
      />

      <ScrollView
        style={[st.container, st.pT16]}
        refreshControl={
          <RefreshControl
            onRefresh={() => getStart()}
            refreshing={false}
          />
        }
      >

        <View style={[st.card, st.row, st.justify_al_C, st.p24]}>
          <TouchableOpacity onPress={() => logout()} style={styl.logout}>
            <Feather name="log-out" style={[st.colorP, st.tx20]} />
          </TouchableOpacity>
          {imageLoading ? < ActivityIndicator size="large" color='#c62910' /> :
            <TouchableOpacity onPress={() => pickImage()} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 100 }}>
              <Image
                style={{ height: 60, width: 60, borderRadius: 200 }}
                source={avatarSource || userImage || require(`../assets/userimage.png`)}
                resizeMode="cover"
              />
            </TouchableOpacity>}

          <View style={st.mH16}>
            <Text style={[st.tx18, st.LB]}>{userdata?.name}</Text>
            <Text style={st.tx14}>{userdata?.phone || I18n.t("not available")}</Text>
          </View>
        </View>


        {Loading ? < ActivityIndicator size="large" color='#c62910' /> :
          <View style={[st.card, { backgroundColor: "#fdf6f5" }]}>
            <BarChart
              data={{
                labels: graphData.days,
                set: graphData.days,
                datasets: [
                  {
                    data: graphData.counts
                  }
                ]
              }}
              width={maxWidth - 40} // from react-native
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
            <View style={[st.row, st.mT8]}>
              <View style={{ width: "19.2%" }} />

              {graphData.status.map((key, index) => (
                <View key={index} style={{ width: "12.8%" }}>
                  <Fontisto name={key ? "checkbox-active" : "checkbox-passive"} style={[st.tx16, st.colorP,]} />
                </View>
              ))}

            </View>
          </View>}

        <View style={st.mB20} />
      </ScrollView>
    </>
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
  getUserData,
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);