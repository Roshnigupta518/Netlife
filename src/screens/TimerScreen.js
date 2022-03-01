import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, BackHandler, Platform, Image, StyleSheet, TextInput } from "react-native";
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import API from "../constants/API";
import G from "../constants/Global";
import { destory } from "../redux/actions/auth";
import st from "../constants/style";
import moment from 'moment'
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

function TimerScreen({ route, navigation, language }) {
    const [dataMonth, setdataMonth] = useState([])
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [CheckMark, setCheckMark] = useState(false)


    useEffect(() => {
        getDates();
    }, [])

    const getDates = (event, selectedDate) => {
        let firstMonth = [];

        let date = new Date();
        let todayDate = date.getDate();
        let month = date.getMonth() + 1;
        let lastDate = new Date(date.getFullYear(), month, 0);
        lastDate = lastDate.getDate();

        for (let index = todayDate; index <= lastDate; index++) {
            firstMonth.push(`${index} ${months[month - 1]} ${date.getFullYear()}`)
        }

        if (firstMonth.length <= 20) {
            lastDate = new Date(date.getFullYear(), month + 1, 0);
            lastDate = lastDate.getDate();
            console.log(lastDate)
            for (let index = 1; index <= lastDate; index++) {
                firstMonth.push(`${index} ${months[month]} ${date.getFullYear()}`)
            }
        }

        setdataMonth(firstMonth)

    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };


    const renderMessageBar = (item) => {
        return (
            <TouchableOpacity style={st.card} onPress={() => navigation.navigate("DayMadication", { item })}>
                <View style={[st.row, st.alignI_C]}>

                    <View style={st.w_85}>
                        <Text style={st.tx12}>{moment(item).format('LL')}</Text>
                    </View>

                    <View style={[st.w_15, st.alignI_FE]}>
                        {CheckMark
                            ? <Icon name="checksquareo" style={[st.colorP, st.tx22, st.mH8]} />
                            : <Icon name="minussquareo" style={[st.colorP, st.tx22, st.mH8]} />}
                    </View>

                </View>
            </TouchableOpacity>
        )
    }






    return (
        <View style={st.container}>
            <TouchableOpacity onPress={() => setShow(true)} style={[st.p24, st.bgW, st.mB16,]}>
                <Text style={[st.tx30, st.colorP, st.txAlignC]}>Timer</Text>
                <Text style={[{ fontSize: 55 }, st.TIMER, st.colorP, st.txAlignC]}>{moment(date).format('LT')}</Text>
            </TouchableOpacity>
            <ScrollView>

                {dataMonth.map((e, v) => (
                    renderMessageBar(e)
                ))}
                <View style={st.mB24} />
            </ScrollView>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(TimerScreen);