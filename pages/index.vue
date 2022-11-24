
<template>
  <div>
    <div class="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li class="breadcrumb-item active">
            Dashboard
          </li>
        </ol>
      </nav>
    </div><!-- End Page Title -->
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
    <button type="button" class="btn btn-primary" @click="open()">
      Launch demo modal
    </button>
    <SampleInsert ref="exampleModal" /> {{ $t('sample') }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      test: 'test',
      modal: null,
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
    // context 이용시 ,meta 가 아닌 computed: routeTab() 이용해야함
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
    async open () {
      const response = await this.$refs.exampleModal.open(this.test)
      //  if (response) {
      console.log(response)
      alert(response)
      // }
    },
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
