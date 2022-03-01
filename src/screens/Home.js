import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, BackHandler, Platform, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API"
import G from "../constants/Global"
import { destory } from "../redux/actions/auth";
import ButtoOutline from "../components/ButtoOutline";
import st from "../constants/style";


function Home({ route, navigation, language }) {

  return (
    <ScrollView style={[st.container]}>

      <View animation="fadeInLeft" delay={100} style={[st.alignI_C, st.p24]}>
        <Image
          style={{ height: 100, width: 100, borderRadius: 200 }}
          source={require(`../assets/Logo.png`)}
          resizeMode="contain"
        />
      </View>

      <View style={st.p24}>
        <Text>Abdul Rehman</Text>
        <Text>0544786924</Text>
      </View>

      <BarChart
        data={{
          barColors: ["#000000", "#ced6e0", "#a4b0be"],
          labels: ["Monday", "Tuesday", "Wednesday", 'Thursday'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 10} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        // yAxisInterval={1} // optional, defaults to 1
        renderLin
        yAxisInterval={1}
        // withHorizontalLines={false}
        withVerticalLines={false}
        withShadow={false}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#FFF",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `#656BDD`,
          labelColor: (opacity = 1) => `#696969`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          borderWidth: 1,
          borderColor: 'red',
          marginVertical: 8,
          // borderRadius: 16
        }}
      />
      <View style={st.row}>
        <View style={{ width: '50%' }}>
          <ButtoOutline
            name="Notification"
            onPress={() => navigation.navigate("Notification")}
          />
        </View>
        <View style={{ width: '50%' }}>
          <ButtoOutline
            name="Patica"
            onPress={() => navigation.navigate("TimerScreen")}
          />
        </View>

      </View>



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

export default connect(mapStateToProps, mapDispatchToProps)(Home);