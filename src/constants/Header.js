import React, { useState } from 'react';
import {
  TouchableOpacity,
  Platform,
  ScrollView,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import st from "./style";
import { connect } from 'react-redux';
import { Menu } from '../constants/svgIcons';
import { logoutUser } from "../redux/actions/auth";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;


function Header({
  navigation,
  title,
  goBack = false,
  logout = false,
  logoutUser,
}) {

  return (
    <LinearGradient
      colors={['#f64c40', '#c62910']}
      start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }}
      style={[{
        height: 56,
        width: width,
      },
      st.row,
      st.alignI_C,
      st.pH16,
      st.justify_B
      ]}
    >
      <View style={[st.row, st.alignI_C]}>
        {goBack ?
          <TouchableOpacity onPress={() => navigation.goBack()} style={[st.mR8, st.mT4]}>
            <Icon name="arrow-back-ios" style={[st.tx20, st.colorW]} />
          </TouchableOpacity>
          : <Menu style={st.mR16} />
        }

        {title ?
          <View animation="fadeIn">
            <Text style={[
              st.tx20,
              st.LB,
              st.colorW,
            ]}>
              {title}
            </Text>
          </View>
          : null}
      </View>

      {logout ?
        <TouchableOpacity onPress={() => logoutUser()}>
          <Text style={[st.tx16, st.colorW, st.LB]}>Logout</Text>
        </TouchableOpacity>
        :
        <View animation="zoomIn" delay={100} style={st.alignI_C}>
          <Image
            style={{ height: 40, width: 40 }}
            source={require(`../assets/Logo.png`)}
            resizeMode="contain"
          />
        </View>
      }

    </LinearGradient>
  );
}

const mapDispatchToProps = {
  logoutUser,
};



export default connect(null, mapDispatchToProps)(Header)