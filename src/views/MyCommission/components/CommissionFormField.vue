<template>
  <div class="mb-3">
    <label class="form-label">{{ label }}</label>
    <input
      v-if="type === 'text' || type === 'number' || type === 'date'"
      :type="type"
      class="form-control"
      v-model="localValue"
      :placeholder="`請輸入${label}`"
      :required="isRequired"
    />
    <input
      v-else-if="type === 'file' || type === 'image'"
      :type="type"
      class="form-control"
      @change="handleFileChange"
      :required="isRequired"
    />
    <textarea
      v-else-if="type === 'textarea'"
      class="form-control"
      v-model="localValue"
      :placeholder="`請輸入${label}`"
      rows="3"
      :required="isRequired"
    />
    <div v-if="error" class="text-danger">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number, File], default: '' },
  error: { type: String, default: null },
  required: { type: Boolean, default: false }, // 新增 required prop，預設為 false
})

const emit = defineEmits(['update:modelValue'])
const localValue = ref(props.modelValue)

// 是否必填：直接使用 props.required
const isRequired = computed(() => props.required)

// 處理檔案上傳
const handleFileChange = (event) => {
  const file = event.target.files[0]
  localValue.value = file || ''
  emit('update:modelValue', localValue.value)
  console.log(file)
}

// 監聽 localValue 變化，更新父組件
watch(
  () => localValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
)

// 監聽 props.modelValue 變化，同步到 localValue
watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  },
  { immediate: true },
)
</script>
