import React from 'react'
import { View, TouchableOpacity, Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import st from "./style";
import {
    HomeFill,
    LeadsFill,
    BellFill,

    BellOutline,
    HomeOutline,
    LeadsOutline,
} from './svgIcons';

function CustomBottomTab({ state, descriptors, navigation }) {

    return (
        <Animatable.View animation="fadeInUp" delay={200}>
            <View style={{
                height: 65,
                flexDirection: 'row',
                marginHorizontal: 16,
                marginBottom: -2,
                borderWidth: 0.5,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderColor: "#c62910",
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',

                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let iconName;

                    if (route.name === 'Home') {
                        iconName = isFocused ? <HomeFill width="25" height="25" /> : <HomeOutline width="25" height="25" />
                    } else if (route.name === 'Pratica') {
                        iconName = isFocused ? <LeadsFill width="35" height="35" /> : <LeadsOutline width="35" height="35" />
                    } else if (route.name === 'Notification') {
                        iconName = isFocused ? <BellFill width="25" height="25" /> : <BellOutline width="25" height="25" />
                    } else if (route.name === 'Alarm') {
                        iconName = isFocused ? <BellFill width="25" height="25" /> : <BellOutline width="25" height="25" />
                    }


                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            // onLongPress={onLongPress}
                            style={{ flex: 1, alignItems: "center" }}
                        >
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                {iconName}
                                <Text style={[st.tx12, st.mT4, st.txAlignC]}>{route.name}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Animatable.View>
    );
}


export default CustomBottomTab

