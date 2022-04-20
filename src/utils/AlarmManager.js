import React, { Component } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';

const { RNAlarmNotification } = NativeModules;
const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

class AlarmManager {
    _subscribeOpen;
    _subscribeDismiss;
    componentDidMount() {
        this._subscribeDismiss = RNEmitter.addListener(
            'OnNotificationDismissed',
            (data) => {
                const obj = JSON.parse(data);
                console.log(`notification id: ${obj.id} dismissed`);
                ReactNativeAN.removeFiredNotification(obj.id);
            },
        );

        this._subscribeOpen = RNEmitter.addListener(
            'OnNotificationOpened',
            (data) => {
                console.log(data);
                const obj = JSON.parse(data);
                console.log(`app opened by notification: ${obj.id}`);
                ReactNativeAN.removeFiredNotification(obj.id);
            },
        );

        // check ios permissions
        if (Platform.OS === 'ios') {
            this.showPermissions();

            ReactNativeAN.requestPermissions({
                alert: true,
                badge: true,
                sound: true,
            }).then(
                (data) => {
                    console.log('RnAlarmNotification.requestPermissions', data);
                },
                (data) => {
                    console.log('RnAlarmNotification.requestPermissions failed', data);
                },
            );
        }
    }

    componentWillUnmount() {
        this._subscribeDismiss.remove();
        this._subscribeOpen.remove();
    }

    showPermissions = () => {
        ReactNativeAN.checkPermissions((permissions) => {
            console.log(permissions);
        });
    };

}

export const alarmManager = new AlarmManager();