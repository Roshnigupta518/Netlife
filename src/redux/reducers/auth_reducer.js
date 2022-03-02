const initialState = {
    id: null,
    token: null,
}

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AUTH':
            return {
                id: "action.payload._id",
                token: "action.payload.access_token",
            };
        case 'DESTORY_AUTH':
            return {
                id: null,
                token: null,
            };

        default:
            return state
    }
};
