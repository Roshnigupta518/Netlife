import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp'
import Signin from '../screens/Signin'
import Blocked from '../screens/Blocked'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import Home from '../screens/Home'
import Notification from '../screens/Notification'
import ThankYou from '../screens/ThankYou'
import TimerScreen from '../screens/TimerScreen'


const Stack = createNativeStackNavigator();


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
      initialRouteName="Signin"
    >
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ThankYou" component={ThankYou} />
      <Stack.Screen name="TimerScreen" component={TimerScreen} />
    </Stack.Navigator>
  );
}


function App(props) {
  return (
    <NavigationContainer>

      {props.auth == '' ?
        <LoginStack />
        :
        props.status
          ? <BlockStack />
          : <HomeStack />
      }

      {/* 
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'SignUp' }} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

export default App;