import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, BackHandler, Platform, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import { logoutUser } from "../redux/actions/auth";
import st from "../constants/style";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment'


function Blocked({ userdata, logoutUser }) {

  return (
    <View style={st.container}>
      <ScrollView>
        <LinearGradient
          colors={['#8d1e0d', '#c62910']}
          start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
          style={styl.heading}
        >

          <View style={[st.pH16, st.pV8]}>
            <View style={[st.row, st.alignI_C, st.justify_B]}>

              <Entypo name='menu' type='Entypo' style={[st.tx30, st.colorW]} />
              <View style={[st.alignI_C]}>
                <Image style={{ height: 50, width: 50, }}
                  source={require("../assets/Logo.png")}
                  resizeMode="cover"
                />
              </View>

            </View>
            {/* /////////////////////////////Header END */}


            <Text style={[st.tx36, st.colorW, st.mT16, { lineHeight: 36, textAlign: "left" }]}>Your Has Been Blocked...</Text>

            <View style={[st.alignI_C, st.mV50]}>
              <Entypo name='block' style={[{ fontSize: 178, opacity: 0.3 }, st.colorW]} />
            </View>

            <View>
              <View style={[st.row, st.alignI_FE]}>
                <Text style={[st.tx16, st.LB, st.colorW,]}>Date of created: </Text>
                <Text style={[st.tx14, st.colorW, st.mH4]}> {moment(userdata?.created_at).format('MMMM Do YYYY, h:mm:ss a')}</Text>
              </View>
              <Text style={[st.tx20, st.mT16, st.colorW,]}>Contact with support, Soon we'll approved your order</Text>

              <View style={[st.alignI_C, st.mV50]}>
                <TouchableOpacity
                  onPress={() => logoutUser()}
                  style={styl.btnboday}
                >
                  <Feather name='log-out' style={[st.tx26, st.colorP]} />
                  <Text style={styl.btn}>{'Logout'}</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </LinearGradient>


        {/* ////////////////////////////////Footer START */}
        <View style={[st.mT24]} />
        <Image
          style={{ height: 100, width: "100%" }}
          source={require("../assets/LogoFull.png")}
          resizeMode="contain"
        />
        <View style={st.mB35} />
        {/* //////////////////////////////////Footer END */}

      </ScrollView>
    </View>
  );
}

const styl = StyleSheet.create({
  btn: {
    color: "#c62910",
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    marginHorizontal: 16
  },
  heading: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.32,
    elevation: 10,
  },
  btnboday: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 14,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },

})

const mapStateToProps = (state) => {
  return {
    userdata: state.auth.userdata,
  }
}
const mapDispatchToProps = {
  logoutUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(Blocked);