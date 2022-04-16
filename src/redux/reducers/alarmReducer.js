const initialState = {
  alarms: [],
};

const alarmReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ALARM':
      const payload = action.payload;
      return {
        alarms: payload,
      };

    case 'DELETE_ALARM':
      return {
        ...state,
        alarms: state.alarms.filter(v => {
          return v.id !== action.payload;
        }),
      };

    default:
      return state;
  }
};

export default alarmReducer;