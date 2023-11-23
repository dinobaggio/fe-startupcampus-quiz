<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Home from '../../../components/Home.vue';
import { onMounted, ref } from 'vue';
import handleApiError from '../../../libs/handleApiError';
import lessonService from '../../../services/lessonService';
import Layout from '../../../components/layouts/Layout.vue';
import questionService from '../../../services/questionService';

const TAB = {
    QUESTION: 'question',
    SUCCESS: 'success'
}

const route = useRoute()
const router = useRouter()
const choices = ref([])
const questions = ref([])
const currentIndex = ref(0)
const currentQuestions = ref({})
const loading = ref(true)
const tab = ref(TAB.QUESTION) // question, success
const targetPoint = ref(0)
const userPoint = ref(0)

function changeQuestion(index) {
    currentQuestions.value = questions.value[index]
    choices.value = questions.value[index].choices
}

function nextQuestion() {
    const arrQuestions = questions.value
    let nextIndex = currentIndex.value
    nextIndex++
    if (Array.isArray(arrQuestions) && nextIndex >= arrQuestions.length) {
        nextIndex = (arrQuestions.length - 1)
        currentIndex.value = nextIndex
        changeQuestion(nextIndex)
        return
    }
    currentIndex.value = nextIndex
    currentQuestions.value = arrQuestions[nextIndex]
    changeQuestion(nextIndex)
}

function previousQuestion() {
    const arrQuestions = questions.value
    let nextIndex = currentIndex.value
    nextIndex--
    if (Array.isArray(arrQuestions) && nextIndex <= 0) {
        nextIndex = 0
        currentIndex.value = nextIndex
        changeQuestion(nextIndex)
        return
    }
    currentIndex.value = nextIndex
    currentQuestions.value = arrQuestions[nextIndex]
    changeQuestion(nextIndex)
}

function clickChoice(indexChoice) {
    const arrQuestion = questions.value
    const index = currentIndex.value
    arrQuestion[index].indexChoice = indexChoice

    questions.value = arrQuestion
}

async function submit() {
    const arrQuestions = questions.value
    const point = 100 / arrQuestions.length
    let currentPoint = 0
    arrQuestions.forEach(item => {
        const { choices, indexChoice } = item
        if (choices[indexChoice] !== undefined && choices[indexChoice].correct === 1) {
            currentPoint += point
        }
    })

    userPoint.value = currentPoint
    await postSubmit()
    tab.value = TAB.SUCCESS
}

function changeTab(value) {
    tab.value = value
}

async function fetchDetailLesson() {
    try {
        const res = await lessonService.getDetailLesson(route.params.id)
        const { questions: resQuestions, kkm } = res.data.data
        questions.value = resQuestions
        currentQuestions.value = resQuestions[currentIndex.value]
        choices.value = resQuestions[currentIndex.value].choices
        targetPoint.value = kkm

        loading.value = false
    } catch (err) {
        handleApiError(err, router)
    }
}

async function postSubmit() {
    try {
        const res = await questionService.postSubmit({
            lesson_id: route.params.id,
            topic_id: route.params.topicId,
            point: userPoint.value
        })

        alert("success")
    } catch(err) {
        handleApiError(err, router)
    }
}

onMounted(() => {
    fetchDetailLesson()
})

</script>

<template>
    <Layout>
        <div v-if="loading === false">
            <div v-if="tab === TAB.QUESTION">
                <Home msg="Quiz" />
                <div class="bg-light rounded p-2">
                    {{ currentQuestions?.content }}
                </div>

                <div 
                    v-for="(item, index) of choices" 
                    :class="`bg-light rounded p-2 mt-4 d-flex align-items-center gap-4 item-choice${(currentQuestions?.indexChoice === index) ? ' active' : ''}`"
                    v-on:click="() => clickChoice(index)"
                >
                    <div class="rounded bg-primary p-2 text-white">{{ index + 1 }}</div>
                    <div>{{ item.content }}</div>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-3 bg-light rounded p-2">
                    <button :disabled="currentIndex === 0" v-on:click="previousQuestion" class="btn btn-primary rounded text-white p-1"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                    <button 
                        v-if="currentIndex === (questions.length - 1)" 
                        class="btn btn-primary rounded text-white p-1"
                        v-on:click="submit"
                    >SUBMIT</button>
                    <button v-if="currentIndex < (questions.length - 1)" v-on:click="nextQuestion" class="btn btn-primary rounded text-white p-1"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                </div>
            </div>

            <div v-if="tab === TAB.SUCCESS">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="bg-primary rounded-circle p-3 text-white" style="font-size: 30px;">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="mt-4">
                    <h3 class="text-primary"><b>Selamat</b></h3>
                </div>
                <div>
                    Test kamu sudah selesai
                </div>
                <div v-if="userPoint >= targetPoint" class="text-success">
                    Kamu memenuhi nilai KKM
                </div>
                <div v-else class="text-danger">
                    Kamu belum memenuhi nilai KKM
                </div>
                <div class="progress mt-3 bg-light">
                    <div class="progress-bar bg-info" role="progressbar" :style="`width: ${targetPoint}%;`" :aria-valuenow="targetPoint" aria-valuemin="0" aria-valuemax="100">{{ targetPoint }}%</div>
                    <div class="progress-bar" role="progressbar" :style="`width: ${userPoint}%;`" :aria-valuenow="userPoint" aria-valuemin="0" aria-valuemax="100">{{ userPoint }}%</div>
                </div>
                <button 
                    class="btn btn-primary rounded text-white p-1 mt-3"
                    v-on:click="() => changeTab(TAB.QUESTION)"
                >Kembali</button>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
.item-choice:hover, .active {
    outline: 4px solid cyan;
    cursor: pointer;
}
</style>
