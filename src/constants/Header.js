import React, { useState } from 'react';
import {
  TouchableOpacity,
  Platform,
  ScrollView,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import { Icon } from 'native-base';
import LinearGradient from "react-native-linear-gradient";
import st from "../constants/style";
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;


function Header({ navigation, language, HeadingText, HeadingArry = [null], Right, onChange }) {

  const [select, setselect] = useState(HeadingArry[0])
  change = (res, index) => {
    setselect(res)
    onChange(index)
  }

  return (
    <LinearGradient
      colors={['#656BDD', '#8e8fec']}
      start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
      style={[{ height: 160, paddingTop: 30 }, st.pH15, st.pV10]}
    >

      <View style={[language ? st.row_R : st.row, st.alignI_C, st.justify_B,]}>
        {Right ?
          <TouchableOpacity
            // style={[st.w_20]}
            onPress={() => navigation.openDrawer()}
          >
            <Icon name='menu' type='Entypo' style={[st.tx30, st.colorW]} />
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Icon name={language ? 'right' : 'left'} type='AntDesign' style={[st.tx30, st.colorW]} />
          </TouchableOpacity>
        }
        <View style={st.alignI_C}>
          <Image style={{ height: 44, width: 44, }}
            source={require("../assets/logo-white.png")}
            resizeMode="cover"
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
          <Icon name='search' type='Feather' style={[st.colorW, st.tx24]} />
        </TouchableOpacity>
      </View>

      {HeadingText ?
        <Animatable.View animation="fadeInLeftBig" style={st.mT8}>
          <Text style={[
            st.colorW,
            st.tx24,
            select ? st.PT : st.PM,
            language ? st.alignS_FE : st.alignS_FS,
          ]}>
            {HeadingText}
          </Text>
        </Animatable.View>
        : null}

      <ScrollView
        horizontal={true}
        style={st.mT8}
        showsHorizontalScrollIndicator={false}
      >
        {HeadingArry.length > 0 && HeadingArry.map((v, i) => (
          <TouchableOpacity
            style={st.mR16}
            key={i}
            activeOpacity={1}
            onPress={() => change(v, i)}
          >
            <Text style={[
              st.colorW,
              select === v ? null : { marginTop: 6 },
              select === v ? st.tx24 : st.tx18,
              select === v ? st.PM : st.PT,
              language ? st.alignS_FE : st.alignS_FS,
            ]}>
              {v}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>



    </LinearGradient >
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.user.language
  }
}


export default connect(mapStateToProps)(Header)