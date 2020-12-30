import { combineReducers } from 'redux';
import alertReducer from './alert/alert.reducer';
import userReducer from './user/user.reducer';
export default combineReducers({
  alert: alertReducer,
  user: userReducer
});
