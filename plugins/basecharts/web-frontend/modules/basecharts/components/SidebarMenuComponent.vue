<template>
  <li
    class="tree__item"
    :class="{
      active: $route.matched.some(({ name }) => name === 'chartsDashboard'),
    }"
  >
    <div class="tree__action sidebar__action">
      <nuxt-link :to="{ name: 'chartsDashboard' }" class="tree__link">
        <div>
          <i class="tree__icon fas fa-chart-bar"></i>
          <span class="sidebar__item-name">Charts</span>
        </div>
      </nuxt-link>
    </div>
  </li>
</template>

<script>
export default {}
</script>
