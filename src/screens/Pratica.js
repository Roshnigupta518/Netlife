import React, { useState, useEffect } from 'react'
import { Platform, ScrollView, Text, View, TouchableOpacity, RefreshControl, ActivityIndicator, Alert, Image, StyleSheet, TextInput } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API";
import Global from "../constants/Global";
import st from "../constants/style";
import moment from 'moment'
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactNativeAN from 'react-native-alarm-notification';
import { addAlarm } from '../redux/actions/alarm';
import {setTodayAlarm, clearTodayAlarm} from '../redux/actions/todayAlarm';

const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

function Pratica({ route, navigation, language, addAlarm, setTodayAlarm, clearTodayAlarm, today_alarm  }) {
    const [dataMonth, setdataMonth] = useState([])
    const [time, setTime] = useState(new Date());
    const [custom_id, setcustom_id] = useState('');
    const [show, setShow] = useState(false);
    
    const [isLoading, setisLoading] = useState(true)
    const [data, setdata] = useState(null)

    useEffect(() => {
        getDates();
        remove_alarmTime();
        makeid();
    }, [route])

   const remove_alarmTime = () => {
    const current_time = moment(time).format('hh:mm A');
    console.log({today_alarm:today_alarm});
    if(current_time>=today_alarm?.time){
        clearTodayAlarm();
    }
   }

    const getDates = (event, selectedDate) => {
        let firstMonth = [];

        let date = new Date();
        let todayDate = date.getDate();
        let month = date.getMonth();
        let lastDate = new Date(date.getFullYear(), month, 0);
        lastDate = lastDate.getDate();

        for (let index = todayDate; index <= lastDate; index++) {
            firstMonth.push(`${months[month - 1]} ${index}, ${date.getFullYear()}`)
        }

        for (let index = 1; index <= todayDate; index++) {
            firstMonth.push(`${months[month]} ${index}, ${date.getFullYear()}`)
        }

        setdataMonth(firstMonth)

        getPratica(firstMonth[0]);

    }

    const getPratica = (from) => {

        setisLoading(true)

        let data = { from: moment(from).format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD') }

        Global.postRequest(API.GET_PRATICA, data)
            .then(async (res) => {
                if (res.data.success) {
                    setdata(res.data.data)
                }
                else {
                    alert('error to get pratica')
                }
                setisLoading(false)
            })
    }

    const makeid = () => {
        var length = 5;
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setcustom_id(result);
        return result;
      };


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || time;
        setShow(Platform.OS === 'ios');
        setTime(currentDate);
      
      
     //   ------Alarm-----------
        var currentTime = Date.now();
        if (selectedDate.getTime() < currentTime) {
          alert('please choose future time');
          return;
        }
        const fireDate = ReactNativeAN.parseDate(selectedDate);
        // console.log('A date has been picked: ', fireDate);
    
        const alarmNotifData = {
          id: custom_id, 
          title: 'Alarm Ringing', 
          message:"My Notification Message", 
          channel: 'alarm-channel', 
          ticker: 'My Notification Ticker',
          auto_cancel: true, 
          vibrate: true,
          vibration: 100, 
          small_icon: 'ic_launcher', 
          large_icon: 'ic_launcher',
          play_sound: true,
          sound_name: null,
          color: 'red',
          schedule_once: true, 
          tag: 'some_tag',
          fire_date: fireDate, 
          data: { value: selectedDate },
        };
    
        isAlarm(alarmNotifData);

    };

   const isAlarm = async (alarmNotifData) => {
        const time = moment(alarmNotifData?.data?.value).format('hh:mm A');
        const date = moment(alarmNotifData?.data?.value).format('DD/MM/YYYY');
        const id = alarmNotifData?.id
        const data = {
          'label':alarmNotifData?.message,
          'time' : time,
          'repeat':'once',
          'status' :'0',
          'custom_id' : Number(id),
          'date' : date
        }
        Global.postRequest(API.STORE_ALARM, data)
        .then(async (res) => {
          if (res.data.success) {
            const data = res.data.data
            getAlarms();
              let obj = {
                time,id:id
              }
            setTodayAlarm(obj)
            ReactNativeAN.scheduleAlarm(alarmNotifData);
          }
          else {
            alert('error to set alarm')
          }
        })
      }

    const getAlarms = async () => {
        try{
        Global.getRequest(API.ALARM_LIST)
          .then(async (res) => {
            // console.log(res.data,'cccc')
            if (res.data.success) {
              const data = res.data?.data
              addAlarm(data);
            }
            else {
              alert('error to get alarm')
            }
          })
        }catch(e){
                console.log(e)
        }
    }

    const renderMessageBar = (date) => {
        let CheckMark = false
        let findData = data?.find((v) => {
            return moment(v.date).format('LL') == date
        })
        CheckMark = findData ? true : false
        return (
            <TouchableOpacity style={st.card} onPress={() => navigation.navigate("DayMadication", { data: findData, propsData: { date, time, CheckMark } })}>
                <View style={[st.row, st.alignI_C]}>

                    <View style={[st.w_85, st.row, st.alignI_FE]}>
                        <Text style={[st.tx14, CheckMark ? st.colorP : null]}>{date}</Text>
                        {CheckMark ? <Text style={[st.tx12, st.mH8]}>{moment(findData?.time).format('LT')}</Text> : null}
                    </View>

                    <View style={[st.w_15, st.alignI_FE]}>
                        {CheckMark
                            ? <Fontisto name="checkbox-active" style={[st.colorSuccess, st.tx16, st.mH8]} />
                            : <Fontisto name="checkbox-passive" style={[st.colorP, st.tx16, st.mH8]} />}
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            {isLoading ?
                <View style={[st.flex, st.justify_al_C]}>
                    <ActivityIndicator size="large" color='#c62910' style={st.mT16} />
                </View> :
                <View style={st.container}>
                    {today_alarm?.time?(
                    <TouchableOpacity onPress={() =>{ [setShow(!show)] }} style={[st.p24, st.bgW, st.mB16,]}  >
                        <Text style={[st.tx30, st.colorP, st.txAlignC]}>Alarm</Text>
                      <Text style={[{ fontSize: 55 }, st.TIMER, st.colorP, st.txAlignC]}>{today_alarm?.time? today_alarm?.time : '00:00'}</Text>
                    </TouchableOpacity>
                    ):
                    <TouchableOpacity onPress={() =>{ [setShow(!show)] }} style={[st.p24, st.bgW, st.mB16,]}>
                        <Text style={[st.tx30, st.colorP, st.txAlignC]}>Alarm</Text>

                    <Text style={[{ fontSize: 55 }, st.TIMER, st.colorP, st.txAlignC]}>{today_alarm?.time? today_alarm?.time : '00:00'}</Text>
                    </TouchableOpacity>
                    }

                    {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={time}
                                mode={'time'}
                                is24Hour={false}
                                display="spinner"
                                onChange={onChange}
                            />
                        )}

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                onRefresh={() => getDates()}
                                refreshing={false}
                            />
                        }
                    >

                        {dataMonth?.map((e, v) => (
                            renderMessageBar(e)
                        )).reverse()}
                        <View style={st.mB24} />
                    </ScrollView>

                </View>}
        </>
    );
}

const styl = StyleSheet.create({

})

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
        userdata: state.auth.userdata,
        today_alarm : state.todayAlarmReducer.today_alarm
    }
}
const mapDispatchToProps = {
    addAlarm,
    setTodayAlarm,
    clearTodayAlarm,

  };

export default connect(mapStateToProps, mapDispatchToProps)(Pratica);