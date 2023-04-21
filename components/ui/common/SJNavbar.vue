<template>
  <div class="navi">
    <i class="navi-icon active fa-solid fa-star" />
    <template v-for="p in path">
      <div :key="p" class="navi-link">
        {{ p }}
      </div>
      <i :key="p" class="navi-icon fa-solid fa-chevron-right" />
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
<style>

.breadcrumb.bc2x {
  font-size: 0.75em;
}

.breadcrumb p {
  margin: 0;
}

.breadcrumb li {
  display: inline-block;
}

.breadcrumb li div {
  background-color: #3f4d71;
  box-sizing: border-box;
  color: #fff;
  display: block;
  max-height: 2em;
  padding: .5em 1em .5em 1.5em;
  position: relative;
  text-decoration: none;
  transition: .25s;
}

.breadcrumb li div:before {
  border-top: 1em solid transparent;
  border-bottom: 1em solid transparent;
  border-left: 1em solid #fff;
  content: "";
  position: absolute;
  top: 0;
  right: -1.25em;
  z-index: 1;
}

.breadcrumb li div:after {
  border-top: 1em solid transparent;
  border-bottom: 1em solid transparent;
  border-left: 1em solid #3f4d71;
  content: "";
  position: absolute;
  top: 0;
  right: -1em;
  transition: .25s;
  z-index: 1;
}

.breadcrumb li:last-child div {
  background-color: #5A688D;
  pointer-events: none;
}

.breadcrumb li:last-child div:after {
  border-left-color: #5A688D;
}
</style>
