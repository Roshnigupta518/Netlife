import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Modal } from 'react-native';
import st from '../constants/style'
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'

function AlertConditionSelection({
    status,
    close,
    option,
    changeOption,
    language,
}) {
    const row = language ? st.row_R : st.row

    const bgwhite = () => (
        <View style={[st.w_100, st.h_100]}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={close}
                style={[st.bgPT, st.w_100, st.h_100, { position: "absolute" }]}
            >
            </TouchableOpacity >
        </View>
    )

    const displayBox = () => (
        <View style={{
            position: 'absolute',
            width: "100%",
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Animatable.View animation="fadeIn" delay={400} style={[st.mH20, st.justify_C, st.bgW, st.Radius, st.p20]}>
                <Text style={[st.txAlignC, st.tx18, st.PM,]}>{('Select_image_Picker')}</Text>
                {option.map((item, index) => (
                    <TouchableOpacity activeOpacity={1} key={index} onPress={() => [close(), changeOption(item)]} style={[st.card, row, st.alignI_C]}>
                        <View style={[st.w_10]}>
                            <View style={[styles.radioButton, st.bgP]} />
                        </View>
                        <View style={[st.w_70]}>
                            <Text style={[st.tx14, st.mH10]}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                ))
                }
            </Animatable.View>
        </View>
    )


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={status}
            onRequestClose={close}
        >
            {bgwhite()}
            {displayBox()}
        </Modal>
    );
}

const styles = StyleSheet.create({
    radioButton: {
        width: 15, height: 15, borderColor: "#CCC", borderWidth: 1, padding: 2, borderRadius: 30
    },
});

const mapStateToProps = (state) => {
    return {
        language: state.user.language,
    }
}
export default connect(mapStateToProps)(AlertConditionSelection)