import React, { Component } from 'react';
import { Button, StyleSheet, FlatList, View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { deleteAlarm, addAlarm } from '../redux/actions/alarm';
import ReactNativeAN from 'react-native-alarm-notification';
import st from "../constants/style";
import Feather from "react-native-vector-icons/Feather";
import Global from "../constants/Global";
import API from "../constants/API";
import Moment from 'moment';
import { clearTodayAlarm } from '../redux/actions/todayAlarm';
import I18n from '../language/i18n';

class ListAlarms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isloading: false,
      // checkPastDate:false
    }
  }

  deleteAlarm = async (id,custom_id) => {
    try {
      this.setState({ isloading: true })
      Global.deleteRequest(API.DELETE_ALARM + id)
        .then(async (res) => {
          // console.log(res.data, 'cccc')
          if (res.data.success) {
            this.setState({ isloading: false })
            this.props.delete(id);
            this.getAlarms();
            ReactNativeAN.deleteAlarm(id);
            if(this.props.today_alarm?.id===id){
              this.props.clearTodayAlarm();
            }
          }
          else {
            this.setState({ isloading: false })
          }
        })
    } catch (e) {
      this.setState({ loading: false })
    }

  }

  getAlarms = async () => {
    try {
      Global.getRequest(API.ALARM_LIST)
        .then(async (res) => {
          // console.log(res.data,'cccc')
          if (res.data.success) {
            const data = res.data?.data
            this.props.add(data);
            this.setState({ isloading: false })
          }
          else {
            this.setState({ data, isloading: false })
            alert(I18n.t('error to get alarm'))
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  keyExtractor = (item, index) => index.toString();

  dateInPast = (date, time) => {
    
    const date_Alarm = date.split("/")
    const day = date_Alarm[0];
    const fday = day.charAt(0)==0?day.charAt(1):day
    const month = date_Alarm[1];
    const fmonth =  month.charAt(0)==0?month.charAt(1):month
    const year = date_Alarm[2];
    const t = time.split(" ")[0]
    const h = t.split(":")[0]
    const fh = h.charAt(0)==0?h.charAt(1):h
    const m = t.split(":")[1]

    var todayDate = new Date(); //Today Date    
    var alarmdate = new Date(year, fmonth-1, fday, fh, m);

    if (todayDate > alarmdate) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    } 
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.content}>
        <View style={[st.bgW, st.Radius]}>
          <View style={st.p15}>
            <Text style={[st.tx16, { textTransform: "capitalize" }]}>{item.label}</Text>
            <View style={[st.row, st.justify_B]}>
              <View>
                <Text 
                style={[st.tx24,{color:this.dateInPast(item.date,item.time)=== true ? '#000' : 'red'}]}>
                  {item.time}
                </Text>
              </View>

              <View>
                <Feather name="trash" size={20} color={'#EB5757'}
                  onPress={() => {
                    this.deleteAlarm(item.id,item.custom_id);
                  }} />
              </View>
            </View>
            {item.created_at && <Text style={st.tx14}>
              {item.date}
              </Text>}
          </View>
        </View>
      </View>

    )
  };

  ListEmptyComponent = () => {
    return (
      <View style={[st.flex, st.justify_al_C, { marginTop: "50%" }]}>
        <Text style={st.tx18}>{I18n.t("You have not set any alarm")}</Text>
      </View>
    )
  }

  render() {
    const { data, isloading } = this.state
    return (
      <>
        <View style={st.flex}>
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={() => this.getAlarms()}
                refreshing={false}
              />
            }
            style={st.container}
          >
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.props.alarms.reverse()}
              renderItem={this.renderItem}
              ListEmptyComponent={this.ListEmptyComponent}
            />
          </ScrollView>

        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleStyle: {
    fontSize: 25,
    color: '#000'
  },
  removebtn: {
    backgroundColor: st.bgDanger.backgroundColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = (state) => {
  return {
    alarms: state.alarmReducer?.alarms,
    today_alarm : state.todayAlarmReducer.today_alarm
  };
};


const mapDispatchToProps = dispatch => {
  return {
    delete: value => {
      dispatch(deleteAlarm(value));
    },
    add: data => {
      dispatch(addAlarm(data));
    },
    clearTodayAlarm: () => {
      dispatch(clearTodayAlarm())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAlarms);