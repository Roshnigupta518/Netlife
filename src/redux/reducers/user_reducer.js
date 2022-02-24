const initialState = {
    isLoading: false,
    Tokenid: '',
    userdata: {},
    language: false,
    status: false,
}
import { checkLanguageLTR } from '../../utils/globalMethods';

export default user = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            let language = checkLanguageLTR(action.payload.language)
            return {
                ...state,
                userdata: action.payload,
                status: action.payload.blocked.status,
                language: language,
            };
        case 'LANGUAGE_UPDATE':
            let language1 = checkLanguageLTR(action.payload)
            return {
                ...state,
                language: language1,
            };

        default:
            return state
    }
};
