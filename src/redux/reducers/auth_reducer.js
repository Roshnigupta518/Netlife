const initialState = {
    id: null,
    token: null,
    userdata: null,
}

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AUTH':
            return {
                id: action.payload.user?.id,
                token: action.payload.token,
                userdata: action.payload.user,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                id: action.payload?.id,
                userdata: action.payload,
            };

        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.payload.token,
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
