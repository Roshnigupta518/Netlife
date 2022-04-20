import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ListAlarms from "../components/ListAlarms";
import AlarmTimePicker from '../components/AlarmTimePicker';
import I18n from '../language/i18n';
import HeaderBar from '../constants/Header'

function Alarm({ navigation }) {

  return (
    <>
      <HeaderBar title={I18n.t("Alarm")} />
      <View style={styles.mainContainer}>
        <ScrollView style={styles.listAlarms}>
          <ListAlarms />
        </ScrollView>

        <AlarmTimePicker />
      </View>
    </>
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
  },
  listAlarms: {
    flex: 1,
    width: '100%',
  },
});