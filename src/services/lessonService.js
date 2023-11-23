import newAxios from ".";

async function getDetailLesson(id) {
    return newAxios(true).get(`/lessons/${id}`)
}

export default {
    getDetailLesson
}