<template>
  <div class="spacer" :style="styleObject">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VerticalSpacer',
  props: {
    spacing: {
      type: String,
      default: '10px',
    },
  },
  computed: {
    styleObject() {
      return {
        '--spacing': this.spacing,
      }
    },
  },
}
</script>

<style scoped>
.spacer > *:not(:last-child) {
  margin-bottom: var(--spacing);
}
</style>
