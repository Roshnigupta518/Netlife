import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import st from "../constants/style";
import { View } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Entypo';
import Button from "../components/Button";
import InputBox from "../components/InputBox";



export default function Signin({ route, navigation, language }) {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [vemail, setvemail] = useState(false)
  const [vpassword, setvpassword] = useState(false)
  const [showPass, setshowPass] = useState(true)




  const isLogin = () => {
    // if (email.trim() == "" || password.trim() == "") {
    //   email.trim() == "" ? [this.setState({ validemail: false }), this.bounceemail()] : null
    //   password.trim() == "" ? [this.setState({ validpass: false }), this.bounceepass()] : null
    // }


  }

  return (
    <ScrollView style={[st.container]}>

      <View animation="fadeInLeft" style={[st.mV24, st.pH16]}>
        <Text style={[{ fontSize: 50 }, st.LB, st.colorP]}>Hello!</Text>
        <Text style={[st.tx18, st.LB, st.colorS]}>Welcome to Mind full Net Life</Text>
      </View>

      <View animation="fadeInLeft" delay={100} style={st.alignI_C}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require(`../assets/Logo.png`)}
          resizeMode="contain"
        />
      </View>

      <View animation="fadeInLeft" delay={150} style={[st.mT32, st.alignI_C]}>
        <Text style={[st.tx14, st.colorB]}>please login your account</Text>
      </View>

      <View animation="fadeInLeft" delay={200} style={[st.mT16, st.pH16]}>
        <InputBox
          validation={!vemail}
          onChangeText={val => setemail(val)}
          placeholder={'Email'}
          value={email}
        />
      </View>

      <View animation="fadeInLeft" delay={250} style={[st.mT10, st.pH16]}>
        <InputBox
          validation={!vpassword}
          onChangeText={val => setpassword(val)}
          placeholder={'Password'}
          value={password}
          ShowPassIcon={true}
        />
      </View>


      {/* <View animation="fadeIn" delay={300} style={[st.mH16, st.mT4, st.row_R]}>
        <Text style={[st.tx12, st.colorP]}>Forgot password</Text>
      </View> */}

      <View animation="fadeInLeft" delay={350} style={[st.mH16, st.mV24]}>
        <Button
          name="Login"
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      <View animation="fadeIn" delay={400} style={[st.alignI_C, st.row, st.justify_C]}>
        <Text style={[st.tx12, st.colorB]}>Don't have a account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
          <Text style={[st.tx12, st.colorP]}>{' Sign Up'}</Text>
        </TouchableOpacity>
      </View>



    </ScrollView>
  );
}