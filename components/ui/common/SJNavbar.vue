<template>
  <nav>
    <ol class="mt-3 m-lg-2 breadcrumb">
      <li v-for="p in path" :key="p" class="breadcrumb-item">
        {{ p }}
      </li>
      <li class="breadcrumb-item active">
        {{ menu? menu.menuName:'' }}
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    menu () {
      return this.$store.getters.getCurrentMenu(this.$route.path)
    },
    path () {
      if (this.menu) {
        return this.$store.getters.getSearchPath(this.menu.upperMenuId)
      }
      return ''
    }
  }

}
</script>
