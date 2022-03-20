import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import st from "./style";
import API from "../constants/API"
import G from "../constants/Global"
import I18n from '../language/i18n';

import { connect } from 'react-redux';
import { destory } from "../redux/actions/auth";
// import { GoogleSignin, } from '@react-native-community/google-signin';

class Footer extends Component {
  constructor() {
    super();
  }

  async signOut() {
    try {
      this.props.updateAuth("")
      G.removeData(API.AUTH_KEY)
      // await GoogleSignin.revokeAccess();
      // await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { language } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={[st.border_B, st.mV20, st.mT40, { borderColor: '#000', opacity: 0.1 }]} />
        <Image
          style={{ height: 51, width: "100%" }}
          // source={require("../assets/boxhigherlogo.png")}
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={() => { this.signOut() }}
          style={[language ? st.row_R : st.row, st.p10, st.alignI_C, st.justify_C]}
        >
          <Icon name='log-out' type='Feather' style={[{ color: '#999' }, st.tx26,]} />
          <Text style={[st.tx18, { color: '#999' }, language ? st.mR15 : st.mL15]}>{I18n.t('Logout')}</Text>
        </TouchableOpacity>

        <View style={st.mB35} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.auth.language
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (data) => { dispatch(destory(data)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer);