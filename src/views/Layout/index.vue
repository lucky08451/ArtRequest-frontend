<template>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <router-view />
  <LayoutFooter></LayoutFooter>
</template>

<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
const { checkToken } = useUsersStore()
onMounted(() => {
  checkToken()
})
</script>
