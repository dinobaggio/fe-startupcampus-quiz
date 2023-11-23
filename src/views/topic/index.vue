<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Home from '../../components/Home.vue'
import topicService from '../../services/topicService'
import { onMounted, ref } from 'vue';
import handleApiError from '../../libs/handleApiError'
import Layout from '../../components/layouts/Layout.vue'

const route = useRoute()
const router = useRouter()
const topic = ref(null)
const loading = ref(true)

async function fetchDetailTopic() {
  try {
    const res = await topicService.getTopicDetail(route.params.id)
    topic.value = res.data.data
    loading.value = false
  } catch (err) {
    handleApiError(err, router)
  }
}

onMounted(() => {
  fetchDetailTopic()
})
</script>

<template>
  <Layout>
    <div v-if="loading === false">
      <Home msg="Informasi" />
      <div class="bg-light rounded p-2">
          {{ topic?.description }}
      </div>
      <div class="mt-3" />
      <router-link :to="{ name: 'quiz.detail', params: { topicId: route.params.id, id: topic?.lessons[0]?.id || 0 } }" class="btn btn-primary">Continue</router-link>
    </div>
  </Layout>
</template>

<style scoped>
</style>
