import React, { useEffect, useState } from 'react';
import { Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import st from "../constants/style";
import { View } from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import ButtoOutline from "../components/ButtoOutline";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import moment from 'moment'

export default function DayMadication({ route, navigation, language }) {

    const [time, setTime] = useState(route.params?.propsData?.time || new Date())
    const [date, setDate] = useState(route.params?.propsData?.date || new Date())
    const [CheckMark, setCheckMark] = useState(route.params?.propsData?.CheckMark || false)
    const [Data, setData] = useState(route.params?.data || null)
    const [Update, setUpdate] = useState(false)


    useEffect(() => {
        console.log(route.params.data, 'routerouteroute')
    }, [])

    const aDay = (val) => {

        
        setData({
            "aDay": {
                "Morning": 0,
                "Afternoon": 0,
                "Evening": 0,
                "Night": 0
            }
        })

        setUpdate(true)
    }
    const checkAll = () => {
        setCheckMark(!CheckMark)
        setUpdate(true)
    }




    return (
        <ScrollView style={[st.container]}>

            <View animation="fadeInRight" delay={50} style={[st.mV24, st.pH16, st.row, st.alignI_C, st.justify_B]}>
                <Text style={[{ fontSize: 30 }, st.LB, st.colorP]}>{date}</Text>
                <TouchableOpacity onPress={() => checkAll()}>
                    {CheckMark
                        ? <Feather name="check-square" style={[st.colorSuccess, st.tx30]} />
                        : <Feather name="square" style={[st.tx30]} />
                    }
                </TouchableOpacity>
            </View>
            <View style={st.pL16}>
                <Text style={[st.tx24]}>{moment(time).format('LT')}</Text>
            </View>


            <View animation="fadeInRight" delay={100} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                <View style={[st.fieldBoxLeft]}>
                    <Text style={st.tx12}>Morning</Text>
                </View>
                <View style={[st.fieldBoxRight]}>

                    <TouchableOpacity onPress={() => aDay("Morning")}>
                        {Data?.aDay.Morning
                            ? <Feather name="check-square" style={[st.colorSuccess, st.tx16]} />
                            : <Feather name="square" style={[st.colorD, st.tx16]} />
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <View animation="fadeInRight" delay={150} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                <View style={[st.fieldBoxLeft]}>
                    <Text style={st.tx12}>Afternoon</Text>
                </View>
                <View style={[st.fieldBoxRight]}>

                    <TouchableOpacity onPress={() => aDay("Afternoon")}>
                        {Data?.aDay.Afternoon
                            ? <Feather name="check-square" style={[st.colorSuccess, st.tx16]} />
                            : <Feather name="square" style={[st.colorD, st.tx16]} />
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                <View style={[st.fieldBoxLeft]}>
                    <Text style={st.tx12}>Evening</Text>
                </View>
                <View style={[st.fieldBoxRight]}>

                    <TouchableOpacity onPress={() => aDay("Evening")}>
                        {Data?.aDay.Evening
                            ? <Feather name="check-square" style={[st.colorSuccess, st.tx16]} />
                            : <Feather name="square" style={[st.colorD, st.tx16]} />
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                <View style={[st.fieldBoxLeft]}>
                    <Text style={st.tx12}>Night</Text>
                </View>
                <View style={[st.fieldBoxRight]}>

                    <TouchableOpacity onPress={() => aDay("Night")}>
                        {Data?.aDay.Night
                            ? <Feather name="check-square" style={[st.colorSuccess, st.tx16]} />
                            : <Feather name="square" style={[st.colorD, st.tx16]} />
                        }
                    </TouchableOpacity>
                </View>
            </View>



            {Data?.notes ? <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.justify_C]}>
                <Text style={[st.tx18, st.mB8,]}>Notes</Text>
                {Data?.notes.map((v, k) =>
                (<View key={k} style={[st.row, st.justify_B,]}>
                    <Text style={st.tx14}>-{v}</Text>
                    <View style={st.row}>
                        {/* <Feather name="edit" style={[st.tx18, st.colorWarn, st.pH4]} /> */}
                        <Feather name="x" style={[st.tx20, st.colorD, st.pH4]} />
                    </View>
                </View>
                )
                )}
            </View> : null}


            <View animation="fadeInRight" delay={250} style={[st.mV24]}>
                <ButtoOutline
                    name="Add Note"
                // onPress={() => navigation.navigate("Home")}
                />
            </View>
            {Update ?
                <View animation="zoomIn" delay={250} style={[st.mH16]}>
                    <Button
                        name="Save Record"
                    // onPress={() => navigation.navigate("Home")}
                    />
                </View>
                : null}


        </ScrollView>
    );
}