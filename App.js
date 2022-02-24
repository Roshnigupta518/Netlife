import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { View, Platform, StatusBar, } from "react-native";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import SplashScreen from 'react-native-splash-screen'
import Navigation from './src/routes/Navigation'
import index_reducer from './src/redux/reducers/index_reducer'

const mystore = createStore(index_reducer, applyMiddleware(thunk));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
    setTimeout(() => {
      SplashScreen.hide();
    }, 400);
  }

  render() {
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight;
    return (
      <Provider store={mystore} style={{ flex: 1 }}>
        <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: "#8e8fec" }}>
          <StatusBar translucent backgroundColor={'#8e8fec'} />
        </View>

        <Navigation />
      </Provider>
    );
  }
}
