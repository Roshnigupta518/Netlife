export const setTodayAlarm = (payload) => {
  return {
    type: 'SET_TODAY_ALARM',
    payload,
  };
};

export const clearTodayAlarm = () => {
  console.log('clear-----')
  return {
    type: 'CLEAR_TODAY_ALARM',
    payload: {},
  };
};
