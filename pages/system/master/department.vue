<template>
  <SJSearchLRLayout>
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
        <!--        <div class="col-md-1 text-center">
          부서코드
        </div>
        <div class="col-md-1">
          <SJInput id="deptId" v-model="search.deptId" name="부서코드" type="text" disabled-validation />
        </div>
        <div class="col-md-1 text-center">
          부서명
        </div>
        <div class="col-md-1">
          <SJInput id="deptName" v-model="search.deptName" name="부서명" type="text" disabled-validation />
        </div>-->
      </div>
    </template>

    <template #leftTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00055') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="addDept">
            {{ $t('page.system.00026') }} <i class="bi bi-file-plus" />
          </button>
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="deleteDept">
            {{ $t('page.system.00012') }} <i class="bi bi-file-minus" />
          </button>
        </div>
      </div>
    </template>

    <template #left>
      <SJGrid
        ref="deptGrid"
        v-model="depts.data"
        :columns="depts.columns"
        :options="depts.options"
        disable-context
        @click="read"
        @drop="dropped"
      />
    </template>

    <template #rightTitle>
      {{ $t('page.system.00056') }}
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4">
            <label>{{ $t('page.system.00001') }}</label>
            <SJSelect
              id="form_coId"
              v-model="dept.coId"
              :name="$t('page.system.00001')"
              :options="common.COMPANY"
              rules="required"
            />
          </div>
          <div class="col-md-4">
            <label>{{ $t('page.system.00057') }}</label>
            <SJInput
              id="form_deptId"
              v-model="dept.deptId"
              :name="$t('page.system.00057')"
              type="text"
              disabled-validation
              disabled
            />
          </div>
          <div class="col-md-6 mt-3">
            <label>{{ $t('page.system.00058') }}</label>
            <SJInput
              id="form_deptName"
              v-model="dept.deptName"
              :name="$t('page.system.00058')"
              type="text"
              rules="required"
            />
          </div>
          <div class="col-md-12 mt-3">
            <label>{{ $t('page.system.00009') }}</label>
            <SJTextarea id="form_remark" v-model="dept.remark" :name="$t('page.system.00009')" disabled-validation />
          </div>
        </div>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'

export default {
  name: 'DEPARTMENT',
  mixins: [MENU, ACTION],
  data () {
    return {
      gridCheck: true,
      common: { },
      search: {},
      dept: {},
      depts: {
        data: {},
        columns: [
          {
            name: 'deptName'
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
    await Promise.all([this.$api.common.getCommonCodes(['DEPT_GROUP']),
      this.$api.common.getCompanyCodes()])
      .then((response) => {
        this.common = {
          ...response[0].data,
          COMPANY: response[1].data,
          USE_YN: this.$api.common.getYNCodes()
        }
      })
    await this.ACTION_REGISTRY().searchClick()
  },
  methods: {
    async read (e) {
      this.isUpdate = true

      if (e.rowKey === undefined) { return }
      if (e.columnName !== 'deptName') { return }
      const node = this.$refs.deptGrid.invoke('getRow', e.rowKey)
      const result = await this.$api.system.department.load(node.deptId)
      this.dept = result.data
    },
    _resetForm () {
      this.$refs.form.reset()
      this.dept = {}
    },
    async dropped (e) {
      // appended:true --자식으로 이동
      // appended:false -- sibling 사이에서 이동
      if (e.targetRowKey === e.rowKey) { return }
      if (e.targetRowKey === 0 || e.rowKey === 0) {
        this.$notify.info(this.$t('message.00005'))// '최상위 루트는 변경 할 수 없습니다.'
        await this.ACTION_REGISTRY().searchClick()
        return
      }
      const selected = await this.$refs.deptGrid.invoke('getRow', e.rowKey)
      const target = await this.$refs.deptGrid.invoke('getRow', e.targetRowKey)
      await this.$api.system.department.move(selected.deptId, target.deptId, e.appended)
      this.$notify.success(this.$t('message.00002'))// '최상위 루트는 변경 할 수 없습니다.'
      await this.ACTION_REGISTRY().searchClick()
    },
    addDept () {
      this.isUpdate = false

      const node = this.$refs.deptGrid.invoke('getFocusedCell')
      if (node.rowKey === null) {
        this.$notify.warning(this.$t('message.00010'))// '부서를 선택하세요'
        return false
      }
      const parent = this.$refs.deptGrid.invoke('getRow', node.rowKey)
      const newNode = this.$tree.getNewNode(
        {
          deptName: '새부서',
          upperDeptId: parent.deptId,
          level: parent.level + 1
        }
      )
      const { deptName, ...rest } = newNode

      const temp = rest
      temp.langs = [{ langCode: 'ko', val: '부서관리' }]

      this.dept = temp
      this.$refs.deptGrid.invoke('appendTreeRow', newNode, { parentRowKey: node.rowKey, focus: true })
      this.$refs.deptGrid.invoke('expand', node.rowKey, true)
    },
    async deleteDept () {
      const checkedData = this.$refs.deptGrid.invoke('getCheckedRows')
      const depts = checkedData.map(dept => dept.deptId)
      if (depts.length === 0) {
        this.$notify.warning(this.$t('message.00011'))// '삭제 할 부서를 체크하세요.'
        return
      }
      await this.$api.system.department.delete(depts)
      this.$notify.success(this.$t('message.00002'))// '처리되었습니다.'
      await this.ACTION_REGISTRY().searchClick()
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.department.list(this.search)
          this.depts.data = {
            Total: result.data.Total,
            Data: this.$tree.treeGridSort(result.data.Data, null, 'deptId', 'upperDeptId')
          }
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (!result) {
            return
          }
          if (this.isUpdate) {
            if (!this.dept.deptId) {
              this.$notify.warning(this.$t('message.00010'))// '부서를 선택하세요'
              return false
            }
            await this.$api.system.department.update(this.dept.deptId, this.dept)
          } else {
            await this.$api.system.department.insertDept(this.dept)
          }
          this.$notify.success(this.$t('message.00002'))// '처리되었습니다.'
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
