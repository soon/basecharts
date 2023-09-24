<template>
  <div
    v-if="open"
    ref="modalWrapper"
    class="modal__wrapper modal"
    @click="outside($event)"
  >
    <div class="modal-content">
      <slot></slot>
      <a v-if="closeButton && canClose" class="modal__close" @click="hide()">
        <i class="fas fa-times"></i>
      </a>
    </div>
  </div>
</template>

<script>
import baseModal from '@baserow/modules/core/mixins/baseModal'

export default {
  name: 'Modal',
  mixins: [baseModal],
  props: {
    closeButton: {
      type: Boolean,
      default: true,
      required: false,
    },
    canClose: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
}
</script>

<style scoped>
.modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(81, 82, 88, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  position: relative;
  width: 1000px;
}
</style>
