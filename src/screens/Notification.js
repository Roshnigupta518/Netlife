import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, BackHandler, Platform, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API"
import G from "../constants/Global"
import { destory } from "../redux/actions/auth";
import st from "../constants/style";
import moment from 'moment'


function Notification({ route, navigation, language }) {

  const renderMessageBar = () => (
    <View style={st.card}>
      <View style={[st.row, st.alignI_C]}>
        <View style={st.w_15}>
          <Image
            style={{ height: 35, width: 35, borderRadius: 100 }}
            source={require(`../assets/Logo.png`)}
            resizeMode="cover"
          />
        </View>

        <View style={st.w_70}>
          <Text style={[st.tx14, st.LB]}>Titleee of the message</Text>
          <Text style={st.tx12}>Message which admin will send </Text>
        </View>

        <View style={[st.w_15, st.alignI_C]}>
          <Text style={st.tx12}>{moment().format('dddd')}</Text>
        </View>


      </View>
    </View>
  )


  return (
    <ScrollView style={st.container}>
      {renderMessageBar()}
      {renderMessageBar()}
      {renderMessageBar()}
      {renderMessageBar()}
      {renderMessageBar()}
      {renderMessageBar()}
      {renderMessageBar()}
      {renderMessageBar()}
      {renderMessageBar()}
      {renderMessageBar()}
    </ScrollView>
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