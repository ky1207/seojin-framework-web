
<template>
  <SJSearchOneLayout disabled-search>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #bodyTitle>
      게시판
    </template>
    <template #body>
      <SJGrid
        ref="grid"
        v-model="gridProps.data"
        :columns="gridProps.columns"
        :options="gridProps.options"
        pageable
        @moveToGridPage="page"
      />
      <div>
        <button type="button" class="btn btn-primary" @click="success()">
          success
        </button>
        <button type="button" class="btn btn-primary" @click="info()">
          info
        </button>
        <button type="button" class="btn btn-primary" @click="warning()">
          warning
        </button>
        <button type="button" class="btn btn-primary" @click="error()">
          error
        </button>
        <button type="button" class="btn btn-primary" style="margin-right: 5px;" @click="open()">
          Launch demo modal
        </button>
        <button type="button" class="btn btn-primary" @click="write()">
          쓰기
        </button>
        <button type="button" class="btn btn-primary" @click="modalTest()">
          modal TEST
        </button>
        <div @click="doDownload(43)">
          파일 다운로드
        </div>
        <Im100 ref="testModal" />
        <SampleInsert ref="exampleModal" /> {{ $t('sample') }}
        <SampleWrite ref="writeModal" />
      </div>
    </template>
  </SJSearchOneLayout>
</template>

<script>
import { ACTION } from '@/mixins'
export default {
  name: 'Index',
  mixins: [ACTION],
  data () {
    return {
      test: 'test',
      modal: null,
      gridProps: {
        data: {},
        columns:
          [
            { name: 'id', header: 'ID', width: 100, filter: null, sortable: false },
            { name: 'title', filter: null, sortable: false },
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
    success () {
      this.$notify.success('success')
    },
    warning () {
      this.$notify.warning('warn')
    },
    error () {
      this.$notify.error('error')
    },
    info () {
      this.$notify.info('info')
    },
    doDownload (id) {
      this.$api.sample.download(id)
    },
    async page (e) {
      const result = await this.$api.sample.list(e.page)
      this.gridProps.data = result.data
    },
    async open () {
      const response = await this.$refs.exampleModal.open(this.test)
      //  if (response) {
      console.log(response)
      // }
    },
    async write () {
      const response = await this.$refs.writeModal.open()
      //  if (response) {
      console.log(response)
      // }
    },
    async modalTest () {
      const response = await this.$refs.testModal.open()
      //  if (response) {
      console.log(response)
      // }
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
