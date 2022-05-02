import axios from "axios"
import API from "./API"
import AsyncStorage from '@react-native-async-storage/async-storage';

class Global {

    static USER_TOKEN_DETAIL = { auth: '', id: '' }

    static getRequest(url) {
        return new Promise(async resolve => {
            const token = await this.getData(API.AUTH_KEY)
            axios.get(API.BASE_URL + url, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
                .then((res) => {
                    // console.log(res, 'res')
                    resolve(res)
                })
                .catch((err) => {
                    // console.log('err', err.response)
                    resolve(err.response)
                })
        })
    }



    static postRequest(url, data) {
        return new Promise(async resolve => {
            const token = await this.getData(API.AUTH_KEY)
            axios.post(API.BASE_URL + url, data, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    console.log('err', err)
                    console.log('err', err.response)
                    resolve(err.response)
                })
        })
    }

    static deleteRequest(url) {
        return new Promise(async resolve => {
            const token = await this.getData(API.AUTH_KEY)
            console.log(API.BASE_URL + url)
            axios.delete(API.BASE_URL + url, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
                .then((res) => {
                    // console.log(res, 'res')
                    resolve(res)
                })
                .catch((err) => {
                    // console.log('err', err)
                    // console.log('err', err.response)
                    resolve(err.response)
                })
        })
    }

    static async saveData(key, data) {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem(key, jsonValue)
    }

    static async getData(key) {
        return await new Promise(async (resolve) => {
            const jsonValue = await AsyncStorage.getItem(key)
            var data = jsonValue != null ? JSON.parse(jsonValue) : null;

            resolve(data)
        })
    }
    static removeData(key) {
        AsyncStorage.removeItem(key);
        console.log("DELTED")
    }


}
export default Global