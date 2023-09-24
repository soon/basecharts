<template>
  <div class="container">
    <div class="chart">
      <slot name="chart"></slot>
    </div>
    <div class="form">
      <slot name="form"></slot>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: space-between;
}

.chart {
  flex: 2;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  flex: 1;
  padding: 10px;
}
</style>
