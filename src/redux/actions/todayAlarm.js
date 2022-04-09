export const setTodayAlarm = (payload) => {
  console.log(payload)
    return {
      type: 'SET_TODAY_ALARM',
     payload,
    };
  };
  
  export const clearTodayAlarm = () => {
    return {
      type: 'CLEAR_TODAY_ALARM',
      payload: {},
    };
  };