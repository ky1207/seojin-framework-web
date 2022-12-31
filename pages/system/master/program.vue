<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 text-center">
          프로그램명
        </div>
        <div class="col-md-2">
          <SJInput id="search" v-model="search.progName" name="검색" type="text" disabled-validation />
        </div>
      </div>
    </template>
    <template #bodyTitle>
      <div class="row align-items-center">
        <div class="col">
          프로그램
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="appendRow">
            추가 <i class="bi bi-file-plus" />
          </button>
          <button class="btn btn-outline-dark" @click="removeRow">
            삭제 <i class="bi bi-file-minus" />
          </button>
        </div>
      </div>
    </template>
    <template #body>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>
  </SJSearchOneLayout>
</template>

<script>
// 메뉴 화면
// 기능권한버튼을 사용하는 경우
import { MENU, ACTION } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      search: {
        progName: ''
      },
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          {
            name: 'progName'
          },
          {
            name: 'progPath'
          },
          {
            name: 'authCheckFlag'
          },
          {
            name: 'inqryAuth'
          },
          {
            name: 'saveAuth'
          },
          {
            name: 'excelAuth'
          },
          {
            name: 'delAuth'
          },
          {
            name: 'fn1Auth'
          },
          {
            name: 'fn2Auth'
          },
          {
            name: 'fn3Auth'
          },
          {
            name: 'fn4Auth'
          },
          {
            name: 'fn5Auth'
          },
          {
            name: 'remark'
          }
        ]
      }
    }
  },
  methods: {
    appendRow () {
      this.$refs.grid.invoke('appendRow')
    },
    removeRow () {
      this.$refs.grid.invoke('removeCheckedRows', false)
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.system.program.list(this.search)
          this.grid.data = result.data
        },
        saveClick: async () => {
          const error = this.$refs.grid.invoke('validate')
          if (error.length > 0) {
            this.$notify.warning('Grid 입력값을 확인하세요.') // TODO:다국어 처리
            return false
          }
          const data = this.$refs.grid.invoke('getModifiedRows')
          await this.$api.system.program.update(data)
          this.$notify.success('처리되었습니다.') // TODO:다국어 처리
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
