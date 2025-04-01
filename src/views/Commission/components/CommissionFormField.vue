<template>
  <div class="mb-3">
    <label class="form-label">{{ label }}</label>
    <input
      v-if="type === 'text' || type === 'number' || type === 'date'"
      :type="type"
      class="form-control"
      v-model="localValue"
      :placeholder="`請輸入${label}`"
      required
    />
    <input
      v-else-if="type === 'file' || type === 'image'"
      :type="type"
      class="form-control"
      @change="handleFileChange"
      required
    />
    <textarea
      v-else-if="type === 'textarea'"
      class="form-control"
      v-model="localValue"
      :placeholder="`請輸入${label}`"
      rows="3"
      required
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number, File], default: '' },
})

const emit = defineEmits(['update:modelValue'])
const localValue = ref(props.modelValue)

// 處理檔案上傳
const handleFileChange = (event) => {
  const file = event.target.files[0] // 取得第一個檔案
  localValue.value = file || '' // 如果沒有檔案則設為 null
  emit('update:modelValue', localValue.value) // 觸發更新
}

watch(
  () => localValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
)

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  },
  { immediate: true },
)
</script>
