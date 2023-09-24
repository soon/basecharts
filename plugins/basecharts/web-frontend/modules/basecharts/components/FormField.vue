<template>
  <div>
    <label class="label">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['label'],
}
</script>

<style scoped>
.label {
  display: flex;
  margin-bottom: 4px;
}
</style>
