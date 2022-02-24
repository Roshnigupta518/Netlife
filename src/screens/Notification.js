import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, BackHandler, Platform, Image, StyleSheet } from "react-native";
import { Input, Icon } from 'native-base';
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API"
import G from "../constants/Global"
import { destory } from "../redux/actions/auth";
import st from "../constants/style";


function Notification({ route, navigation, language }) {

  return (
    <View style={st.container}>
      <ScrollView>
        <LinearGradient
          colors={['#656BDD', '#8e8fec']}
          start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
          style={styl.heading}
        >

        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styl = StyleSheet.create({

})

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

export default connect(mapStateToProps, mapDispatchToProps)(Notification);