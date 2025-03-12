<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userListData.data" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.role }}</td>
          <td>
            <router-link class="btn btn-primary btn-sm" :to="`/admin/edit/${item.id}`">
              修改
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
const { getUserList } = useUsersStore()
const { userListData } = storeToRefs(useUsersStore())
onMounted(() => {
  getUserList()
})
console.log(userListData)
</script>

<style scoped></style>
