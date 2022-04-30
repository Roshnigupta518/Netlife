export const setTodayAlarm = (payload) => {
  console.log(payload)
    return {
      type: 'SET_TODAY_ALARM',
     payload,
    };
  };
  
  export const clearTodayAlarm = () => {
    console.log('clear alarm-------------------')
    return {
      type: 'CLEAR_TODAY_ALARM',
      payload: {},
    };
  };