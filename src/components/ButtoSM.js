import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import st from '../constants/style'

export default function buttoSM({
    navigate,
    text,
    white = false,
    loading = false,
}) {

    return (
        <TouchableOpacity onPress={navigate} activeOpacity={0.8}>
            <LinearGradient
                colors={white ? ['#FFF', '#FFF'] : ['#656BDD', '#8e8fec']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={white ? styles.border : styles.linearGradientShadow}
            >
                <Text style={[st.tx14, st.PB, white ? st.colorGrey : st.colorW]}>{text}</Text>
                {loading ? <ActivityIndicator style={st.mL10} color={white ? '#656BDD' : 'white'} /> : null}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    linearGradientShadow: {
        shadowColor: "#656bdd",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10.32,
        elevation: 10,
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },

})