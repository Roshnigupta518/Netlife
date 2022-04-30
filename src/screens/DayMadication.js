import React, { useEffect, useState } from 'react';
import { Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import st from "../constants/style";
import { View } from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import moment from 'moment'
import API from "../constants/API";
import Global from "../constants/Global";
import I18n from '../language/i18n';
import HeaderBar from '../constants/Header'

export default function DayMadication({ route, navigation, language }) {

    const [time, setTime] = useState(route.params?.propsData?.time || new Date())
    const [date, setDate] = useState(route.params?.propsData?.date || new Date())
    const [CheckMark, setCheckMark] = useState(route.params?.data?.status || false)

    const [Update, setUpdate] = useState(false)

    const [Data, setData] = useState(route.params?.data || null)
    const [Notes, setNotes] = useState([])
    const [InputBar, setInputBar] = useState('')
    const [Morning, setMorning] = useState(false)
    const [Afternoon, setAfternoon] = useState(false)
    const [Evening, setEvening] = useState(false)
    const [Night, setNight] = useState(false)

    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        if (Data) {
            setMorning(Data.aDay.Morning)
            setAfternoon(Data.aDay.Afternoon)
            setEvening(Data.aDay.Evening)
            setNight(Data.aDay.Night)
            setNotes(Data.notes)
        } else {
            setData(null)
        }

    }, [])

    const checkAll = () => {
        setCheckMark(!CheckMark)
        setMorning(!CheckMark)
        setAfternoon(!CheckMark)
        setEvening(!CheckMark)
        setNight(!CheckMark)
        setUpdate(true)
    }


    const addNotes = () => {
        if (InputBar.trim()) {
            let temp = [...Notes]
            temp.push(InputBar)

            setNotes(temp)
            setUpdate(true)
            setInputBar('')
        }
    }

    const removeNotes = (index) => {
        let temp = [...Notes]
        temp.splice(index, 1)
        setNotes(temp)
        setUpdate(true)
    }


    const SaveRecord = () => {
        setisLoading(true)
        let data = {
            notes: Notes,
            time: time,
            date: String(moment(date).format("YYYY-MM-DD")),
            status: CheckMark,
            aDay: {
                Morning,
                Afternoon,
                Evening,
                Night,
            }
        }
        console.log(data, 'xxx')
        if (Data) {
            Global.postRequest(API.UPDATE_PRATICA + Data.id, data)
                .then(async (res) => {
                    if (res.data.success) {
                        navigation.navigate('Pratica')
                    }
                    else {
                        alert(I18n.t('fail to upload'))
                    }
                    setisLoading(false)
                })
        } else {
            Global.postRequest(API.STORE_PRATICA, data)
                .then(async (res) => {
                    if (res.data.success) {
                        navigation.navigate('Pratica')
                    }
                    else {
                        alert(I18n.t('fail to upload'))
                    }
                    setisLoading(false)
                })
        }

    }

    return (
        <>
            <HeaderBar
                title={date}
                // logout
                navigation={navigation}
                goBack
            />

            <ScrollView style={[st.container]}>

                <View animation="fadeInRight" delay={0} style={[st.mT24, st.pH16, st.row, st.alignI_C, st.justify_B]}>
                    <View animation="fadeInRight" delay={50} style={[st.row, st.alignI_FE]}>
                        {/* <Text style={[st.tx18]}>create at{moment(time).format('LT')}</Text> */}
                        <Text style={[st.tx16, st.colorB]}>{I18n.t("Create Time")}: {
                            Data
                                ? moment(Data?.time).format('LT')
                                : moment(time).format('LT')
                        }</Text>
                    </View>

                    <TouchableOpacity onPress={() => checkAll()}>
                        {CheckMark
                            ? <Feather name="check-square" style={[st.tx30, st.colorSuccess,]} />
                            : <Feather name="square" style={[st.tx30, st.colorGrey]} />
                        }
                    </TouchableOpacity>
                </View>


                <View animation="fadeInRight" delay={100} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                    <View style={[st.fieldBoxLeft]}>
                        <Text style={[st.tx12, st.colorB]}>{I18n.t("Morning")}</Text>
                    </View>
                    <View style={[st.fieldBoxRight]}>

                        <TouchableOpacity onPress={() => [setMorning(!Morning), setUpdate(true)]}>
                            {Morning
                                ? <Feather name="check-square" style={[st.tx16, st.colorSuccess]} />
                                : <Feather name="square" style={[st.tx16, st.colorD]} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View animation="fadeInRight" delay={150} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                    <View style={[st.fieldBoxLeft]}>
                        <Text style={[st.tx12, st.colorB]}>{I18n.t("Afternoon")}</Text>
                    </View>
                    <View style={[st.fieldBoxRight]}>

                        <TouchableOpacity onPress={() => [setAfternoon(!Afternoon), setUpdate(true)]}>
                            {Afternoon
                                ? <Feather name="check-square" style={[st.tx16, st.colorSuccess]} />
                                : <Feather name="square" style={[st.tx16, st.colorD]} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                    <View style={[st.fieldBoxLeft]}>
                        <Text style={[st.tx12, st.colorB]}>{I18n.t("Evening")}</Text>
                    </View>
                    <View style={[st.fieldBoxRight]}>

                        <TouchableOpacity onPress={() => [setEvening(!Evening), setUpdate(true)]}>
                            {Evening
                                ? <Feather name="check-square" style={[st.tx16, st.colorSuccess]} />
                                : <Feather name="square" style={[st.tx16, st.colorD]} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                    <View style={[st.fieldBoxLeft]}>
                        <Text style={[st.tx12, st.colorB]}>{I18n.t("Night")}</Text>
                    </View>
                    <View style={[st.fieldBoxRight]}>

                        <TouchableOpacity onPress={() => [setNight(!Night), setUpdate(true)]}>
                            {Night
                                ? <Feather name="check-square" style={[st.tx16, st.colorSuccess]} />
                                : <Feather name="square" style={[st.tx16, st.colorD]} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                {Data?.Description ? <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.justify_C]}>
                    <Text style={[st.tx18, st.colorP, st.LB, st.mB8,]}>{I18n.t("Admin Description")}</Text>
                    <Text style={[st.tx14, st.colorT]}>{Data?.Description}</Text>
                </View>
                    : null}

                {Notes ? <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.justify_C]}>
                    <Text style={[st.tx18, st.colorP, st.LB, st.mB8,]}>{I18n.t("Notes")}</Text>
                    {Notes.map((v, k) =>
                    (<View key={k} style={[st.row, st.justify_B,]}>
                        <Text style={[st.tx14, st.colorT]}>- {v}</Text>
                        <TouchableOpacity onPress={() => removeNotes(k)} style={st.row}>
                            {/* <Feather name="edit" style={[st.tx18, st.colorWarn, st.pH4]} /> */}
                            <Feather name="x" style={[st.tx20, st.colorD, st.pH4]} />
                        </TouchableOpacity>
                    </View>
                    )
                    )}
                </View>
                    : null}

                <View animation="fadeInRight" delay={250} style={[st.mV24, st.pH16, st.row]}>
                    <View style={[st.w_80]}>
                        <InputBox
                            validation={true}
                            onChangeText={val => setInputBar(val)}
                            placeholder={I18n.t('Add Notes')}
                            value={InputBar}
                            onSubmitEditing={() => addNotes()}
                        />
                    </View>
                    <View style={[st.w_20]}>
                        <TouchableOpacity onPress={() => addNotes()} activeOpacity={0.8} style={{
                            backgroundColor: '#c62910',
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                            height: 50,
                            marginTop: 8,
                            marginLeft: -3,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={[st.tx14, st.colorW]}>{I18n.t("Add Note")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {Update ?
                    <View animation="zoomIn" delay={250} style={[st.mH16]}>
                        <Button
                            name={I18n.t("Save Record")}
                            onPress={() => SaveRecord()}
                        />
                    </View>
                    : null}


            </ScrollView>
        </>
    );
}