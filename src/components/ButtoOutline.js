import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";


export default function Button({ onPress, name, shadow, txsize }) {

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={st.Button}>
            <Text style={[st.btn, { fontSize: txsize ? txsize : 16 }]}>{name}</Text>
        </TouchableOpacity>
    );
}

const st = StyleSheet.create({
    btn: {
        color: "#c62910",
        fontFamily: 'Lato-Bold',
    },
    Button: {
        marginTop: 16,
        marginHorizontal: 16,
        borderColor: '#c62910',
        borderWidth: 1,
        borderRadius: 8,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ButtonShadow: {
        shadowColor: "#c62910",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10.32,
        elevation: 10,
        borderRadius: 100,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },

})