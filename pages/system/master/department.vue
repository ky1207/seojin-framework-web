<template>
  <SJSearchLRLayout disabled-search left-size="40" right-size="60">
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #leftTitle>
      <SJTitle :title="$t('page.system.00055')">
        <button class="btn-white-bg" @click="addDept">
          {{ $t('page.system.00026') }}
        </button>
        <button class="btn-white-bg" @click="deleteDept">
          {{ $t('page.system.00012') }}
        </button>
      </SJTitle>
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
      <SJTitle :title="$t('page.system.00056')" />
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00057')">
            <SJInput
              id="form_deptCode"
              v-model="dept.deptCode"
              :name="$t('page.system.00057')"
              :disabled-validation="isUpdate"
              rules="required"
              :disabled="isUpdate"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00058')">
            <SJInput
              id="form_deptName"
              v-model="dept.deptName"
              :name="$t('page.system.00058')"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00009')">
            <SJTextarea id="form_remark" v-model="dept.remark" :name="$t('page.system.00009')" disabled-validation />
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      gridCheck: true,
      isUpdate: false,
      common: { },
      search: {},
      dept: {},
      depts: {
        data: {},
        columns: [
          { name: 'deptName' },
          { name: 'deptCode' }
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
    await Promise.all([this.$api.common.getCommonCodes(['DEPT_GROUP'])])
      .then((response) => {
        this.common = {
          ...response[0].data,
          USE_YN: this.$api.common.getYNCodes()
        }
      })
    await this.ACTION_REGISTRY().searchClick()
  },
  methods: {
    async read (e) {
      if (e.rowKey === undefined) { return }
      if (e.columnName !== 'deptName') { return }
      const node = this.$refs.deptGrid.invoke('getRow', e.rowKey)
      if (!node.deptId || !this.isUpdate) {
        this.$notify.warning(this.$t('message.00016'))
        return
      }
      this.isUpdate = true
      const result = await this.$api.system.department.load(node.deptId)
      this.dept = result.data
    },
    _resetForm () {
      this.isUpdate = true
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
      if (!this.isUpdate) {
        this.$notify.warning(this.$t('message.00016')) // 부서를 입력중입니다.
        return
      }

      this.isUpdate = false

      const node = this.$refs.deptGrid.invoke('getFocusedCell')
      if (node.rowKey === null) {
        this.$notify.warning(this.$t('message.00010'))// '부서를 선택하세요'
        return false
      }
      const parent = this.$refs.deptGrid.invoke('getRow', node.rowKey)
      const newNode = this.$tree.getNewNode(
        {
          deptName: this.$t('page.system.00106'),
          upperDeptId: parent.deptId,
          level: parent.level + 1
        }
      )
      const { deptName, ...rest } = newNode

      const temp = rest
      temp.deptName = this.$t('page.system.00106')

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
