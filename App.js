import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { View, Platform, StatusBar, } from "react-native";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import SplashScreen from 'react-native-splash-screen'
import Navigation from './src/routes/Navigation'
import index_reducer from './src/redux/reducers/index_reducer'
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'observeNow',
  storage: AsyncStorage,
  whitelist: ['today_alarmReducer']
};

const persistedReducer = persistReducer(persistConfig, index_reducer);

const mystore = createStore(
  persistedReducer,
  applyMiddleware(thunk)
)

const persistor = persistStore(mystore);

export { mystore, persistor };


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // console.disableYellowBox = true;
    setTimeout(() => {
      SplashScreen.hide();
    }, 400);
  }

  render() {
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;
    return (
      <Provider store={mystore} style={{ flex: 1 }}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: "#c62910" }}>
            <StatusBar translucent backgroundColor={'#c62910'} />
          </View>

          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
