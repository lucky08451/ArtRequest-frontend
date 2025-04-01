<!-- DynamicField.vue -->
<template>
  <div class="dynamic-field">
    <label>{{ layer2.layer2Name }}</label>
    <input
      v-if="layer2.types === 'R'"
      type="radio"
      :name="groupName"
      :value="layer2.layer2Id"
      v-model="inputValue"
    />
    <input
      v-if="layer2.types === 'C'"
      type="checkbox"
      :value="layer2.layer2Id"
      v-model="inputValue"
    />
    <input v-if="layer2.types === 'T'" type="text" v-model="inputValue" />
    <textarea v-if="layer2.types === 'X'" v-model="inputValue"></textarea>
    <input
      v-if="layer2.types === 'F'"
      type="file"
      @change="emit('file-upload', layer2.layer2Id, $event.target.files[0])"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  layer2: Object,
  groupName: String,
  modelValue: [String, Array, File],
})

const emit = defineEmits(['update:modelValue', 'file-upload'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped>
.dynamic-field {
  margin: 10px 0;
}
</style>
