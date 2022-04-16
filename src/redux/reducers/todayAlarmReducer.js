const initialState = {
    today_alarm: {
      'alarm' : '',
      'makeid': ''
    },
  };
  
  const today_alarmReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TODAY_ALARM':
        console.log({action})
        return {
          today_alarm: action?.payload,
        };
  
      case 'CLEAR_TODAY_ALARM':
        return {
          today_alarm: null
        };
  
      default:
        return state;
    }
  };
  
  export default today_alarmReducer;