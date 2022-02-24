import * as React from 'react';
import { ScrollView, Image, Animated, Dimensions, Text, View, StyleSheet, TouchableOpacity, Linking, } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import MaskedView from '@react-native-community/masked-view';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import LinearGradient from "react-native-linear-gradient";
import { connect } from 'react-redux';
import { destory } from "../redux/actions/auth";
import st from "../constants/style";
import API from "../constants/API";
import I18n from '../language/i18n';
import { Daily_Status, Dashboard, Payments, Settings, Tools, } from '../constants/svgIcons';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView);

const { width, height } = Dimensions.get('window');
const fromCoords = { x: 0, y: height };
const toCoords = { x: width, y: 0 };

function CustomDrawer({ navigation, selectedRoute, userdata, language, newMessage }) {
    const style1 = [language ? st.row_R : st.row, st.p10, st.alignI_C,]
    const style2 = [st.colorW, st.tx22, st.w_15, language ? st.txAlignR : st.txAlignL]
    const style3 = [st.tx14, st.colorW, st.w_80, language ? st.txAlignR : st.txAlignL]
    const isDrawerOpened = useIsDrawerOpen
    const polygonRef = React.useRef();
    const animatedWidth = React.useRef(new Animated.Value(0)).current;
    const animation = React.useRef(new Animated.ValueXY(fromCoords)).current;
    const animate = (toValue) => {
        const animations = [
            Animated.spring(animation, {
                toValue: toValue === 1 ? toCoords : fromCoords,
                useNativeDriver: true,
                bounciness: 2,
                speed: 10,
            }),
            Animated.timing(animatedWidth, {
                toValue: toValue === 1 ? width : 0,
                duration: 0,
                useNativeDriver: false,
            }),
        ];

        return Animated.sequence(toValue === 1 ? animations.reverse() : animations);
    };

    React.useEffect(() => {
        const listener = animation.addListener((v) => {
            if (polygonRef?.current) {
                polygonRef.current.setNativeProps({
                    points: `0,0 ${v.x}, ${v.y} ${width}, ${height} 0, ${height}`,
                });
            }
        });

        return () => {
            animation.removeListener(listener);
        };
    });

    React.useEffect(() => {
        animate(isDrawerOpened ? 1 : 0).start();
    }, [isDrawerOpened]);

    const opacity = animation.x.interpolate({
        inputRange: [0, width],
        outputRange: [0, 1],
    });

    const translateX = animation.x.interpolate({
        inputRange: [0, width],
        outputRange: [-50, 0],
    });

    const onRoutePress = React.useCallback((route) => {
        navigation.navigate(route);
    }, []);

    const onCloseDrawer = React.useCallback((route) => {
        navigation.closeDrawer();
    }, []);

    return (
        <View style={[{ flex: 1 }]}>
            {/* background: linear-gradient(180deg, #8E8FEC 3.23%, #656BDD 103.23%); */}
            <LinearGradient
                colors={['#8e8fec', '#656BDD']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={[st.container,]}
            >

                <ScrollView style={[st.p15,]}>
                    <View style={[language ? st.row_R : st.row, st.alignI_C, st.justify_B]}>
                        <TouchableOpacity onPress={onCloseDrawer}>
                            <Image style={{ height: 20, width: 20, borderRadius: 200 }}
                                source={require("../assets/cross.png")}
                                resizeMode="cover"
                            />
                            {/* <Icon name='cross' type='Entypo' style={[st.tx30, st.colorW]} /> */}
                        </TouchableOpacity>
                        <Image style={{ height: 40, width: 40, }}
                            source={require("../assets/logo-white.png")}
                            resizeMode="cover"
                        />
                        <TouchableOpacity onPress={() => { navigation.navigate('FAQ') }}>
                            <Icon name='search' type='Feather' style={[st.colorW, st.tx24]} />
                        </TouchableOpacity>
                    </View>


                    <View style={[language ? st.row_R : st.row, st.alignI_C, st.mV15]}>
                        {userdata.logo ?
                            <Image style={[{ height: 50, width: 50, borderRadius: 200 }, st.mH10]}
                                source={{ uri: API.IMAGE_URL + userdata.logo }}
                                resizeMode="cover"
                            />
                            :
                            <Image style={[{ height: 50, width: 50, borderRadius: 200 }, st.mH10]}
                                source={require("../assets/userimage.png")}
                                resizeMode="cover"
                            />
                        }
                        <View>
                            <Text style={[st.tx22, st.colorW, language ? st.txAlignR : st.txAlignL]}>{userdata.full_name}</Text>
                            <Text style={[{ marginTop: -8 }, st.tx12, st.colorW, language ? st.txAlignR : st.txAlignL]}>
                                {userdata.company_name ? userdata.company_name : "Not define"}
                            </Text>
                        </View>
                    </View>

                    <View style={[st.border_B, { borderColor: '#fff', opacity: 0.2 }]} />
                    <View style={[st.mT10]} />

                    <Animated.View
                    // style={[{ opacity, transform: [{ translateX }] }]}
                    >
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Home1', { screen: 'Home1' }) }}
                            style={style1}
                        >
                            <Icon name='home' type='SimpleLineIcons' style={style2} />
                            <Text style={style3}>{I18n.t('Home')}</Text>
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('DailyStatus') }}
                            style={style1}
                        >
                            <Icon name='clock' type='Feather' style={style2} />
                            <Text style={style3}>{I18n.t('Daily_Status')}</Text>
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Analytics') }}
                            style={style1}
                        >
                            <Icon name='bar-graph' type='Entypo' style={style2} />
                            <Text style={[st.tx14, st.colorW,]}>{I18n.t('Analytics')}</Text>
                            {/* linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%,100%), #FFCF4E */}
                            <LinearGradient
                                colors={['rgba(255, 255, 255, 0) ', 'rgba(255, 255, 255, 0.38) ',]}
                                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                style={[st.mH16, st.pH16, st.bgWarn, { paddingVertical: 3, borderRadius: 200 }]}
                            >
                                <Text style={[st.tx11, st.colorW]}>By Google</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Tools') }}
                            style={style1}
                        >
                            <Icon name='appstore-o' type='AntDesign' style={style2} />
                            <Text style={style3}>{I18n.t('Tools')}</Text>
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Message') }}
                            style={style1}
                        >
                            <Icon name='message1' type='AntDesign' style={style2} />
                            <Text style={[st.tx14, st.colorW]}>{I18n.t('Message')}</Text>
                            {newMessage > 0 ? <LinearGradient
                                colors={['rgba(255, 255, 255, 0) ', 'rgba(255, 255, 255, 0.38) ',]}
                                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                style={[st.mH16, st.pH16, st.bgWarn, { paddingVertical: 3, borderRadius: 200 }]}
                            >
                                <Text style={[st.tx11, st.PB, st.colorW]}>{newMessage} {I18n.t('newMessage')}</Text>
                            </LinearGradient> : null}
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Payment') }}
                            style={style1}
                        >
                            <Icon name='wallet' type='AntDesign' style={style2} />
                            <Text style={style3}>{I18n.t('Payment')}</Text>
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Settings') }}
                            style={style1}
                        >
                            <Icon name='settings' type='Feather' style={style2} />
                            <Text style={style3}>{I18n.t('Setting')}</Text>
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('FAQ') }}
                            style={style1}
                        >
                            <Icon name='info' type='Entypo' style={style2} />
                            <Text style={style3}>{I18n.t('FAQ')}</Text>
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('PrivacyPolicy') }}
                            style={style1}
                        >
                            <Icon name='shield' type='Foundation' style={style2} />
                            <Text style={style3}>{I18n.t('PrivacyPolicy')}</Text>
                        </TouchableOpacity>
                        {/* /////////////////////////////////////////////////////// */}
                        <TouchableOpacity
                            onPress={() => { Linking.openURL('https://boxhigher.co.il/support/') }}
                            style={style1}
                        >
                            <Icon name='help-circle' type='Feather' style={style2} />
                            <Text style={style3}>{I18n.t('Support')}</Text>
                        </TouchableOpacity>


                        {/* <TouchableOpacity
                            onPress={() => { updateAuth("") }}
                            style={[language ? st.row_R : st.row, st.p10,
                            ]}
                        >
                            <Icon name='log-out' type='Feather' style={[st.colorW, st.tx26, st.w_20, st.txAlignL]} />
                            <Text style={[st.tx18, st.colorW, st.w_80,language ? st.txAlignR : st.txAlignL,]}>Logout</Text>
                        </TouchableOpacity> */}




                    </Animated.View>

                    <View style={[st.mT20]} />

                </ScrollView>

            </LinearGradient>

        </View>
    );
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
    return {
        userdata: state.user.userdata,
        language: state.user.language,
        newMessage: state.chat.newMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAuth: (data) => { dispatch(destory(data)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);