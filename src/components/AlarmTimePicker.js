import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Modal, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addAlarm } from '../redux/actions/alarm';
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativeAN from 'react-native-alarm-notification';
import st from "../constants/style";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Moment from 'moment';
import Global from "../constants/Global";
import API from "../constants/API";
import I18n from '../language/i18n';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      modelAlert: false,
      label: '',
      vlabel: true,
      isloading: true
    };
  }

  makeid = () => {
    var length = 5;
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = datetime => {
    var currentTime = Date.now();
    if (datetime.getTime() < currentTime) {
      alert(I18n.t('please choose future time'));
      this.hideDateTimePicker();

      return;
    }
    const fireDate = ReactNativeAN.parseDate(datetime);
    // console.log('A date has been picked: ', fireDate);

    const alarmNotifData = {
      id: this.makeid(),
      title: I18n.t('Alarm Ringing'),
      message: this.state.label,
      channel: 'alarm-channel',
      ticker: 'My Notification Ticker',
      auto_cancel: true,
      vibrate: true,
      vibration: 100,
      small_icon: 'ic_launcher',
      large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: 'iphone_ringtone.mp3',
      color: 'red',
      schedule_once: true,
      tag: 'some_tag',
      fire_date: fireDate,
      data: { value: datetime },
    };


    this.hideDateTimePicker();
    this.isAlarm(alarmNotifData)
  };

  setModalPreviewVisible = (visible) => {
    this.setState({ modelAlert: visible });
  }

  isAlarm = async (alarmNotifData) => {
    const time = Moment(alarmNotifData?.data?.value).format('hh:mm A');
    const date = Moment(alarmNotifData?.data?.value).format('DD/MM/YYYY');
    const data = {
      'label':alarmNotifData?.message,
      'time' : time,
      'repeat':'once',
      'status' :'0',
      'date' : date
    }
    
    Global.postRequest(API.STORE_ALARM, data)
    .then(async (res) => {
      if (res.data.success) {
        const data = res.data.data
        this.setState({isloading:true, label:''})
         this.getAlarms();
         const fireDate = ReactNativeAN.parseDate(datetime);
         const alarmNotifData = {
          id: res.data?.data?.id,
          title: 'Alarm Ringing',
          message: this.state.label,
          channel: 'alarm-channel',
          ticker: 'My Notification Ticker',
          auto_cancel: true,
          vibrate: true,
          vibration: 100,
          small_icon: 'ic_launcher',
          large_icon: 'ic_launcher',
          play_sound: true,
          sound_name: 'iphone_ringtone.mp3',
          color: 'red',
          schedule_once: true,
          tag: 'some_tag',
          fire_date: fireDate,
          data: { value: datetime },
        };

         ReactNativeAN.scheduleAlarm(alarmNotifData);
      }
      else {
        alert('error to set alarm')
      }
    })
  }

  getAlarms = async () => {
    try{
    Global.getRequest(API.ALARM_LIST)
      .then(async (res) => {
        if (res.data.success) {
          const data = res.data.data
          this.setState({ isloading: false, label: '' })
          this.props.add(data)
        }
        else {
          alert(I18n.t('error to get alarm'))
        }
      })
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    this.getAlarms();
  }


  render() {
    return (
      <>
        <TouchableOpacity style={styles.btnsty} onPress={() => {
          // this.showDateTimePicker()
          this.setModalPreviewVisible(!this.state.modelAlert)
        }} >

          <LinearGradient
            colors={['#f64c40', '#c62910']}
            start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }}
            style={styles.btngr}
          >
            <Text style={[st.tx28, st.colorW, st.LB]}>+</Text>

          </LinearGradient>

        </TouchableOpacity>
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          display={'spinner'}
        />

        {this.state.isloading &&
          <View style={[st.flex, st.justify_al_C]}>
            <ActivityIndicator size="large" color='#c62910' style={st.mT16} />
          </View>}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modelAlert}
          onBackdropPress={() => this.setModalPreviewVisible(!this.state.modelAlert)}
          onRequestClose={() => this.setModalPreviewVisible(!this.state.modelAlert)}>
          <View style={styles.center}>
            <View style={styles.input_modalView}>
              <Text style={[st.tx22, st.txAlignC, st.colorB]}>{I18n.t("Add alarm label")}</Text>
              <View animation="zoomIn" delay={200} style={[st.mT4, st.pH16]}>
                <InputBox
                  validation={this.state.vlabel}
                  onChangeText={val => this.setState({ label: val, vlabel: true })}
                  placeholder={I18n.t('Enter Label')}
                  value={this.state.label}
                />
              </View>

              <View animation="zoomIn" delay={250} style={[st.mH16, st.mV24]}>
                <View style={[st.row, st.justify_A]}>
                  <Button
                    name={I18n.t("Cancel")}
                    onPress={() => this.setModalPreviewVisible(!this.state.modelAlert)}
                  />
                  <Button
                    name={I18n.t("Add")}
                    onPress={() => {
                      if (this.state.label) {
                        this.setModalPreviewVisible(!this.state.modelAlert);
                        this.showDateTimePicker();
                      } else {
                        alert(I18n.t('Please add alarm label'))
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    add: alarmNotifObj => {
      dispatch(addAlarm(alarmNotifObj));
    },
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);

const styles = StyleSheet.create({
  btnsty: {
    borderRadius: 60 / 2,
    position: 'absolute',
    bottom: 30,
    right: 30,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  btngr: {
    width: 60,
    borderColor: '#ccc',
    borderRadius: 60 / 2,
    borderWidth: 0.3,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input_modalView: {

    backgroundColor: '#fff',
    padding: 25,
    paddingBottom: 0,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: Platform.OS == "android" ? 1 : 0.2,
    shadowRadius: 4,
    elevation: Platform.OS == "android" ? 5 : 0,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 0.4,
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
})