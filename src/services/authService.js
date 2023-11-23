import newAxios from ".";

async function postLogin(email, password) {
    return newAxios().post('/login', { email, password })
}

export default {
    postLogin
}