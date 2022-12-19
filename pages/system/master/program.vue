<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template>
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
import { CustomCheckBoxRenderer } from '~/plugins/lib/grid/editor/CustomCheckBoxRenderer'

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
            name: 'progName',
            header: '프로그램명', // this.$t('page.code.column.001')
            editor: {
              type: 'text'
            },
            width: 150,
            validation: { required: true }
          },
          {
            name: 'progPath',
            header: '경로',
            editor: {
              type: 'text'
            },
            width: 300,
            validation: { required: true }
          },
          {
            name: 'authCheckFlag',
            header: '권한체크',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'inqryAuth',
            header: '조회',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'saveAuth',
            header: '저장',
            align: 'center',
            renderer: CustomCheckBoxRenderer,
            filter: null
          },
          {
            name: 'excelAuth',
            header: '엑셀',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'delAuth',
            header: '삭제',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn1Auth',
            header: 'FN1',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn2Auth',
            header: 'FN2',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn3Auth',
            header: 'FN3',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn4Auth',
            header: 'FN4',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn5Auth',
            header: 'FN5',
            renderer: CustomCheckBoxRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'remark',
            header: '비고',
            filter: null,
            editor: {
              type: 'text'
            },
            width: 300
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
