<template>
  <div class="navi">
    <i class="navi-icon active fa-solid fa-star" />
    <template v-for="(p,index) in path">
      <div :key="index" class="navi-link">
        {{ p }}
      </div>
      <i :key="'i'+index" class="navi-icon fa-solid fa-chevron-right" />
    </template>
    <div class="navi-link">
      {{ menu? menu.menuName:'' }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: null,
      path: []
    }
  },
  created () {
    this.menu = this.$store.getters.getMenu(this.$store.getters.getCurrentUrl())
    if (this.menu) { this.path = this.$store.getters.getSearchPath(this.menu.upperMenuId) }
  }
}
</script>
