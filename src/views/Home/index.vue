<script setup>
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="md-8">
          <h1>歡迎來到 Art Request</h1>
          <p>這是一個線上藝術委託平台</p>
          <a
            class="btn btn-primary btn-sm"
            href="#"
            role="button"
            @click="counterStore.increment"
            >{{ counterStore.count }}</a
          >
          {{ counterStore.doubleCount }}
        </div>
      </div>
    </div>
  </div>
</template>
