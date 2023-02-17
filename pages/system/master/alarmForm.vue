<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 text-center">
          {{ $t('page.system.00001') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="company"
            v-model="search.coId"
            :name="$t('page.system.00001')"
            :options="common.COMPANY"
            disabled-validation
            disabled-first-message
          />
        </div>
      </div>
    </template>
    <template #bodyTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00078') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="appendRow">
            {{ $t('page.system.00026') }} <i class="bi bi-file-plus" />
          </button>
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="removeRow">
            {{ $t('page.system.00012') }} <i class="bi bi-file-minus" />
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
      common: { },
      search: {},
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox']
        },
        columns: [
          {
            name: 'notifyTmpltId'
          },
          {
            name: 'coId',
            hidden: true
          },
          {
            name: 'notifyTmpltName',
            width: 300
          },
          {
            name: 'title',
            editor: {
              type: 'text'
            },
            width: 600
          },
          {
            name: 'emailFlag'
          },
          {
            name: 'pushFlag'
          },
          {
            name: 'sortSeq',
            editor: {
              type: 'text'
            },
            width: 150,
            align: 'center'
          },
          {
            name: 'useFlag',
            renderer: CustomCheckBoxRenderer
          }
        ]
      }
    }
  },
  async created () {
    const company = await this.$api.common.getCompanyCodes()
    this.common = { COMPANY: company.data }
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
          const result = await this.$api.system.alarm.list(this.search)
          this.grid.data = result.data
        },
        saveClick: async () => {
          const error = this.$refs.grid.invoke('validate')
          if (error.length > 0) {
            this.$notify.warning(this.$t('message.00007')) // Grid 입력값을 확인하세요.
            return false
          }
          const data = { coId: this.search.coId, gridRequest: this.$refs.grid.invoke('getModifiedRows') }
          await this.$api.system.alarm.update(data)
          this.$notify.success(this.$t('message.00002'))
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
