import API from "../../constants/API"
import G from "../../constants/Global"
import axios from "axios"

export const get_cpanel = (id, token) => {
    return (dispatch) => {
        axios.get(API.CPANEL_USER_DETAIL + id, {
            headers: {
                'Authorization': 'Bearer ' + token,
                "processData": false,
                'Content-Type': ' application/json',
                'X-Requested-With': ' XMLHttpRequest',
            }
        })
            .then((res) => {
                // console.log(res.status, 'CPANEL_DETAILS')
                // console.log(res.data.data, 'cpanel status1')
                if (res.status === 200) {
                    if (res.data.data !== null) {
                        // console.log(res.data.data[0].cpanel_username, 'res.data.data[0].cpanel_username')
                        dispatch({ type: 'CPANEL_DETAILS', payload: { details: res.data.data[0] } })

                        axios.get(API.CPANEL_DOMAIN_DETAIL + res.data.data[0].cpanel_username, {
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                "processData": false,
                                'Content-Type': ' application/json',
                                'X-Requested-With': ' XMLHttpRequest',
                            }
                        })
                            .then((res1) => {
                                // console.log(res1.status, 'CPANEL_DOMAIN')
                                // console.log(res1.data.data, 're1111111111')
                                if (res1.status === 200 && res1.data.data) {
                                    dispatch({ type: 'CPANEL_DOMAIN', payload: { domain: res1.data.data, } })
                                } else {
                                    dispatch({ type: 'CPANEL_DOMAIN_FALSE', })
                                }
                            })



                    } else {
                        dispatch({ type: 'CPANEL_DETAILS_FALSE', })
                    }
                } else {
                    dispatch({ type: 'CPANEL_DETAILS_FALSE', })
                }
            })
    }
}

export const get_Bandwidth = (username, token) => {
    return (dispatch) => {
        axios.get(API.CPANEL_DOMAIN_DETAIL + username, {
            headers: {
                'Authorization': 'Bearer ' + token,
                "processData": false,
                'Content-Type': ' application/json',
                'X-Requested-With': ' XMLHttpRequest',
            }
        })
            .then((res) => {
                // console.log(res.status, 'CPANEL_DOMAIN')
                // console.log(res.data.data, 're1111111111')
                if (res.status === 200 && res.data.data) {
                    dispatch({ type: 'CPANEL_DOMAIN', payload: { domain: res.data.data, } })
                } else {
                    dispatch({ type: 'CPANEL_DOMAIN_FALSE', })
                }
            })
    }
}

export const get_tools = (domain_name, cpanel_username, token) => {
    return (dispatch) => {
        axios.get(API.CPANEL_TOOLS + domain_name + '/' + cpanel_username,)
            .then((response) => {
                if (response.status === 200 && response.data.data.length > 0) {
                    // console.log(response.status, 'CPANEL_TOOLS')
                    // console.log(response.data.data, 'CPANEL_TOOLS')
                    dispatch({ type: 'TOOLS__', payload: response.data.data })
                } else {
                    dispatch({ type: 'TOOLS__FALSE', })
                }
            })
            .catch((err) => {
                console.log(err, 'err')
            })
    }
}
export const update_tools = (payload) => {
    return {
        type: 'TOOLS__',
        payload
    }
}