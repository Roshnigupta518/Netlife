import React, { Component } from 'react';
import { ImageBackground, Text, View, TextInput, TouchableOpacity, Dimensions, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import * as Animatable from 'react-native-animatable';
import st from "../constants/style";
import Button from "../components/Button";
import Header from "../constants/Header";
import Footer from "../constants/Footer";
import { connect } from 'react-redux';
import { destory } from "../redux/actions/auth";
import API from "../constants/API";
import Global from "../constants/Global";
import Alertbox from "../components/Alertbox";
import I18n from '../language/i18n';
import { Key } from '../constants/svgIcons';

class Changepassword extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isLoading: false,
      showAlert: false,
      oldpass: "",
      newpass: "",
      retype: "",

      voldpass: true,
      vnewpass: true,
      vretype: true,
      error: '',
      displayError: false,

    };
  }


  updatepass = async () => {
    const { oldpass, newpass, retype, } = this.state
    if (oldpass.trim() == "" || newpass.trim() == "" || retype.trim() == "") {
      oldpass.trim() == "" ? this.setState({ voldpass: false }) : null
      newpass.trim() == "" ? this.setState({ vnewpass: false }) : null
      retype.trim() == "" ? this.setState({ vretype: false }) : null
    }
    else {
      this.setState({ isLoading: true })

      if (retype === newpass) {
        var data = { old_password: oldpass, new_password: newpass, }
        await Global.postRequest(API.CHANGE_PASSWORD, data, this.props.token)
          .then(async (res) => {
            console.log(res.status, 'status')
            if (res.status == 200) {
              this.setState({
                isLoading: false,
                showAlert: true,
                oldpass: '',
                newpass: '',
                retype: ''
              })
            }
            else {
              this.setState({ isLoading: false, displayError: true, error: 'Old password does not match', })
              this.setState({ voldpass: false, vnewpass: false, vretype: false })
            }
          })
      } else {
        this.setState({ isLoading: false, vnewpass: false, vretype: false, displayError: true, error: 'please enter same password' })
      }



    }
  }

  render() {
    const { language } = this.props
    return (
      <View style={st.container}>
        <ScrollView style={{ marginTop: -20 }}>

          <Header
            navigation={this.props.navigation}
          // HeadingText={"Settings"}
          // Right={true}
          />

          <View style={st.card1}>
            <View style={[language ? st.row_R : st.row, st.alignI_C, st.justify_B]}>
              <View style={[language ? st.row_R : st.row, st.alignI_C]}>
                <Key width={20} height={12} style={{ marginTop: 4 }} />
                <Text style={[st.tx24, st.mH10]} >{I18n.t('Change_password')}</Text>
              </View>
            </View>

            <View style={[st.mB20, st.mT20]}>
              <Text style={[{ color: '#828282', textAlign: language ? "right" : "left", }, st.tx12]}>{I18n.t('Old_Password')}</Text>
              <View
                style={[
                  this.state.voldpass == true
                    ? st.inputgrey
                    : st.inputred, st.alignI_C, st.pR15]
                }
              >
                <TextInput
                  onChangeText={val => this.setState({ oldpass: val, voldpass: true, displayError: false })}
                  placeholder={I18n.t('Type_Old_Password')}
                  value={this.state.oldpass}
                  placeholderTextColor="#ccc"
                  style={{ color: '#4F4F4F', textAlign: language ? "right" : "left", }}
                />
              </View>
            </View>

            <View style={[st.mB20]}>
              <Text style={[{ color: '#828282', textAlign: language ? "right" : "left", }, st.tx12]}>{I18n.t('New_Password')}</Text>
              <View
                style={[
                  this.state.vnewpass == true
                    ? st.inputgrey
                    : st.inputred, st.alignI_C, st.pR15]
                }
              >
                <TextInput
                  onChangeText={val => this.setState({ newpass: val, vnewpass: true })}
                  placeholder={I18n.t('Type_New_Password')}
                  value={this.state.newpass}
                  placeholderTextColor="#ccc"
                  style={{ color: '#4F4F4F', textAlign: language ? "right" : "left", }}
                />
              </View>
            </View>

            <View style={[st.mB20]}>
              <Text style={[{ color: '#828282', textAlign: language ? "right" : "left", }, st.tx12]}>{I18n.t('Type_Again_New_Password')}</Text>
              <View
                style={[
                  this.state.vretype == true
                    ? st.inputgrey
                    : st.inputred, st.alignI_C, st.pR15
                ]}
              >
                <TextInput
                  onChangeText={val => this.setState({ retype: val, vretype: true })}
                  placeholder={I18n.t('Retyp_New_Password')}
                  value={this.state.retype}
                  placeholderTextColor="#ccc"
                  style={{ color: '#4F4F4F', textAlign: language ? "right" : "left", }}
                />
              </View>
            </View>

            {this.state.displayError ?
              <View style={[st.mB20, st.alignI_C]}>
                <Text>{this.state.error}</Text>
              </View>
              : null}

            {this.state.isLoading ? <ActivityIndicator color='#c62910' /> :
              <View style={[st.mB20]}>
                <Button
                  text={I18n.t('Change')}
                  navigate={() => { this.updatepass() }}
                />
              </View>
            }
          </View>


        </ScrollView>
        {this.state.showAlert ?
          <Alertbox
            message={I18n.t('Your_password_is_successfully_change')}
            // text={'alerticon'}
            icon={'check'}
            close={() => { [this.props.navigation.goBack(), this.setState({ showAlert: !this.state.showAlert }),] }}
          />
          : null}

      </View >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.auth,
    language: state.user.language,
    userdata: state.user.userdata,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (data) => { dispatch(destory(data)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Changepassword);