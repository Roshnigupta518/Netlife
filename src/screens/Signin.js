import React, { useState, useEffect } from 'react';
import { Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { View } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Entypo';

import st from "../constants/style";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { updateAuth, updateToken, getUserData } from "../redux/actions/auth";

import Global from "../constants/Global";
import API from "../constants/API";
import I18n from '../language/i18n';

function Signin({ route, navigation, updateAuth, updateToken, getUserData }) {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [vemail, setvemail] = useState(true)
  const [vpassword, setvpassword] = useState(true)
  const [isLoading, setisLoading] = useState(false)


  useEffect(() => {
    // BackHandler.addEventListener('hardwareBackPress');
    getStart()
  }, [])

  const getStart = async () => {
    var token = await Global.getData(API.AUTH_KEY)
    if (token) {
      updateToken(token)
      getUserData()
    }
  }

  const isLogin = async () => {
    if (email.trim() == "" || password.trim() == "") {
      email.trim() == "" ? setvemail(false) : null
      password.trim() == "" ? setvpassword(false) : null
    }
    else {
      setisLoading(true)
      let data = { email, password }
      Global.postRequest(API.LOGIN, data)
        .then(async (res) => {

          if (res.data?.success) {
            await Global.saveData(API.AUTH_KEY, res.data.data?.token)
            updateAuth(res.data.data)
            setisLoading(false)
          }
          else {
            setisLoading(false)
            alert(I18n.t('Email Password is incorrect'))
          }
        })

    }

  }

  return (
    <ScrollView style={[st.container]}>

      <View animation="zoomIn" style={[st.mV24, st.pH16]}>
        <Text style={[{ fontSize: 50 }, st.LB, st.colorP]}>{I18n.t("Hello")}</Text>
        <Text style={[st.tx18, st.LB, st.colorS]}>{I18n.t("Welcome to Mind full Net Life")}</Text>
      </View>

      <View animation="zoomIn" delay={100} style={st.alignI_C}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require(`../assets/Logo.png`)}
          resizeMode="contain"
        />
      </View>

      <View animation="zoomIn" delay={150} style={[st.mT32, st.LM, st.pH16]}>
        <Text style={[st.tx14, st.colorB]}>{I18n.t("Login your account")}</Text>
      </View>

      <View animation="zoomIn" delay={200} style={[st.mT4, st.pH16]}>
        <InputBox
          validation={vemail}
          onChangeText={val => [setemail(val), setvemail(true)]}
          placeholder={I18n.t('Email')}
          value={email}
        />
      </View>

      <View animation="zoomIn" delay={250} style={[st.mT10, st.pH16]}>
        <InputBox
          validation={vpassword}
          onChangeText={val => [setpassword(val), setvpassword(true)]}
          placeholder={I18n.t('Password')}
          value={password}
          ShowPassIcon={true}
          onSubmitEditing={() => isLogin()}
        />
      </View>

      <View animation="zoomIn" delay={350} style={[st.mH16, st.mV24]}>
        <Button
          Loading={isLoading}
          name={I18n.t("Login")}
          onPress={() => isLogin()}
        />
      </View>

      <View animation="zoomIn" delay={400} style={[st.alignI_C, st.row, st.justify_C]}>
        <Text style={[st.tx12, st.colorB]}>{I18n.t("Don't have a account")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
          <Text style={[st.tx12, st.colorP]}> {I18n.t('Sign Up')}</Text>
        </TouchableOpacity>
      </View>



    </ScrollView>
  );
}


const mapDispatchToProps = {
  updateAuth,
  getUserData,
  updateToken,
};

export default connect(null, mapDispatchToProps)(Signin)