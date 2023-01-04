<template>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        {{ menu?menu.menuName:'' }}
      </li>
      <li class="breadcrumb-item active">
        Dashboard
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    menu () {
      return this.$store.getters.getCurrentMenu(this.$route.path)
    }
  }

}
</script>
