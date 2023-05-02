<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00029')">
        <SJInput id="search" v-model="search.progName" :name="$t('page.system.00029')" disabled-validation />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle :title="$t('page.system.00034')">
        <button class="btn-white-bg" @click="appendRow">
          {{ $t('page.system.00026') }}
        </button>
        <button class="btn-white-bg" @click="removeRow">
          {{ $t('page.system.00012') }}
        </button>
      </SJTitle>
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
          { name: 'progName' },
          { name: 'progPath' },
          { name: 'authCheckFlag' },
          { name: 'inqryAuth' },
          { name: 'saveAuth' },
          { name: 'excelAuth' },
          { name: 'delAuth' },
          { name: 'fn1Auth' },
          { name: 'fn2Auth' },
          { name: 'fn3Auth' },
          { name: 'fn4Auth' },
          { name: 'fn5Auth' },
          { name: 'remark' }
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
            this.$notify.warning(this.$t('message.00007')) // Grid 입력값을 확인하세요.
            return false
          }
          const data = this.$refs.grid.invoke('getModifiedRows')
          await this.$api.system.program.update(data)
          this.$notify.success(this.$t('message.00002'))
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
