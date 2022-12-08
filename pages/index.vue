
<template>
  <SJOneLayout>
    <template #master-btn>
      <SJPageButtons :action="{}" />
    </template>
    <template #title>
      게시판
    </template>
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
  </SJOneLayout>
</template>

<script>
import { ACTION } from '@/mixins'
export default {
  mixins: [ACTION],
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
    const result = await this.$api.sample.list()
    this.gridProps.data = result.data
  },
  methods: {
    async open () {
      alert('click')
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
    },
    _makeAction () {
      return {}
    }
  }
}
</script>

<style>
</style>
