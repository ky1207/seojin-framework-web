<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      {{ $t('components.modal.00001') }}
    </template>
    <template #button>
      <button type="button" class="btn btn-primary" @click="list">
        {{ $t('components.modal.00002') }}
      </button>
      <button type="button" class="btn btn-primary" @click="confirm">
        {{ $t('components.modal.00003') }}
      </button>
      <button type="button" class="btn btn-secondary" @click="close">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
    <template #default>
      <SJSearchOneLayout disabled-navigator>
        <template #default>
          <div class="d-flex align-items-center flex-wrap">
            <div class="col-md-1 text-center">
              {{ $t('components.modal.00005') }}
            </div>
            <div class="col-md-1">
              <SJSelect
                id="search_department"
                v-model="search.deptId"
                :name="$t('components.modal.00005')"
                :options="common.DEPARTMENT"
                disabled-validation
              />
            </div>
            <div class="col-md-1 text-center">
              {{ $t('components.modal.00006') }}
            </div>
            <div class="col-md-1">
              <SJInput id="search_loginId" v-model="search.loginId" :name="$t('components.modal.00006')" type="text" disabled-validation />
            </div>
            <div class="col-md-1 text-center">
              {{ $t('components.modal.00007') }}
            </div>
            <div class="col-md-1">
              <SJInput id="search_userName" v-model="search.userName" :name="$t('components.modal.00007')" type="text" disabled-validation />
            </div>
          </div>
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
    const result = await this.$api.common.getDepartmentCodes()
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
