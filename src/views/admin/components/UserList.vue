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
        <tr v-for="item in userListData" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.role }}</td>
          <td>
            <router-link
              class="btn btn-primary btn-sm"
              :to="{
                name: 'adminUserEdit',
                params: { id: item.id },
              }"
            >
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
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
const { getUserList } = useUsersStore()
const { userListData } = storeToRefs(useUsersStore())
onMounted(() => {
  getUserList()

  console.log('進入使用者名單')
  console.log(userListData)
})
console.log(userListData)
</script>

<style scoped></style>
