import newAxios from ".";

async function getTopics() {
    return newAxios(true).get('/topics')
}

async function getTopicDetail(id) {
    return newAxios(true).get(`/topics/${id}`)
}

export default {
    getTopics,
    getTopicDetail
}