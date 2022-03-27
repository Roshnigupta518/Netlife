import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, BackHandler, Platform, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API"
import G from "../constants/Global"
import st from "../constants/style";
import I18n from '../language/i18n';


function Payment_ThankYou({ route, navigation, language }) {

  const [paymentOption, setpaymentOption] = useState('')
  const [order_id, setorder_id] = useState('')
  const [user_id, setuser_id] = useState('')
  const [icon, seticon] = useState('check')
  const [createat, setcreateat] = useState('0')
  useEffect(() => {
    if (route.params) {
    }
  }, [])


  return (
    <View style={st.container}>
      <ScrollView>
        <LinearGradient
          colors={['#8d1e0d', '#c62910']}
          start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
          style={styl.heading}
        >

          <View style={[st.pH15, st.pV10]}>
            {/* /////////////////////////////Header START */}
            <View style={[language ? st.row_R : st.row, st.alignI_C, st.justify_B,]}>
              <TouchableOpacity
                onPress={() => { navigation.openDrawer(); }}
              >
                {/* <Icon name='menu' type='Entypo' style={[st.tx30, st.colorW]} /> */}
              </TouchableOpacity>
              <View style={[st.alignI_C]}>
                <Image style={{ height: 50, width: 50, }}
                  // source={require("../assets/logo-white.png")}
                  resizeMode="cover"
                />
              </View>

              <TouchableOpacity
                onPress={() => { navigation.navigate('FAQ'); }}
              >
                {/* <Icon name='search' type='Feather' style={[st.colorW, st.tx26]} /> */}
              </TouchableOpacity>
            </View>
            {/* /////////////////////////////Header END */}


            <Text style={[st.tx36, st.PB, st.colorW, st.mT20, { lineHeight: 36, textAlign: language ? "right" : "left" }]}>{I18n.t('Your_Order_Has_Been_Created')}</Text>

            <View style={[st.alignI_C, st.mV20]}>
              {/* <Icon name={icon} type='Entypo' style={[{ fontSize: 178, opacity: 0.3 }, st.colorW]} /> */}
            </View>

            <View style={st.mH20}>
              <View style={[language ? st.row_R : st.row,]}>
                <Text style={[st.tx14, st.colorW,]}>{I18n.t('Date_of_created')}: </Text>
                <Text style={[st.tx14, st.PB, st.colorW, st.mH5]}> {createat}</Text>
              </View>
              <Text style={[st.tx20, { textAlign: language ? "right" : "left" }, st.PM, st.colorW,]}>{I18n.t('Soon_well_approved_your_order')}</Text>

              <View style={[st.alignI_C, st.mV30]}>
                <TouchableOpacity
                  onPress={() => { navigation.navigate('Home1') }}
                  style={styl.btnboday}
                >
                  <Text style={styl.btn}>{I18n.t('Go_Back_To_Home')}</Text>
                </TouchableOpacity>
              </View>

            </View>





          </View>
        </LinearGradient>
        {/* ////////////////////////////////Footer START */}
        <View style={[st.mT20]} />
        <Image
          style={{ height: 51, width: "100%" }}
          // source={require("../assets/boxhigherlogo.png")}
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
    auth: state.auth.auth,
    userdata: state.auth.userdata,
    language: state.auth.language,
  }
}

export default connect(mapStateToProps)(Payment_ThankYou);