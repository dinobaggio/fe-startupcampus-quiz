<script setup>
import { useRouter } from 'vue-router';
import Home from '../components/Home.vue'
import topicService from '../services/topicService'
import { onMounted, ref } from 'vue';
import handleApiError from '../libs/handleApiError';
import Layout from '../components/layouts/Layout.vue'

const router = useRouter()
const loading = ref(true)
const topics = ref([])

async function fetchDataTopic() {
    try {
        const data = await topicService.getTopics()
        loading.value = false
        topics.value = data.data.data.data
    } catch (err) {
        handleApiError(err, router)
    }
}

onMounted(() => {
    fetchDataTopic()
})

</script>

<template>
    <Layout>
        <div v-if="loading === false">
            <Home msg="Topic" />
            <div v-for="(item, index) of topics" class="bg-light p-2 mt-4 rounded d-flex justify-content-between align-items-center gap-4">
                <div>
                    <div v-if="item.lock === 1" class="rounded-circle btn btn-secondary font-weight-bold">{{ index+1 }}</div> 
                    <div v-else-if="item.lesson_total === item.user_lesson.length && item.lesson_total !== 0" class="rounded-circle btn btn-success font-weight-bold">{{ index+1 }}</div> 
                    <div v-else class="rounded-circle btn btn-primary font-weight-bold">{{ index+1 }}</div> 
                </div>
                <div>
                    <div v-if="item.lock === 1">Topic: {{ item.name }}</div>
                    <router-link v-else :to="{ name: 'topic.detail', params: { id: item.id } }">Topic: {{ item.name }} </router-link>
                </div>
                <div>
                    <div v-if="item.lock === 1" class="rounded-circle btn btn-secondary" title="Belum bisa"><i class="fa fa-lock" aria-hidden="true"></i></div>
                    <div v-else-if="item.lesson_total === item.user_lesson.length && item.lesson_total !== 0" class="rounded-circle btn btn-success" title="Anda sudah menyelesaikan topic ini"><i class="fa fa-check" aria-hidden="true"></i></div>
                    <div v-else class="rounded-circle btn btn-primary" title="Play untuk memulai"><i class="fa fa-play" aria-hidden="true"></i></div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped></style>
