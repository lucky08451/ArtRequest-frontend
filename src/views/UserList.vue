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
        <tr v-for="item in userList" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.role }}</td>
          <td>
            <a class="btn btn-primary btn-sm" href="#" role="button">修改</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"
// const isLogin = ref(false)
const userList = ref([])
onMounted(() => {
  getUserList()
})

const getUserList = async () => {
  await axios
    .get("/api/v1/user/", {}, { withCredentials: true })
    .then((res) => {
      if (res.data.status === true) {
        userList.value = res.data.data
      } else {
        window.Swal.fire({
          title: res.data.message,
          icon: "error",
          draggable: true,
        })
      }
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
      window.Swal.fire({
        title: "登入失敗",
        icon: "error",
        draggable: true,
      })
    })
}
</script>

<style scoped></style>
