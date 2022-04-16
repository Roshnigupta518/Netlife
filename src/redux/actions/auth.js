import API from "../../constants/API"
import G from "../../constants/Global"

export const updateAuth = (payload) => {
    return {
        type: 'UPDATE_AUTH',
        payload
    }
}
export const updateToken = (payload) => {
    return {
        type: 'UPDATE_TOKEN',
        payload
    }
}
export const logoutUser = (payload) => {
    G.removeData(API.AUTH_KEY)
    return async (dispatch) => {
        dispatch({ type: 'DESTORY_AUTH' })
    }

}

export const getUserData = () => {
    return async (dispatch) => {
        G.getRequest(API.GET_USER)
            .then((res) => {
                console.log(res.data.data,'vvvvvvv')
                if (res.status === 200) dispatch({ type: 'UPDATE_USER', payload: res.data.data })
                else dispatch({ type: 'UPDATE_USER', payload: null })
            })
    }
}
