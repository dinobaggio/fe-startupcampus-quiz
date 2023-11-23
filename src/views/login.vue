<script setup>
import { onMounted, ref } from 'vue';
import authService from '../services/authService'
import { useRouter } from 'vue-router';
import Layout from '../components/layouts/Layout.vue'

const router = useRouter()
const email = ref("")
const password = ref("")
const loading = ref(true)

async function login() {
    try {
        const res = await authService.postLogin(email.value, password.value)
        localStorage.setItem('token', res.data.token)
        router.push('/')
    } catch (err) {
        alert('wrong email or password')
    }
}

onMounted(async () => {
    const token = localStorage.getItem("token")
    if (!!token) {
        await router.push("/")
    }

    loading.value = false
})
</script>

<template>
    <Layout>
        <div v-if="loading === false">
            <h1>Login</h1>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                        placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </Layout>
</template>

<style scoped></style>
