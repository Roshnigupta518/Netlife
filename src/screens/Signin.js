import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, Platform, BackHandler, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/Feather';

import st from "../constants/style";
import Global from "../constants/Global";
import API from "../constants/API";

import Button from "../components/button";
// import Alertbox from "../components/alertbox";
import { auth } from "../redux/actions/auth";
import { get_user } from '../redux/actions/user';
import { get_project } from '../redux/actions/project';
import { get_cpanel } from '../redux/actions/cpanel';
// import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      slider: false,

      // email: "oz@upphone.co.il",
      // password: "1q2w3e4r__",

      // email: "rambarel@gmail.com",
      // password: "1q2w3e4r",

      // email: "hadarushha@gmail.com",
      // password: "1q2w3e4r",

      // email: "abdulrehman.cor@gmail.com",
      // password: "asdfasdf",

      email: "",
      password: "",
      vpass: true,
      validemail: true,
      validpass: true,

      showAlert: false,
      alerttext: '',
      alerticon: '',
    };
    // console.disableYellowBox= true
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    // GoogleSignin.configure({
    //   webClientId: '578495942939-pfh7ogqnidmkvbe0tgf9iut34fuaj2ut.apps.googleusercontent.com', // my clientID
    //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //   iosClientId: '578495942939-pfh7ogqnidmkvbe0tgf9iut34fuaj2ut.apps.googleusercontent.com'
    // });

    var token = await Global.getData(API.AUTH_KEY)
    if (token) {
      // console.log(token)
      this.props.get_cpanel(token.user.id, token.access_token)
      this.props.getUser(token.access_token)
      this.props.get_project(token.user._id, token.access_token)
      this.props.updateAuth(token)
    }

  }

  async signIn() {
    try {
      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.isSignedIn();
      // const userInfo = await GoogleSignin.signIn();
      var data = { id_token: userInfo.idToken }

      this.setState({ isLoading: true })
      Global.postRequest(API.GOOGLE_LOGIN, data)
        .then(async (res) => {
          console.log(res.status)
          if (res.status == 200) {
            this.close();
            await Global.saveData(API.AUTH_KEY, res.data)
            this.props.getUser(res.data.access_token)
            this.props.get_project(res.data.user._id, res.data.access_token)
            this.props.get_cpanel(res.data.user.id, res.data.access_token)
            setTimeout(() => {
              this.props.updateAuth(res.data)
            }, 300);
          }
          else {
            alert('Error_login')
          }
        })


    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert(error)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert(error)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert(error)
        // play services not available or outdated
      } else {
        alert(error)
        // some other error happened
      }
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = screen => {
    // alert('hello')
    // this.goBack(); // works best when the goBack is async
    BackHandler.exitApp();
    return true;
  };


  Login = () => {
    const { email, password } = this.state
    if (email.trim() == "" || password.trim() == "") {
      email.trim() == "" ? [this.setState({ validemail: false }), this.bounceemail()] : null
      password.trim() == "" ? [this.setState({ validpass: false }), this.bounceepass()] : null
    }
    else {
      this.setState({ isLoading: true })
      var data = { email: email, password: password, }

      Global.postRequest(API.LOGIN, data)
        .then(async (res) => {
          console.log(res.status)
          console.log(res.data)
          if (res.status == 200) {

            this.close();
            this.close1();
            this.close2();
            this.close3();
            this.close4();
            // this.close5();

            await Global.saveData(API.AUTH_KEY, res.data)

            this.props.getUser(res.data.access_token)
            this.props.get_project(res.data.user._id, res.data.access_token)
            this.props.get_cpanel(res.data.user.id, res.data.access_token)

            setTimeout(() => {
              this.props.updateAuth(res.data)
              this.setState({ isLoading: false })
            }, 300);



          }
          else {
            this.setState({ isLoading: false, showAlert: true, alerttext: 'Error_login', alerticon: 'warning' })
            this.setState({ validemail: false, validpass: false })
            this.bounceemail()
            this.bounceepass()
          }
        })

    }
  }

  refclose = ref => this.view = ref;
  refclose1 = ref => this.view1 = ref;
  refclose2 = ref => this.view2 = ref;
  refclose3 = ref => this.view3 = ref;
  refclose4 = ref => this.view4 = ref;
  // refclose5 = ref => this.view5 = ref;

  handleViewRef1 = ref => this.view6 = ref;
  handleViewRef2 = ref => this.view7 = ref;
  bounceemail = () => this.view6.rubberBand(800)
  bounceepass = () => this.view7.rubberBand(800)

  close = () => this.view.zoomOut(0)
  close1 = () => this.view1.zoomOut(100)
  close2 = () => this.view2.zoomOut(200)
  close3 = () => this.view3.zoomOut(300)
  close4 = () => this.view4.zoomOut(400)
  // close5 = () => this.view5.zoomOut(500)

  render() {
    const { showAlert, alerticon, alerttext, slider, isLoading } = this.state
    return (
      <LinearGradient
        colors={['#8e8fec', '#656BDD',]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView style={[st.pV40, st.pH20]}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : null}>

            {/* <TouchableWithoutFeedback>
            <Animatable.View ref={this.refclose}>
            </Animatable.View>
          </TouchableWithoutFeedback> */}
            {/* <Text style={{ fontFamily: 'Poppins-ExtraBoldItalic' }}>Bounce me!</Text> */}

            <Animatable.View animation="fadeIn" style={[st.alignI_C, st.mT40, st.pH20]} ref={this.refclose}>
              <Image
                style={{ height: 136, width: "100%" }}
                source={require("../assets/login-logo.png")}
                resizeMode="contain"
              />
            </Animatable.View>

            <Animatable.View animation="fadeIn" delay={200} style={[st.mT20, st.pH15]} ref={this.refclose1}>
              <Text style={[st.tx18, st.colorW, st.PM]}>Welcome</Text>
              <Text style={[st.tx12, st.colorW]}>
                Welcome to Boxhigher, our app is up to date
                with all your information, our staff are available to collaborate with you on any project in the Web system.
              </Text>
            </Animatable.View>

            {/* <Animatable.View animation="fadeIn" delay={400} style={[st.mT20, st.pH20]} ref={this.refclose2}>
            {Platform.OS === 'ios' ? null :
              <TouchableOpacity onPress={() => { this.state.isLoading ? null : this.signIn() }}>
                <Image
                  style={{ height: 70, width: "100%" }}
                  source={require("../assets/google-button.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            }
          </Animatable.View> */}

            <Animatable.View animation="fadeIn" delay={400} style={[st.mT20, st.pH20]} ref={this.refclose2}>
              <Animatable.View ref={this.handleViewRef1}
                style={[
                  this.state.validemail == true
                    ? st.inputgrey2
                    : st.inputred2,
                  st.pR20, st.row, st.alignI_C, st.justify_B
                ]
                }
              >
                <TextInput
                  onChangeText={val => this.setState({ email: val, validemail: true })}
                  placeholder={'Work email address'}
                  value={this.state.email}
                  returnKeyType="next"
                  onSubmitEditing={() => { this.secondTextInput.focus(); }}
                  autoCapitalize='none'
                  placeholderTextColor="#999"
                  style={{ color: '#656BDD', width: "80%" }}
                />
                <Text style={[st.colorP, st.tx18]}>@</Text>
              </Animatable.View>
            </Animatable.View>

            <Animatable.View animation="fadeIn" delay={600} style={[st.mT20, st.pH20]} ref={this.refclose3}>
              <Animatable.View ref={this.handleViewRef2}
                style={[
                  this.state.validemail == true
                    ? st.inputgrey2
                    : st.inputred2,
                  st.pR20, st.row, st.alignI_C, st.justify_B
                ]}
              >
                <TextInput
                  ref={(input) => { this.secondTextInput = input; }}
                  onChangeText={text => this.setState({ password: text, validpass: true })}
                  placeholder={'Password'}
                  value={this.state.password}
                  onSubmitEditing={() => this.Login()}
                  returnKeyType="done"
                  placeholderTextColor="#999"
                  secureTextEntry={this.state.vpass}
                  style={{ color: '#656BDD', width: "80%" }}
                />
                <Icon name="key" type="Feather" style={[st.colorP, st.tx22]} />
              </Animatable.View>
            </Animatable.View>

            <Animatable.View animation="fadeIn" delay={800} ref={this.refclose4}>
              <View style={[st.mT30, st.pH20]}>

                <TouchableOpacity onPress={() => { this.state.isLoading ? null : this.Login() }}>
                  <LinearGradient
                    colors={['#F3E355', '#F3E355', '#F9E9B3']}
                    start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                    style={styl.linearGradientShadow}
                  >
                    <Text style={[st.colorW, st.tx18, st.PB]}>Log in</Text>
                    {this.state.isLoading ? <ActivityIndicator style={st.mL20} color='#656BDD' /> : null}

                  </LinearGradient>
                </TouchableOpacity>

              </View>
            </Animatable.View>

            {/* <Animatable.View animation="fadeIn" delay={1000} style={[st.mV40]}>
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate("Forget") }}
              style={[st.alignI_C, st.mT30, st.row, st.justify_C]}>

              <Text style={[st.tx14, st.colorB]}>You forgot your password</Text>
              <Text style={[st.tx14, st.colorP]}> Click here</Text>
            </TouchableOpacity>
          </Animatable.View> */}


          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient >
    );
  }
}


const styl = StyleSheet.create({
  linearGradientButton: {
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  linearGradientShadow: {
    shadowColor: "#F3E355",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10.32,
    elevation: 10,
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center'
  },

})
const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (data) => { dispatch(auth(data)) },
    getUser: (token) => { dispatch(get_user(token)) },
    get_project: (id, token) => { dispatch(get_project(id, token)) },
    get_cpanel: (id, token) => { dispatch(get_cpanel(id, token)) },
  }
}
export default connect(null, mapDispatchToProps)(Login)