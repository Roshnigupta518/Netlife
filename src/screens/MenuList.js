import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, BackHandler, Platform, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API"
import G from "../constants/Global"
import { destory } from "../redux/actions/auth";
import st from "../constants/style";


function MenuList({ route, navigation, language }) {

  return (
    <View style={st.container}>
      <ScrollView>
        <LinearGradient
          colors={['#8d1e0d', '#c62910']}
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);