import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Image, Linking, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import axios from "axios"
import st from "./style";
import Button from "../components/Button";
import { update_tools } from '../redux/actions/cpanel';
import API from "../constants/API"
import I18n from '../language/i18n';
import AlertCardSelection from "../components/alertCardSelection";
import G from "../constants/Global"
const maxHeight = Dimensions.get('window').height
const maxWidth = Dimensions.get('window').width


function CustomBottomTab(props) {

    const [showalert, setalert] = useState(false)
    const [showalertPaymentMethod, setshowalertPaymentMethod] = useState(false)
    const [paymentOption, setpaymentOption] = useState(true)
    const [alertbtnloading, setalertbtnloading] = useState(false)
    const [btn2, setbtn2] = useState(false)
    const [btn3, setbtn3] = useState(false)


    const { state, descriptors, navigation, details, userdata, auth, language } = props
    const alert = () => {
        const amount = props.userdata !== {} ? props.userdata?.payment?.balance?.value : 0
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showalert}
                onRequestClose={() => setalert(false)}
            >
                <Animatable.View animation="fadeInUpBig" delay={0} duration={400} style={{
                    backgroundColor: 'rgba(142, 143, 236, 0.7)',
                    position: 'absolute',
                    width: maxWidth,
                    height: maxHeight,
                    justifyContent: 'center',
                }} />
                <View style={{
                    width: maxWidth,
                    height: maxHeight,
                    justifyContent: 'center',
                }}>

                    <Animatable.View animation="fadeIn" delay={400} style={[st.mH20, st.bgW, st.Radius, st.p20]}>
                        <View style={[st.row, st.justify_B]}>
                            <View>
                                <Text style={[{ color: '#828282' }, st.tx18,]}>{I18n.t('Balance')}</Text>
                                <Text style={[{ color: '#000' }, st.tx28, st.PB]}>$ {amount}</Text>
                            </View>
                            <Image
                                style={{ height: 80, width: 80, opacity: 0.6 }}
                                source={require(`../assets/Balance.png`)}
                                resizeMode="contain"
                            />
                        </View>

                        <Animatable.View animation="swing" delay={600} style={[st.mT10, st.mH10]}>
                            <Button
                                text={I18n.t('Pay_now')}
                                navigate={() => { amount > 0 ? setshowalertPaymentMethod(!showalertPaymentMethod) : null }}
                            />
                        </Animatable.View>
                    </Animatable.View>

                    <Animatable.View animation="fadeInDown" delay={600} style={[st.mT20, st.alignI_C]}>
                        <TouchableOpacity onPress={() => setalert(false)} >
                            <LinearGradient
                                colors={['#8d1e0d', '#c62910']}
                                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                style={{
                                    borderRadius: 40,
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    height: 80,
                                    width: 80,
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}
                            >
                                <Image
                                    style={{ height: 25, width: 25 }}
                                    source={require(`../assets/cross.png`)}
                                    resizeMode="contain"
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animatable.View>


                </View>
            </Modal >

        )
    }

    const payamount = () => {
        var data = new FormData();
        setalertbtnloading(true)

        data.append('user_id', userdata._id)
        G.postRequest(API.PAYPAL_CEARTE_BALANCE, data, auth)
            .then((res) => {
                console.log(res.status, 'URL')
                console.log(res.data.data, 'URL')
                if (res.status == 200) {
                    setalertbtnloading(false)
                    setalert(false)
                    setshowalertPaymentMethod(false)
                    navigation.navigate('Payment_webView', { res: res.data.data, paymentOption: paymentOption, isFrom: "Balance" })
                }
            })
    }


    const Cpanel_link = () => {
        setbtn3(true)

        axios.get(API.CPANEL_LINK + details.domain_id,)
            .then((res2) => {
                setbtn3(false)
                if (res2.data.data.link) {
                    // console.log(res2.data.data.link, 're222222')
                    navigation.navigate('ToolsWeb', { url: res2.data.data.link })
                } else {
                    alert("You have no longer access");
                }
            })
            .catch((err) => {
                console.log(err, 'err')
            })
    }
    // const wordpress_link = () => {
    //     if (props.tools_wordpress) {
    //         Linking.openURL(props.tools_wordpress)
    //     } else {
    //         if (props.details) {
    //             setbtn2(true)
    //             var domain_name = props.details.domain_name
    //             var cpanel_username = props.details.cpanel_username
    //             axios.get(API.CPANEL_TOOLS + domain_name + '/' + cpanel_username)
    //                 .then((response) => {
    //                     if (response.status === 200 && response.data.data.length > 0) {
    //                         props.update_tools(response.data.data)
    //                         setbtn2(false)
    //                         Linking.openURL(response.data.data[1].link)
    //                     } else {
    //                         dispatch({ type: 'TOOLS__FALSE', })
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     console.log(err, 'err')
    //                 })
    //         }
    //     }
    // }

    const row = language ? st.row_R : st.row

    return (
        <View>
            <View style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "#FFF",
            }}>
                <Animatable.View animation="fadeInUp" delay={400} style={row}>
                    <TouchableOpacity
                        onPress={() => { setalert(true) }}
                        activeOpacity={1}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 15 }}
                    >
                        <Animatable.View animation="fadeInUp" delay={600} style={[st.alignI_C]} >
                            <Image
                                style={{ height: 35, width: 35 }}
                                source={require(`../assets/Balance.png`)}
                                resizeMode="contain"
                            />
                            <Text style={{ color: '#868686', fontSize: 12, }}>{I18n.t('Balance')}</Text>
                        </Animatable.View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={() => { btn2 ? null : details ? wordpress_link() : null }}
                        onPress={() => {
                            props.userdata.urls
                                ? props.userdata.urls.admin
                                    ? props.userdata.urls.admin.includes('http')
                                        ? navigation.navigate('ToolsWeb', { url: props.userdata.urls.admin })
                                        : navigation.navigate('ToolsWeb', { url: "http://" + props.userdata.urls.admin })
                                    : alert('No Admin Found')
                                : null
                        }}
                        activeOpacity={1}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 15 }}
                    >
                        <Animatable.View animation="fadeInUp" delay={800} style={[st.alignI_C]} >
                            <Image
                                style={{ height: 35, width: 35 }}
                                source={require(`../assets/wordpress.png`)}
                                resizeMode="contain"
                            />
                            <Text style={{ color: '#868686', fontSize: 12, }}>{I18n.t('Admin')}</Text>
                        </Animatable.View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { btn3 ? null : details ? Cpanel_link() : null }}
                        activeOpacity={1}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 15 }}
                    >
                        {btn3
                            ? <ActivityIndicator color='#c62910' style={{ width: 20, height: 20 }} />
                            : <Animatable.View animation="fadeInUp" delay={1000} style={[st.alignI_C]} >
                                <Image
                                    style={{ height: 35, width: 35 }}
                                    source={require(`../assets/cpanel.png`)}
                                    resizeMode="contain"
                                />
                                <Text style={{ color: '#868686', fontSize: 12, }}>{I18n.t('cPanel')}</Text>
                            </Animatable.View>}

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Message')}
                        activeOpacity={1}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 15 }}
                    >
                        <Animatable.View animation="fadeInUp" delay={1200} style={[st.alignI_C]} >
                            <View style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name='message' type='MaterialCommunityIcons' style={[st.colorP, st.tx30]} />
                            </View>
                            <Text style={{ color: '#868686', fontSize: 12, }}>{I18n.t('Message')}</Text>
                        </Animatable.View>
                    </TouchableOpacity>

                </Animatable.View>
            </View>
            {alert()}

            <AlertCardSelection
                status={showalertPaymentMethod}
                paymentOption={paymentOption}
                // changeOption={() => { setpaymentOption(!paymentOption) }}
                close={() => { setshowalertPaymentMethod(!showalertPaymentMethod) }}
                paybtn={() => { payamount() }}
                alertbtnloading={alertbtnloading}
            />
        </View>
    );
}


const style = StyleSheet.create({
    counting: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        top: 8,
        right: "50%",
        width: 18,
        height: 18,
        borderRadius: 20
    }

})

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
        userdata: state.auth.userdata,
        cpanel_link: state.cpanel.cpanel_link,
        cpanel_link_lodain: state.cpanel.cpanel_link_lodain,
        details: state.cpanel.details,
        tools_wordpress: state.cpanel.tools_wordpress,
        language: state.auth.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update_tools: (data) => { dispatch(update_tools(data)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomBottomTab)




// import THIS_ONE_I_EDIT from "../../node_modules/@react-navigation/bottom-tabs/src/views/BottomTabView";
// <View style={{
//     flex: 1,
//     width: '100%',
//     position: 'absolute',
//     bottom: 0,
//     zIndex: 20,}}
// >
//     { this.renderTabBar() }
// </View>