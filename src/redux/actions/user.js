import API from "../../constants/API"
import G from "../../constants/Global"

export const get_user = (token) => {
    return (dispatch) => {
        G.getRequest(API.USER_DATA, token)
            .then((res) => {
                // console.log(res.data)
                // console.log(res.status, 'get_user')
                if (res.status == 200) {
                    dispatch({ type: 'GET_USER', payload: res.data })
                }
            })
    }
}
export const languageupdate = (payload) => {
    return {
        type: 'LANGUAGE_UPDATE',
        payload
    }
}

export const saveToken = (key, token) => {
    return (dispatch) => {
        let data = {
            field_name: "device_id",
            field_value: key
        }
        G.postRequest(API.GOOGLE_ANALYTIC, data, token)
        // .then((res) => {
        // console.log(res.status, 'USER_UPDATE status')
        // console.log(res.data, 'USER_UPDATE')
        // })
    }
}