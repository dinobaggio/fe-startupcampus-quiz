<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const token = ref(null)

function logout() {
    localStorage.removeItem('token')
    router.push('login')
}

onMounted(() => {
    token.value = localStorage.getItem('token')
})
</script>

<template>
    <nav class="navbar navbar-light bg-light justify-content-between px-4">
        <router-link class="navbar-brand" :to="{ name: 'home' }">Home</router-link>
        <div v-if="!!token" class="logout" v-on:click="logout">
            Logout
        </div>
        <router-link v-else class="navbar-brand" :to="{ name: 'login' }">Login</router-link>
    </nav>
    <div class="container-app">
        <div class="app-quiz">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.logout {
    cursor: pointer;
}
</style>