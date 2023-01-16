<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 text-center">
          회사
        </div>
        <div class="col-md-1">
          <SJSelect
            id="company"
            v-model="search.coId"
            name="회사"
            :options="common.COMPANY"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 text-center">
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
        </div>
        <div class="col-md-1 text-center">
          사용여부
        </div>
        <div class="col-md-1">
          <SJSelect
            id="useYN"
            v-model="search.useFlag"
            name="사용여부"
            :options="$api.common.getYNCodes()"
            disabled-validation
          />
        </div>
      </div>
    </template>

    <template #leftTitle>
      <div class="row align-items-center">
        <div class="col">
          부서목록
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="addDept">
            추가 <i class="bi bi-file-plus" />
          </button>
          <button class="btn btn-outline-dark" @click="deleteDept">
            삭제 <i class="bi bi-file-minus" />
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
      부서 상세
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4">
            <label>회사</label>
            <SJSelect
              id="form_coId"
              v-model="dept.coId"
              name="회사"
              :options="common.COMPANY"
              rules="required"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>부서코드</label>
            <SJInput
              id="form_deptId"
              v-model="dept.deptId"
              name="부서코드"
              type="text"
              disabled-validation
              disabled
            />
          </div>
          <div class="col-md-6 mt-3">
            <label>부서명</label>
            <SJInput
              id="form_deptName"
              v-model="dept.deptName"
              name="부서명"
              type="text"
              rules="required"
              disabled-validation
            />
          </div>
          <div class="col-md-12 mt-3">
            <label>비고</label>
            <SJTextarea id="form_remark" v-model="dept.remark" name="비고" disabled-validation />
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
      this.$api.common.getCompanyCodes(),
      this.$api.common.getProgramCodes()])
      .then((response) => {
        this.common = {
          ...response[0].data,
          COMPANY: response[1].data,
          PROGRAM: response[2].data,
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
    async changeProgram (e) {
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
        this.$notify.info('최상위 루트는 변경 할 수 없습니다.')
        await this.ACTION_REGISTRY().searchClick()
        return
      }
      const selected = await this.$refs.deptGrid.invoke('getRow', e.rowKey)
      const target = await this.$refs.deptGrid.invoke('getRow', e.targetRowKey)
      await this.$api.system.department.move(selected.deptId, target.deptId, e.appended)
      this.$notify.success('처리되었습니다.')
      await this.ACTION_REGISTRY().searchClick()
    },
    addDept () {
      this.isUpdate = false

      const node = this.$refs.deptGrid.invoke('getFocusedCell')
      if (node.rowKey === null) {
        this.$notify.warning('부서를 선택하세요')
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
        this.$notify.warning('삭제 할 부서를 체크하세요.')
        return
      }
      await this.$api.system.department.delete(depts)
      this.$notify.success('처리되었습니다.')
      await this.ACTION_REGISTRY().searchClick()
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.department.list(this.search)
          this.depts.data = {
            Total: result.data.Total,
            Data: this.$tree.treeGridSort(result.data.Data)
          }
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (!result) {
            return
          }
          if (this.isUpdate) {
            if (!this.dept.deptId) {
              this.$notify.warning('부서를 선택하세요')
              return false
            }
            await this.$api.system.department.update(this.dept.deptId,
              { dept: this.dept })
          } else {
            await this.$api.system.department.insertDept({ dept: this.dept })
          }
          this.$notify.success('처리되었습니다.')
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
