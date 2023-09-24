<template>
  <fieldset class="fieldset">
    <div v-for="(item, index) in items" :key="index" class="item-wrapper">
      <div class="item">
        <slot :index="index" :item="item"></slot>
      </div>
      <div class="remove-button" @click="$emit('remove-item', index)">
        <i class="fas fa-fw fa-trash"></i>
      </div>
    </div>
    <Button class="add-button" type="button" @click="$emit('add-item')"
      >+</Button
    >
  </fieldset>
</template>

<script>
import Button from 'baserow/modules/core/components/Button.vue'

export default {
  components: {
    Button,
  },
  props: ['items'],
  emits: ['add-item'],
}
</script>

<style scoped>
.fieldset {
  border: 1px solid #b5b5b7;
  border-radius: 4px;
  padding: 8px 12px;
  padding-right: 8px;
}

.item-wrapper {
  display: flex;
  margin-bottom: 8px;
}

.item {
  flex-grow: 1;
}

.remove-button {
  color: #b5b5b7;
  cursor: pointer;
  align-self: center;
  padding: 8px;
  padding-right: 0;
}

.remove-button:hover {
  color: black;
}

.add-button {
  width: 100%;
}
</style>
