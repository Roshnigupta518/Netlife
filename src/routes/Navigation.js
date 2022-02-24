import * as React from 'react';
import { Easing, Dimensions } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomDrawer from '../constants/Drawer'
import CustomBottomTab from '../constants/BottomTab'
// import CustomHeader from '../constants/Header'
import { connect } from 'react-redux'

import Login from '../screens/Login'
import Home from '../screens/Home'
import Profile from '../screens/Profile';
import Analytics from '../screens/Analytics';
import DailyStatus from '../screens/DailyStatus';
import ApproveDesign from '../screens/ApproveDesign';
import FAQ from '../screens/FAQ';
import Tools from '../screens/Tools';
import ToolsWeb from '../screens/ToolsWeb';
import GoogleAnalytic from '../screens/GoogleAnalytic';
import Settings from '../screens/Settings';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Payment from '../screens/Payment';
import Payment_webView from '../screens/Payment_webView';
import Payment_ThankYou from '../screens/Payment_ThankYou';
import Changepassword from '../screens/Changepassword';
import Blocked from '../screens/Blocked';
import Cloudflare from '../screens/Cloudflare';
import Message from '../screens/Message';
import Chat from '../screens/Chat';
// import Logout from '../screens/Logout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linera
  }
}

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // TransitionSpecs: { open: config, close: closeConfig }
      }}
      initialRouteName="Login"
    // headerMode="float"
    // headerMode="none"
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
function BlockStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // TransitionSpecs: { open: config, close: closeConfig }
      }}
      initialRouteName="Blocked"
    // headerMode="float"
    // headerMode="none"
    >
      <Stack.Screen name="Blocked" component={Blocked} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function myStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        TransitionSpecs: { open: config, close: closeConfig }
      }}
      headerMode="none"
      initialRouteName="Home1"
    >
      <Stack.Screen name="Home1" component={Home} />
      <Stack.Screen name="DailyStatus" component={DailyStatus} />
      <Stack.Screen name="ApproveDesign" component={ApproveDesign} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen name="Tools" component={Tools} />
      <Stack.Screen name="GoogleAnalytic" component={GoogleAnalytic} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Changepassword" component={Changepassword} />
      <Stack.Screen name="Cloudflare" component={Cloudflare} />
      <Stack.Screen name="Payment_ThankYou" component={Payment_ThankYou} />
      <Stack.Screen name="Message" component={Message} />

    </Stack.Navigator>
  );
}

const BottomTab = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
    >
      <Tab.Screen name="Home" component={myStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

function App(props) {
  let language = false
  // let language = props.language
  return (
    <NavigationContainer>
      {props.auth == '' ?
        <LoginStack />
        :
        props.status
          ? <BlockStack />
          : <Drawer.Navigator
            drawerContent={props =>
              <CustomDrawer {...props} />
            }
            drawerStyle={{
              backgroundColor: 'transparent',
            }}
            screenOptions={{
              drawerPosition: language ? "right" : 'left',
              drawerType: Dimensions.width >= 968 ? 'permanent' : 'front',
            }}
          // drawerBackgroundColor={'transparent'}
          >
            <Drawer.Screen name="Home" component={BottomTab} options={{ headerShown: false }} />
            <Drawer.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
            <Drawer.Screen name="ToolsWeb" component={ToolsWeb} options={{ headerShown: false }} />
            <Drawer.Screen name="Payment_webView" component={Payment_webView} options={{ headerShown: false }} />


          </Drawer.Navigator>
      }
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    language: state.user.language,
    status: state.user.status
  }
}


export default connect(mapStateToProps)(App);