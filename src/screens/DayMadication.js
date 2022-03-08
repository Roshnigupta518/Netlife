import React, { useEffect, useState } from 'react';
import { Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import st from "../constants/style";
import { View } from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import moment from 'moment'

export default function DayMadication({ route, navigation, language }) {

    const [date, setdate] = useState(route.params.data || new Date())

    useEffect(() => {
        console.log(route.params.item, 'routerouteroute')
        console.log(route.params.data, 'routerouteroute')
    }, [])

    return (
        <ScrollView style={[st.container]}>

            <View animation="fadeInRight" delay={50} style={[st.mV24, st.pH16, st.row, st.alignI_C, st.justify_B]}>
                <Text style={[{ fontSize: 30 }, st.LB, st.colorP]}>{moment(route.params.item).format('LL')}</Text>
                <Feather name="check-square" style={[st.colorSuccess, st.tx30]} />
            </View>
            <View style={st.pL16}>
                <Text style={[st.tx24]}>{moment(date).format('LT')}</Text>
            </View>



            <View animation="fadeInRight" delay={100} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                <View style={[st.fieldBoxLeft]}>
                    <Text style={st.tx12}>Morning</Text>
                </View>
                <View style={[st.fieldBoxRight]}>
                    <Feather name="check-square" style={[st.colorSuccess, st.tx16]} />
                </View>
            </View>

            <View animation="fadeInRight" delay={150} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                <View style={[st.fieldBoxLeft]}>
                    <Text style={st.tx12}>Afternoon</Text>
                </View>
                <View style={[st.fieldBoxRight]}>
                    <Feather name="square" style={[st.colorD, st.tx16]} />
                </View>
            </View>

            <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                <View style={[st.fieldBoxLeft]}>
                    <Text style={st.tx12}>Evening</Text>
                </View>
                <View style={[st.fieldBoxRight]}>
                    <Feather name="check-square" style={[st.colorSuccess, st.tx16]} />
                </View>
            </View>

            <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.row, st.justify_C]}>
                <View style={[st.fieldBoxLeft]}>
                    <Text style={st.tx12}>Night</Text>
                </View>
                <View style={[st.fieldBoxRight]}>
                    <Feather name="check-square" style={[st.colorSuccess, st.tx16]} />
                </View>
            </View>



            <View animation="fadeInRight" delay={200} style={[st.mT16, st.pH16, st.justify_C]}>
                <Text style={st.tx18}>Notes</Text>
                <Text style={st.tx14}>- Has dajksd ajksd                       EDIT | Delete</Text>
                <Text style={st.tx14}>- Has dajksd ajksd                       EDIT | Delete</Text>
                <Text style={st.tx14}>- Has dajksd ajksd                       EDIT | Delete</Text>
                <Text style={st.tx14}>- Has dajksd ajksd                       EDIT | Delete</Text>
            </View>


            <View animation="fadeInRight" delay={250} style={[st.mH16, st.mV24]}>
                <Button
                    name="Add Note"
                // onPress={() => navigation.navigate("Home")}
                />
            </View>




        </ScrollView>
    );
}