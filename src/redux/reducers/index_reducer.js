import { combineReducers } from 'redux';
import auth from './auth_reducer';
import project from './projects_reducer';
import cpanel from './cpanel_reducer';
import alarmReducer from './alarmReducer';
import today_alarmReducer from './todayAlarmReducer';

export default combineReducers({
    auth,
    project,
    cpanel,
    alarmReducer,
    today_alarmReducer
});
