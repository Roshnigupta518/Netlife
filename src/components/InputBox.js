import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { View } from 'react-native-animatable';
import st from '../constants/style';
import { connect } from 'react-redux';
import { Cross } from '../constants/svgIcons';
import Icon from 'react-native-vector-icons/Entypo';

function InputBox({
  title,
  placeholder = "placeholder",
  validation = true,
  onChangeText,
  value = '',
  disabled = false,
  language = false,
  ShowPassIcon = false,
  onSubmitEditing
}) {

  const [focused, setFocus] = useState(false)
  const [showPass, setshowPass] = useState(ShowPassIcon)

  const row = language ? st.row_R : st.row
  const RTL = language ? "right" : "left"

  return (
    <View>
      {title ? <View style={[row, st.alignI_C]}>
        <Text style={[
          Icon ? st.pH10 : null,
          st.tx12, st.colorB,
          { textAlign: RTL },
        ]}>{title}</Text>
      </View> : null}
      <View
        style={[
          row, st.mT8, st.alignI_C,
          validation === true
            ? st.inputRoundgrey(focused)
            : st.inputRoundred(focused),
        ]}
      >
        <TextInput
          onSubmitEditing={onSubmitEditing}
          editable={!disabled}
          // returnKeyType="next"
          autoCapitalize='none'
          onChangeText={val => onChangeText(val)}
          onFocus={() => { setFocus(true) }}
          onBlur={() => { setFocus(false) }}
          secureTextEntry={showPass}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          style={{
            fontSize: 12,
            fontFamily: 'Lato-Regular',
            color: '#4F4F4F',
            textAlign: RTL,
            width: '90%'
          }}
        />
        {disabled ? null : value ?
          <View animation="fadeIn" style={[st.alignI_C, st.w_10]}>
            {ShowPassIcon ?
              <TouchableOpacity onPress={() => setshowPass(!showPass)}>
                {showPass ? (
                  <Icon name="eye" style={[st.colorP, st.tx20]} />
                ) : (
                  <Icon name="eye-with-line" style={[st.colorP, st.tx20]} />
                )}
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => onChangeText("")}>
                <Cross width="13" height="14" />
              </TouchableOpacity>}

          </View>
          : null}
      </View>
    </View>
  );
}


const mapStateToProps = (state) => {
  return {
    language: state.user.language
  }
}

export default connect(mapStateToProps)(InputBox)