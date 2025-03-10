<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <div class="input-group mb-3">
          <span class="input-group-text">代辦事項</span>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入代辦事項"
            v-model="newtodo"
            @keyup.enter="addtodo"
          />
          <button class="btn btn-primary" @click="addtodo">新增</button>
        </div>
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  aria-current="page"
                  :class="{ active: visibility == 'all' }"
                  @click="visibility = 'all'"
                  >全部</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  :class="{ active: visibility == 'active' }"
                  @click="visibility = 'active'"
                  >進行中</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  :class="{ active: visibility == 'completed' }"
                  @click="visibility = 'completed'"
                  >已完成</a
                >
              </li>
            </ul>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(item, key) in filtertodo"
                :key="item.id"
              >
                <div
                  class="d-flex justify-content-between"
                  v-if="item.id != cacaheItem.id"
                >
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value=""
                      :id="key"
                      v-model="item.completed"
                    />
                    <label
                      :for="key"
                      class="form-check-label"
                      :class="{ completed: item.completed }"
                      @dblclick="edittodo(item)"
                      >{{ item.title }}</label
                    >
                  </div>
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    @click="removetodo(item)"
                  ></button>
                </div>
                <input
                  type="text"
                  class="form-control"
                  v-if="item.id == cacaheItem.id"
                  v-model="cacheTitle"
                  @keyup.enter="donetodo(item)"
                  @keyup.esc="canceltodo"
                />
              </li>
            </ul>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <span
              >還有<span class="h3 fw-900" style="color: rgb(63, 66, 236)">{{
                countactive
              }}</span
              >筆任務未完成</span
            >
            <a href="#" class="text-decoration-none" @click="destory"
              >清除所有任務</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue"
const newtodo = ref("")
const visibility = ref("all") // all, active, completed
const cacheTitle = ref("")
const cacaheItem = ref([])
const todos = ref([
  {
    id: "001",
    title: "購物",
    completed: false,
  },
  {
    id: "002",
    title: "運動",
    completed: false,
  },
  {
    id: "003",
    title: "讀書",
    completed: false,
  },
])
const addtodo = () => {
  const timestamp = Date.now()
  const mytitle = newtodo.value.trim()
  if (!mytitle) {
    return
  }
  todos.value.push({
    id: timestamp,
    title: mytitle,
    completed: false,
  })
  newtodo.value = ""
}
const removetodo = (todo) => {
  const newIndex = todos.value.findIndex((item) => {
    return item.id === todo.id
  })
  todos.value.splice(newIndex, 1)
}
const edittodo = (todo) => {
  cacheTitle.value = todo.title
  cacaheItem.value = todo
}
const donetodo = (item) => {
  item.title = cacheTitle.value
  cacaheItem.value = []
  cacheTitle.value = ""
}
const canceltodo = () => {
  cacaheItem.value = []
  cacheTitle.value = ""
}
const destory = () => {
  todos.value = []
}
const filtertodo = computed(() => {
  if (visibility.value === "all") {
    return todos.value
  } else if (visibility.value === "active") {
    const activetodo = []
    todos.value.forEach((item) => {
      if (!item.completed) {
        activetodo.push(item)
      }
    })
    return activetodo
  } else if (visibility.value === "completed") {
    const completedtodo = []
    todos.value.forEach((item) => {
      if (item.completed) {
        completedtodo.push(item)
      }
    })
    return completedtodo
  }
  return []
})
const countactive = computed(() => {
  let active = 0
  todos.value.forEach((item) => {
    if (!item.completed) {
      active++
    }
  })
  return active
})
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #ccc;
}
</style>
