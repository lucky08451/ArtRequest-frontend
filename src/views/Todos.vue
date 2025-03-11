<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <div class="input-group mb-3">
          <span class="input-group-text">搜尋</span>
          <input
            type="text"
            class="form-control"
            placeholder="輸入搜尋的關鍵字"
            v-model="searchItem"
          />
        </div>
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
              <li class="list-group-item" v-for="(item, key) in filtertodo" :key="item.id">
                <div class="d-flex justify-content-between" v-if="item.id != cacaheItem.id">
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
              >還有<span class="h3 fw-900" style="color: rgb(63, 66, 236)">{{ countactive }}</span
              >筆任務未完成</span
            >
            <div>
              <a class="btn btn-primary btn-sm" href="#" role="button" @click="toggleAll"
                >全部標記為{{ allCompleted ? '未完成' : '已完成' }}
              </a>
              <a href="#" class="text-decoration-none" @click="destory">清除所有任務</a>
            </div>
          </div>
        </div>
        <div class="h4 mt-3">已完成進度條</div>
        <div class="progress mt-3">
          <div
            class="progress-bar"
            role="progressbar"
            aria-label="Basic example"
            :style="{ width: completedPercentage + '%' }"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {{ completedPercentage }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
const newtodo = ref('')
const visibility = ref('all') // all, active, completed
const cacheTitle = ref('')
const cacaheItem = ref([])
const todos = ref([
  {
    id: '001',
    title: '購物',
    completed: false,
  },
  {
    id: '002',
    title: '運動',
    completed: false,
  },
  {
    id: '003',
    title: '讀書',
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
  newtodo.value = ''
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
  cacheTitle.value = ''
}
const canceltodo = () => {
  cacheTitle.value = ''
  cacaheItem.value = []
}
const destory = () => {
  todos.value = []
}

/* const filtertodo = computed(() => {
  if (visibility.value === 'all') {
    return todos.value
  } else if (visibility.value === 'active') {
    const activetodo = []
    todos.value.forEach((item) => {
      if (!item.completed) {
        activetodo.push(item)
      }
    })
    return activetodo
  } else if (visibility.value === 'completed') {
    const completedtodo = []
    todos.value.forEach((item) => {
      if (item.completed) {
        completedtodo.push(item)
      }
    })
    return completedtodo
  }
  return []
}) */
const filtertodo = computed(() => {
  let filterdata = []
  if (visibility.value == 'all') {
    filterdata = todos.value
  } else if (visibility.value == 'active') {
    filterdata = todos.value.filter((item) => !item.completed)
  } else if (visibility.value == 'completed') {
    filterdata = todos.value.filter((item) => item.completed)
  }
  // 處理搜尋功能
  if (searchItem.value) {
    filterdata = filterdata.filter((item) =>
      item.title.toLowerCase().includes(searchItem.value.toLowerCase()),
    )
  }
  return filterdata
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
// 搜尋功能實現

const searchItem = ref('')

const toggleAll = () => {
  const newState = !allCompleted.value
  todos.value.forEach((item) => {
    item.completed = newState
  })
}

const allCompleted = computed(() => {
  return todos.value.every((item) => item.completed)
})
const completedPercentage = computed(() => {
  if (todos.value.length === 0) return 0
  const completedCount = todos.value.filter((item) => item.completed).length
  return Math.round((completedCount / todos.value.length) * 100)
})
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #ccc;
}
</style>
