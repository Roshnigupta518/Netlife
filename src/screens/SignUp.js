import React, { useState, useEffect } from 'react'
import { Text, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from "../components/Button";
import InputBox from "../components/InputBox";

import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API"
import G from "../constants/Global"
import { destory } from "../redux/actions/auth";
import st from "../constants/style";

const maxWidth = Dimensions.get('window').width


function Signup({ route, navigation, language }) {


  const [FullName, setFullName] = useState('')
  const [Phone, setPhone] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [CheckMark, setCheckMark] = useState(false)

  const [vFullName, setvFullName] = useState(false)
  const [vPhone, setvPhone] = useState(false)
  const [vemail, setvemail] = useState(false)
  const [vpassword, setvpassword] = useState(false)
  const [vConfirmPassword, setvConfirmPassword] = useState(false)



  const isSignin = () => {
    // if (email.trim() == "" || password.trim() == "") {
    //   email.trim() == "" ? [this.setState({ validemail: false }), this.bounceemail()] : null
    //   password.trim() == "" ? [this.setState({ validpass: false }), this.bounceepass()] : null
    // }


  }

  return (
    <ScrollView style={[st.container, st.pV32]}>

      <View animation="fadeInDown" delay={100} style={st.alignI_C}>
        <Image
          style={{ height: 100, width: maxWidth - 40 }}
          source={require(`../assets/LogoFull.png`)}
          resizeMode="contain"
        />
      </View>

      <View animation="fadeInDown" delay={150} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={!vFullName}
          onChangeText={val => [setFullName(val), setvFullName(true)]}
          placeholder={'Full Name'}
          value={FullName}
        // Icon={<UserOutline />}
        />
      </View>
      <View animation="fadeInDown" delay={200} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={!vPhone}
          onChangeText={val => [setPhone(val), setvPhone(true)]}
          placeholder={'Phone'}
          value={Phone}
        // Icon={<UserOutline />}
        />
      </View>
      <View animation="fadeInDown" delay={250} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={!vemail}
          onChangeText={val => [setemail(val), setvemail(true)]}
          placeholder={'Email'}
          value={email}
        // Icon={<UserOutline />}
        />
      </View>
      <View animation="fadeInDown" delay={300} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={!vpassword}
          onChangeText={val => setpassword(val)}
          placeholder={'Password'}
          value={password}
          ShowPassIcon={true}
        />
      </View>

      <View animation="fadeInDown" delay={350} style={[st.mT8, st.pH16]}>
        <InputBox
          validation={!vConfirmPassword}
          onChangeText={val => [setConfirmPassword(val), setvConfirmPassword(true)]}
          placeholder={'Confirm Password'}
          value={ConfirmPassword}
          ShowPassIcon={true}
        />
      </View>

      <View animation="fadeInDown" delay={350} style={[st.mT8, st.pH16]}>
        <TouchableOpacity onPress={() => setCheckMark(!CheckMark)} style={[st.row, st.alignI_C]} >
          {CheckMark
            ? <Icon name="minussquareo" style={[st.colorP, st.tx22, st.mH8]} />
            : <Icon name="checksquareo" style={[st.colorP, st.tx22, st.mH8]} />}
          <View style={st.row}>
            <Text style={[st.tx12, st.colorB]}>I agree with terms of service. Terms of</Text>
            <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
              <Text style={[st.tx12, st.colorP]}>{' Privacy Policy'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>


      <View animation="fadeInDown" delay={400} style={[st.mH16, st.mV24]}>
        <Button
          name="Register"
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      <View animation="fadeInDown" delay={450} style={[st.alignI_C, st.row, st.justify_C]}>
        <Text style={[st.tx12, st.colorB]}>Already have a account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")} >
          <Text style={[st.tx12, st.colorP]}>{' Sign In'}</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}



const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    userdata: state.user.userdata,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // updateAuth: (data) => { dispatch(destory(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);