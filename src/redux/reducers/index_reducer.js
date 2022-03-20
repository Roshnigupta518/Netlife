import { combineReducers } from 'redux';
import auth from './auth_reducer';
import project from './projects_reducer';
import cpanel from './cpanel_reducer';

export default combineReducers({
    auth,
    project,
    cpanel,
});
