<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      사용자조회
    </template>
    <template #button>
      <button type="button" class="btn btn-primary" @click="list">
        조회
      </button>
      <button type="button" class="btn btn-primary" @click="confirm">
        확인
      </button>
      <button type="button" class="btn btn-secondary" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJSearchOneLayout disabled-navigator>
        <template #default>
          <div class="d-flex align-items-center flex-wrap">
            <div class="col-md-1 text-center">
              부서
            </div>
            <div class="col-md-1">
              <SJSelect
                id="search_department"
                v-model="search.deptId"
                name="부서"
                :options="common.DEPARTMENT"
                disabled-validation
              />
            </div>
            <div class="col-md-1 text-center">
              로그인아이디
            </div>
            <div class="col-md-1">
              <SJInput id="search_loginId" v-model="search.loginId" name="로그인아이디" type="text" disabled-validation />
            </div>
            <div class="col-md-1 text-center">
              사용자명
            </div>
            <div class="col-md-1">
              <SJInput id="search_userName" v-model="search.userName" name="사용자명" type="text" disabled-validation />
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
  name: 'User',
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

    this.$nuxt.$on('modal.show', () => {
      this.$refs.grid.invoke('refreshLayout')
    })
  },
  beforeDestroy () {
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
