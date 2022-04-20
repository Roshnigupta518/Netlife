import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, RefreshControl, FlatList, ActivityIndicator, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API"
import G from "../constants/Global"
import st from "../constants/style";
import moment from 'moment'
import I18n from '../language/i18n';
import Global from "../constants/Global";
import HeaderBar from '../constants/Header'

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
        console.log(res.data, 'cccc')
        if (res.data.success) {
          setdata(res.data.data)
          setisLoading(false)
        }
        else {
          setisLoading(false)
          alert(I18n.t('error to get notification'))
        }
      })
  }


  const renderMessageBar = (item, index) => (
    <View key={item.id} style={st.card}>
      <View style={[st.row, st.alignI_C]}>
        <View style={st.w_15}>
          <Image
            style={{ height: 35, width: 35, borderRadius: 100 }}
            // source={uri:"item.image"}
            source={require(`../assets/Logo.png`)}
            resizeMode="cover"
          />
        </View>

        <View style={st.w_65}>
          <Text style={[st.tx14, st.LB]}>{item.title}</Text>
          <Text style={st.tx12}>{item.message}</Text>
        </View>

        <View style={[st.w_20, st.alignI_C]}>
          <Text style={st.tx12}>{moment(item.created_at).format('dddd')}</Text>
        </View>

      </View>
    </View>
  )

  return (
    <>
      <HeaderBar title={I18n.t("Notification")} />
      {isLoading ?
        <View style={[st.flex, st.justify_al_C]}>
          <ActivityIndicator size="large" color='#c62910' style={st.mT16} />
        </View>
        :
        data.length > 0 ?

          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={() => getNotifications()}
                refreshing={false}
              />
            }
            style={st.container}
          >

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

export default connect(mapStateToProps)(Notification);