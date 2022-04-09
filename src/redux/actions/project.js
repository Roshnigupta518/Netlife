import API from "../../constants/API"
import G from "../../constants/Global"

export const get_project = (id, token) => {
    return async (dispatch) => {
        const token = await G.getData(API.AUTH_KEY)
        G.getRequest(API.GET_PROJECTS + token.user._id, token.access_token)
            .then((res) => {
                if (res.status == 200) dispatch({ type: 'GET_PROJECTS', payload: res.data.data })
                else dispatch({ type: 'GET_PROJECTS', payload: [] })
            })
    }
}

export const myTasks = () => {
    return async (dispatch) => {
        const token = await G.getData(API.AUTH_KEY)
        G.getRequest(API.GET_MYTASKS, token.access_token)
            .then((res) => {
                if (res.status == 200) dispatch({ type: 'GET_MYTASKS', payload: res.data.data })
                else dispatch({ type: 'GET_MYTASKS', payload: [] })
            })
    }
}

export const getApproveDesign = () => {
    return async (dispatch) => {
        const token = await G.getData(API.AUTH_KEY)
        G.postRequest(API.GET_DESIGN, null, token.access_token)
            .then((res) => {
                if (res.status == 200) dispatch({ type: 'GET_DESGINS', payload: res.data.data })
                else dispatch({ type: 'GET_DESGINS', payload: [] })
            })
    }
}

export const ApproveDesignRedux = (payload) => {
    return {
        type: 'APPROVE_DESGIN_REDUX',
        payload
    }
}
