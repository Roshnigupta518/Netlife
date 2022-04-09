import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { View } from 'react-native-animatable';

export default function Button({ onPress, name, txSize = 16, Loading }) {

    return (
        <TouchableOpacity
            onPress={Loading ? null : onPress}
            activeOpacity={Loading ? 1 : 0.8}
            style={{ justifyContent: 'center' }}
        >
            <LinearGradient
                colors={['#8d1e0d', '#c62910']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={st.ButtonBox}
            >
                <Text style={[st.btn, { fontSize: txSize }]}>{name}</Text>
                {Loading ?
                    <View animation="zoomIn">
                        <ActivityIndicator style={{ marginLeft: 16 }} color='#f1f1f1' />
                    </View>
                    : null}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const st = StyleSheet.create({
    btn: {
        color: "#FFF",
        fontFamily: 'Lato-Bold',
    },
    ButtonBox: {
        flexDirection: 'row',
        borderRadius: 8,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#c62910",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10.32,
        elevation: 5,
       paddingHorizontal:30,
    },

})