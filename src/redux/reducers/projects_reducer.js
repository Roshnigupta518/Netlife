const initialState = {
    Loading: true,
    projectdata: [],
    dailyStatus: [],
    myTasksLoading: true,
    myTasksData: [],
    approveDesign: [],
    approveDesignLoading: true
}

export default project = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PROJECTS':
            let temp = []
            if (action.payload.tasks.length > 0) {
                action.payload.tasks.forEach(v => {
                    v.selected = false
                    temp.push(v)
                })
            }
            return {
                ...state,
                projectdata: action.payload,
                dailyStatus: temp,
                Loading: false
            };
        case 'GET_MYTASKS':
            return {
                ...state,
                myTasksData: action.payload,
                myTasksLoading: false
            };
        case 'GET_DESGINS':
            return {
                ...state,
                approveDesign: action.payload,
                approveDesignLoading: false
            };
        case 'APPROVE_DESGIN_REDUX':
            let temp1 = []
            state.approveDesign.forEach(value => {
                if (action.payload.id === value.id) {
                    value.approved = action.payload.approved
                    temp1.push(value)
                }
                else temp1.push(value)
            })
            return {
                ...state,
                approveDesign: temp1,
            };

        default:
            return state
    }
};
