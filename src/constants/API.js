class API {

    static BASE_URL = 'https://fk.alphacoder.com.pk/api/'

    static IMAGE_URL_ADMIN = ''
    static IMAGE_URL = 'https://fk.alphacoder.com.pk/storage/'
    static AUTH_KEY = 'SKuihC&IUHSBAH(A'

    static TOKEN = ""

    static LOGIN = 'auth/login' //post
    static REGISTER = 'auth/register' //post
    static GET_USER = 'auth/user' //get
    static USER_UPDATE = 'auth/update-profile' //get

    static GET_PRATICA = 'pratica' //POST
    static UPDATE_PRATICA = 'pratica/update/' //POST ID
    static STORE_PRATICA = 'pratica/store' //POST ID

    static GET_NOTIFICATION = 'notifications' //POST ID

}


export default API