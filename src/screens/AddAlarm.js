
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import TimePicker from 'react-native-wheel-time-picker';
import { useMemo } from 'react';
import st from "../constants/style";
import { connect } from 'react-redux';
import { addAlarm } from '../redux/actions/alarm';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativeAN from 'react-native-alarm-notification';

const MILLISECONDS_PER_MINUTE = 60 * 1000;
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

 function AppTime() {
  const [timeValue, setTimeValue] = useState(Date.now() % MILLISECONDS_PER_DAY);
  const [hour, min] = useMemo(() => {
    return [
      Math.floor(timeValue / MILLISECONDS_PER_HOUR),
      Math.floor((timeValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
      Math.floor((timeValue % MILLISECONDS_PER_MINUTE) / 1000),
    ];
  }, [timeValue]);
  return (
    <View style={styles.container}>
      <TimePicker
        value={timeValue}
        wheelProps={{
          wheelHeight: 170,
          itemHeight: 15,
        }}
        containerStyle={{height:250}}
        // wheelHeight={300}
      textStyle={{color:'red'}}
      
        onChange={(newValue) => setTimeValue(newValue)}
      />
      <Text style={st.tx24}>{`${hour < 10 ? '0' : ''}${hour}:${min < 10 ? '0' : '' }${min}`}</Text>

      <TouchableOpacity style={styles.btnsty}>
          <Text style={[st.tx20, st.colorW]}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => {
    return {};
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      add: alarmNotifObj => {dispatch(addAlarm(alarmNotifObj));
      },
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(AppTime);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff'
    // justifyContent: 'center',
  },
  timeValue: {
    marginVertical: 20,
  },
  btnsty:{
      paddingHorizontal:30,
      paddingVertical:10,
      justifyContent:'center',
      alignItems:"center",
      backgroundColor: st.bgS.backgroundColor, 
      marginTop:30,
      position:"absolute",
      bottom:20
  }
});