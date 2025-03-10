<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#20a0ff"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1" @click="handleClick">Home</el-menu-item>
    <el-menu-item index="2" @click="handleClick">About</el-menu-item>
    <el-menu-item index="3" @click="handleClick">UserList</el-menu-item>

    <!-- Dropdown Menu -->
    <el-sub-menu index="4">
      <template #title>More</template>
      <el-menu-item index="4-1">Contact</el-menu-item>
      <el-menu-item index="4-2">FAQ</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
