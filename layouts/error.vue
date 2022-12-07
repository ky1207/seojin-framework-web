<template>
  <div class="container">
    <div>
      <h1>error</h1>
    </div>
    <h1>
      {{ error.statusCode }}
    </h1>
    <h1>
      {{ error.message }}
    </h1>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
