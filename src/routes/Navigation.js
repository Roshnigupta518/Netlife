import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import CustomBottomTab from '../constants/CustomBottomTab'

import SignUp from '../screens/SignUp'
import Signin from '../screens/Signin'
import Blocked from '../screens/Blocked'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import Home from '../screens/Home'
import Notification from '../screens/Notification'
import ThankYou from '../screens/ThankYou'
import Pratica from '../screens/Pratica'
import DayMadication from '../screens/DayMadication'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function BlockStack() {
  return (
    <Stack.Navigator
      initialRouteName="Blocked"
    >
      <Stack.Screen name="Blocked" component={Blocked} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ThankYou" component={ThankYou} />
    </Stack.Navigator>
  );
}

function PraticaStack() {
  return (
    <Stack.Navigator
      initialRouteName="Pratica"
    >
      <Stack.Screen name="Pratica" component={Pratica} />
      <Stack.Screen name="DayMadication" component={DayMadication} />
      <Stack.Screen name="ThankYou" component={ThankYou} />
    </Stack.Navigator>
  );
}

function App(props) {
  return (
    <NavigationContainer>

      {props.token === null ? <LoginStack />
        : props.is_blocked
          ? <BlockStack />
          : <Tab.Navigator
            tabBar={props => <CustomBottomTab {...props} />}
          >
            <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            <Stack.Screen name="Pratica" component={PraticaStack} options={{ headerShown: false }} />
            <Tab.Screen name="Notification" component={Notification} />
            {/* <Stack.Screen name="Menu" component={MenuList} /> */}
          </Tab.Navigator>


      }

    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    is_blocked: state.auth.userdata?.is_blocked,
  }
}


export default connect(mapStateToProps)(App);