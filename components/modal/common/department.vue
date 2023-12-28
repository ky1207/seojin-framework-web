<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      {{ $t('components.modal.00005') }}
    </template>
    <template #button>
      <button class="btn-blue-bg" style="margin-right: 5px;" @click="confirm">
        {{ $t('components.modal.00003') }}
      </button>
      <button class="btn-gray-bg" @click="close">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #default>
          <SJGrid
            ref="grid"
            v-model="grid.data"
            :columns="grid.columns"
            :options="grid.options"
            disable-context
          />
        </template>
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      common: {},
      search: {},
      grid: {
        data: {},
        columns: [
          {
            name: 'deptName'
          },
          {
            name: 'deptCode'
          }
        ],
        options: {
          treeColumnOptions: {
            name: 'deptName'
          },
          rowHeaders: ['rowNum', 'checkbox'],
          draggable: true
        }
      }
    }
  },
  async created () {
    const result = await this.$api.common.getDepartmentIds()
    this.common = { DEPARTMENT: result.data }
    // 모달에서 그리드 사용시, 그리드를 모달 크기에 맞추기 위함.
    this.$nuxt.$on('modal.show', () => {
      this.$refs.grid.invoke('refreshLayout')
    })
  },
  beforeDestroy () {
    // 위의 이벤트를 삭제 한다. this.$nuxt.$on('modal.show')
    this.$nuxt.$off('modal.show')
  },
  methods: {
    async open () {
      this.search.useFlag = true
      try {
        const result = await this.$api.system.department.list(this.search)
        this.grid.data = result.data
      } catch (error) {}

      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    confirm () {
      const data = this.$refs.grid.invoke('getCheckedRows')
      this.resolve(data)
      this.$refs.modal.hide()
    },
    close () {
      this.$refs.modal.hide()
    }
  }
}
</script>
