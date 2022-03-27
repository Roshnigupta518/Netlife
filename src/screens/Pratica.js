import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, RefreshControl, ActivityIndicator, Platform, Image, StyleSheet, TextInput } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API";
import Global from "../constants/Global";
import st from "../constants/style";
import moment from 'moment'
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';

const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

function Pratica({ route, navigation, language }) {
    const [dataMonth, setdataMonth] = useState([])
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);

    const [isLoading, setisLoading] = useState(true)
    const [data, setdata] = useState(null)


    useEffect(() => {
        getDates();
    }, [route])


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


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || time;
        setShow(Platform.OS === 'ios');
        setTime(currentDate);
    };


    const renderMessageBar = (date) => {
        let CheckMark = false
        let findData = data.find((v) => {
            return moment(v.date).format('LL') == date
        })
        CheckMark = findData ? true : false
        return (
            <TouchableOpacity style={st.card} onPress={() => navigation.navigate("DayMadication", { data: findData, propsData: { date, time, CheckMark } })}>
                <View style={[st.row, st.alignI_C]}>

                    <View style={[st.w_85, st.row, st.alignI_FE]}>
                        <Text style={[st.tx14, CheckMark ? st.colorP : null]}>{date}</Text>
                        {CheckMark ? <Text style={[st.tx12, st.mH8]}>{moment(findData.time).format('LT')}</Text> : null}
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
                    <TouchableOpacity onPress={() => setShow(!show)} style={[st.p24, st.bgW, st.mB16,]}>
                        <Text style={[st.tx30, st.colorP, st.txAlignC]}>Timer</Text>
                        <Text style={[{ fontSize: 55 }, st.TIMER, st.colorP, st.txAlignC]}>{moment(time).format('LT')}</Text>

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


                    </TouchableOpacity>

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                onRefresh={() => getDates()}
                                refreshing={false}
                            />
                        }
                    >

                        {dataMonth.map((e, v) => (
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
    }
}

export default connect(mapStateToProps)(Pratica);