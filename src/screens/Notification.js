import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, FlatList, ActivityIndicator, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API"
import G from "../constants/Global"
import { destory } from "../redux/actions/auth";
import st from "../constants/style";
import moment from 'moment'

import Global from "../constants/Global";

function Notification({ route, navigation, language }) {

  const [isLoading, setisLoading] = useState(true)
  const [data, setdata] = useState(null)

  useEffect(() => {
    getNotifications()
  }, [])


  const getNotifications = () => {
    setisLoading(true)
    Global.getRequest(API.GET_NOTIFICATION)
      .then(async (res) => {
        if (res.data.success) {
          setdata(res.data.data)
          setisLoading(false)
        }
        else {
          setisLoading(false)
          alert('error to get notification')
        }
      })
  }


  const renderMessageBar = (item, index) => (
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
    <>
      {isLoading ?
        <View style={[st.flex, st.justify_al_C]}>
          <ActivityIndicator size="large" color='#c62910' style={st.mT16} />
        </View>
        :
        data.length > 0 ?
          <ScrollView style={st.container}>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                renderMessageBar(item, index)
              )}
            />
          </ScrollView>
          :
          <View style={[st.flex, st.justify_al_C]}>
            <Text style={st.tx18}>You have not get any notification</Text>
          </View>
      }

    </>
  );
}

const styl = StyleSheet.create({

})

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    userdata: state.auth.userdata,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // updateAuth: (data) => { dispatch(destory(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);