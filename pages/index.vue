
<template>
  <SJOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #title>
      게시판
    </template>
    <template #default>
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
    </template>
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
      // }
    },
    change (lang) {
      this.$i18n.setLocale(lang)

      // iframe 사라짐
      window.location.reload()
    },
    ACTION_REGISTRY () {
      return {
        f1Label: 'S1 Label',
        f2Label: 'S2 Label',
        f3Label: 'S3 Label',
        f4Label: 'S4 Label',
        f5Label: 'S5 Label',
        f1Click: () => {
          this.$notify.success('A1 click')
        },
        f2Click: () => {
          this.$notify.info('A2 click')
        },
        f3Click: () => {
          this.$notify.warning('A3 click')
        },
        f4Click: () => {
          this.$notify.error('A click')
        },
        f5Click: () => {
          this.$notify.success('A5 click')
        },
        searchClick: () => {
          this.$notify.success('Search click')
        },
        saveClick: () => {
          this.$notify.success('Save click')
        },
        delClick: () => {
          this.$notify.success('Del click')
        }
      }
    }
  }
}
</script>

<style>
</style>
