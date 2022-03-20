const initialState = {
    id: null,
    token: null,
    userdata: null,
    userStatus: true,
}

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AUTH':
            return {
                id: action.payload?._id,
                token: action.payload.token,
                userdata: action.payload,
            };
        case 'DESTORY_AUTH':
            return {
                id: null,
                token: null,
                userdata: null,
            };

        default:
            return state
    }
};
