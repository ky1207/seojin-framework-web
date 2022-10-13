
<template class="vtop-layout">
  <div>
    <SJGrid
      ref="grid"
      v-model="gridProps.data"
      :columns="gridProps.columns"
      :options="gridProps.options"
    />
    <div @click="change('en')">
      English
    </div>
    <div @click="change('ko')">
      한국어
    </div>
    <div @click="change('vi')">
      Vitenam
    </div><br>
  </div>
</template>

<script>
export default {
  auth: 'guest',

  data () {
    return {
      gridProps: {
        data: {},
        columns:
         [
           { name: 'title' },
           { name: 'insertDate' }
         ],
        options: {
        }
      }
    }
  },
  computed: {
    routeTab () {
      return {
        title: this.$t('sample'),
        closable: false
      }
    }
  },
  async mounted () {
    const result = await this.$axios.get('/api/v1.0/sample')
    this.gridProps.data = result.data
  },
  methods: {
    change (lang) {
      this.$i18n.setLocale(lang)

      // iframe 사라짐
      window.location.reload()
    }
  }
}
</script>

<style>
</style>
