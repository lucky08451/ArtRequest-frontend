<template>
  <div class="container mt-5">
    <h2 class="mb-4">我的委託管理</h2>
    <div class="row">
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCommissionsStore } from '@/stores/commissions'
import { useUsersStore } from '@/stores/users'
const commissionsStore = useCommissionsStore()
const usersStore = useUsersStore()
const { userData } = usersStore
const { fetchArtistCommissions } = commissionsStore
onMounted(() => {
  fetchArtistCommissions(userData.data.id)
  console.log('進入了')
  console.log(userData.data.id)
})
</script>

<style scoped>
/* 可選樣式 */
</style>
