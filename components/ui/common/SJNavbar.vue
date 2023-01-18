<template>
  <ul v-if="path.length>0" class="breadcrumb bc2x m-lg-1">
    <li v-for="p in path" :key="p">
      <div>{{ p }}</div>
    </li>
    <li>
      <div>{{ menu? menu.menuName:'' }}</div>
    </li>
  </ul>
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
