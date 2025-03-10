<template>
  <el-container>
    <el-header>
      <LayoutNav></LayoutNav>
      <LayoutHeader></LayoutHeader>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <LayoutFooter></LayoutFooter>
    </el-footer>
  </el-container>
</template>

<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
</script>
