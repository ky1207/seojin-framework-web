<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      {{ $t('components.modal.00001') }}
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="list">
        {{ $t('components.modal.00002') }}
      </button>
      <button class="btn-blue-bg" @click="confirm">
        {{ $t('components.modal.00003') }}
      </button>
      <button class="btn-gray-bg" @click="close">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
    <template #default>
      <SJSearchOneLayout disabled-navigator>
        <template #default>
          <SJSearchField :label="$t('components.modal.00005')">
            <SJSelect
              id="search_department"
              v-model="search.deptId"
              :name="$t('components.modal.00005')"
              :options="common.DEPARTMENT"
              disabled-validation
            />
          </SJSearchField>
          <SJSearchField :label="$t('components.modal.00006')">
            <SJSelect
              id="commonCode"
              v-model="search.systemCodeType"
              name="$t('page.system.00017')"
              :options="common.CD_TYPE"
              item-text="val"
              item-value="subCode"
              disabled-validation
            />
          </SJSearchField>
          <SJSearchField :label="$t('components.modal.00007')">
            <SJInput id="search_userName" v-model="search.userName" :name="$t('components.modal.00007')" type="text" disabled-validation />
          </SJSearchField>
        </template>
        <template #body>
          <SJGrid
            ref="grid"
            v-model="gridProps.data"
            :columns="gridProps.columns"
            :options="gridProps.options"
          />
        </template>
      </SJSearchOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      common: {},
      search: {},
      gridProps: {
        data: {},
        columns: [
          {
            name: 'loginId'
          },
          {
            name: 'userName'
          },
          {
            name: 'deptName'
          },
          {
            name: 'pos'
          },
          {
            name: 'email'
          }
        ],
        options: {
          rowHeaders: ['rowNum', 'checkbox'],
          bodyHeight: 450
        }
      },
      resolve: null,
      reject: null
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
    open () {
      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    async list () {
      this.search.useFlag = true
      const result = await this.$api.system.user.list(this.search)
      this.gridProps.data = result.data
    },
    confirm () {
      const data = this.$refs.grid.invoke('getCheckedRows')
      this.resolve(data)
      this.$refs.modal.hide()
    },
    close () {
      this.$refs.modal.hide()
      this.resolve([]) // response의 응답
    }
  }
}
</script>
