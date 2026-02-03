<script setup lang="ts">
const props = defineProps<{ label: string, text: string }>();
</script>

<template>
  <section class="hint">
    <el-text class="mx-1 hint-label" size="large">{{ props.label }}: </el-text>
    <el-text class="mx-1 hint-text" size="large" type="warning">{{ props.text }}</el-text>
  </section>
</template>

<style lang="css" scoped>
.hint {
  display: flex;
  align-items: center;
  border-radius: 4px;
  max-width: max-content;
  flex-wrap: wrap;
  gap: 8px;
}

.hint-label {
  color: #000000DE;
  font-size: 18px;
}

.hint-text {
  color: #FF754C;
  font-size: 18px;
}
</style>
