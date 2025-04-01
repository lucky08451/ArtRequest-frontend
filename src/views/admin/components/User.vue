<template>
  <div class="container">
    <div class="row">
      <div class="col-3 mb-3">
        <router-link to="/" class="btn btn-primary">回首頁</router-link>
      </div>
      <div class="col-3 mb-3">
        <router-link to="/admin/user/list" class="btn btn-primary me-3">用户列表</router-link>
      </div>
      <!-- <div class="col-3 mb-3">
        <router-link to="/admin/add" class="btn btn-primary">新增用戶</router-link>
      </div> -->
    </div>
  </div>
  <router-view />
</template>

<script setup>
</script>
