import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ListAlarms from "../components/ListAlarms";
import AlarmTimePicker from '../components/AlarmTimePicker';


function Alarm({ navigation }) {
  
    return (
        <View style={styles.mainContainer}>
        <ScrollView style={styles.listAlarms}>
          <ListAlarms  />
        </ScrollView>

        <View style={styles.timePicker}>
          <AlarmTimePicker  />
        </View>
      </View>
    )
}


const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Alarm);

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      // backgroundColor:'#fff'
      // justifyContent: 'center',
    },
    heading: {
      // fontWeight: "bold",
      fontSize: 25,
      padding: 20,
    },
    timePicker: {
     
      alignItems:"center"
    },
    listAlarms: {
      flex: 1,
      width: '100%',
    },
  });