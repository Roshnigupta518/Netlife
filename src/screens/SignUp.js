import React, { useState, useEffect } from 'react'
import { Text, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Fontisto';
import Button from "../components/Button";
import InputBox from "../components/InputBox";

import API from "../constants/API"
import Global from "../constants/Global"
import st from "../constants/style";
import { updateAuth } from "../redux/actions/auth";
import I18n from '../language/i18n';


const maxWidth = Dimensions.get('window').width


function Signup({ route, navigation, updateAuth }) {


  const [FullName, setFullName] = useState('Abdul Rehman')
  const [Phone, setPhone] = useState('05000550505')
  const [email, setemail] = useState('abdul@mailinator.com')
  const [password, setpassword] = useState('asdfasdf')
  const [ConfirmPassword, setConfirmPassword] = useState('asdfasdf')
  const [CheckMark, setCheckMark] = useState(false)

  const [vFullName, setvFullName] = useState(true)
  const [vPhone, setvPhone] = useState(true)
  const [vemail, setvemail] = useState(true)
  const [vpassword, setvpassword] = useState(true)
  const [vConfirmPassword, setvConfirmPassword] = useState(true)
  const [isLoading, setisLoading] = useState(false)
  const [errorMessage, seterrorMessage] = useState(null)



  const isSignUp = async () => {
    seterrorMessage(null)
    if (email.trim() == "" || password.trim() == "" || FullName.trim() == "" || ConfirmPassword.trim() == "") {
      FullName.trim() == "" ? setvFullName(false) : null
      email.trim() == "" ? setvemail(false) : null
      password.trim() == "" ? setvpassword(false) : null
      ConfirmPassword.trim() == "" ? setvConfirmPassword(false) : null
    } else if (password !== ConfirmPassword) {
      setvpassword(false)
      setvConfirmPassword(false)
      seterrorMessage(I18n.t("Make sure password you enter is same"))
    }
    else {
      setisLoading(true)
      let data = {
        name: FullName,
        phone: Phone,
        email,
        password,
        password_confirmation: ConfirmPassword
      }
      Global.postRequest(API.REGISTER, data)
        .then(async (res) => {
          if (res.data.success) {
            await Global.saveData(API.AUTH_KEY, res.data.data?.token)
            updateAuth(res.data.data)
          }
          else {
            alert(JSON.stringify(res.data.message))
          }
          setisLoading(false)
        })

    }

  }

  return (
    <ScrollView style={[st.container, st.pV32]}>

      <View animation="zoomIn" delay={100} style={st.alignI_C}>
        <Image
          style={{ height: 100, width: maxWidth - 40 }}
          source={require(`../assets/LogoFull.png`)}
          resizeMode="contain"
        />
      </View>

      <View animation="zoomIn" delay={150} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={vFullName}
          onChangeText={val => [setFullName(val), setvFullName(true)]}
          placeholder={I18n.t("Full Name")}
          value={FullName}
        // Icon={<UserOutline />}
        />
      </View>
      <View animation="zoomIn" delay={200} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={vPhone}
          onChangeText={val => [setPhone(val), setvPhone(true)]}
          placeholder={I18n.t("Phone")}
          value={Phone}
        // Icon={<UserOutline />}
        />
      </View>
      <View animation="zoomIn" delay={250} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={vemail}
          onChangeText={val => [setemail(val), setvemail(true)]}
          placeholder={I18n.t("Email")}
          value={email}
        // Icon={<UserOutline />}
        />
      </View>
      <View animation="zoomIn" delay={300} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={vpassword}
          onChangeText={val => setpassword(val)}
          placeholder={I18n.t("Password")}
          value={password}
          ShowPassIcon={true}
        />
      </View>

      <View animation="zoomIn" delay={350} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={vConfirmPassword}
          onChangeText={val => [setConfirmPassword(val), setvConfirmPassword(true)]}
          placeholder={I18n.t("Confirm Password")}
          value={ConfirmPassword}
          ShowPassIcon={true}
        />
      </View>


      {errorMessage ? <View animation="zoomIn" delay={350} style={st.pH16}>
        <Text style={[st.tx12, st.colorD]}>{errorMessage}</Text>
      </View> : null}

      <View animation="zoomIn" delay={350} style={[st.mT16, st.pH16]}>
        <TouchableOpacity onPress={() => setCheckMark(!CheckMark)} style={[st.row, st.alignI_C]} >
          {CheckMark
            ? <Icon name="checkbox-active" style={[st.colorP, st.tx16, st.mH8]} />
            : <Icon name="checkbox-passive" style={[st.colorP, st.tx16, st.mH8]} />}
          <View style={st.row}>
            <Text style={[st.tx12, st.colorB]}>{I18n.t("I agree with terms of service Terms of")}</Text>
            <TouchableOpacity
            //  onPress={() => navigation.navigate("PrivacyPolicy")}
            >
              <Text style={[st.tx12, st.colorP]}> {I18n.t("Privacy Policy")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>


      <View animation="zoomIn" delay={400} style={[st.mH16, st.mV24]}>
        <Button
          Loading={isLoading}
          name={I18n.t("Register")}
          onPress={() => isSignUp()}
        />
      </View>

      <View animation="zoomIn" delay={450} style={[st.alignI_C, st.row, st.justify_C]}>
        <Text style={[st.tx12, st.colorB]}>{I18n.t("Already have a account")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")} >
          <Text style={[st.tx12, st.colorP]}> {I18n.t('Sign In')}</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}




const mapDispatchToProps = {
  updateAuth,
};

export default connect(null, mapDispatchToProps)(Signup);