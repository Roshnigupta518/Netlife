import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default class button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { navigate, text, shadow, txsize } = this.props
        return (
            <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity onPress={navigate} activeOpacity={0.8}>
                    <LinearGradient
                        colors={['#656BDD', '#8e8fec']}
                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                        style={shadow ? st.linearGradientShadow : st.linearGradientButton}
                    >
                        <Text style={[st.btn, { fontSize: txsize ? txsize : 20 }]}>{text}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }
}

const st = StyleSheet.create({
    btn: {
        color: "#FFF",
        fontWeight: "700"
    },
    linearGradientButton: {
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        height: 60,
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
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center'
    },

})