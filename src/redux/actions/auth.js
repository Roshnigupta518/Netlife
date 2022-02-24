export const auth = (payload) => {
    return {
        type: 'UPDATE_AUTH',
        payload
    }
}
export const destory = (payload) => {
    return {
        type: 'DESTORY_AUTH',
        payload
    }
}
export const zoneid = (payload) => {
    return {
        type: 'ZONE_ID',
        payload
    }
}
// export const auth = (payload) => {
//     return () => {
//         fetch('')
//     }
// } 