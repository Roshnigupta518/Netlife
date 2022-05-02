export const setTodayAlarm = (payload) => {
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
