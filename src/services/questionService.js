import newAxios from ".";

async function getQuestions() {
    return newAxios(true).get('/questions')
}

async function postSubmit(data) {
    return newAxios(true).post('/questions/submit', data)
}

export default {
    getQuestions,
    postSubmit,
}