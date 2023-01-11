<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 text-center">
          회사코드
        </div>
        <div class="col-md-1">
          <SJInput id="companyId" v-model="search.coId" name="회사코드" type="text" disabled-validation />
        </div>
        <div class="col-md-1 text-center">
          회사명
        </div>
        <div class="col-md-1">
          <SJInput id="companyName" v-model="search.coName" name="회사명" type="text" disabled-validation />
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
      회사
    </template>
    <template #left>
      <SJGrid ref="company" v-model="company.data" :columns="company.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          회사 상세
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="createCompany">
            신규 회사 <i class="bi bi-pencil-fill" />
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>회사코드</label>
            <SJInput
              id="form_coId"
              v-model="companyDetail.coId"
              name="회사코드"
              type="text"
              disabled-validation
              disabled
            />
          </div>
          <div class="col-md-6 mt-3">
            <label>회사명</label>
            <SJInput
              id="form_coName"
              v-model="companyDetail.coName"
              name="회사명"
              type="text"
              rules="required"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>사업자번호</label>
            <SJInput
              id="form_biznum"
              v-model="companyDetail.biznum"
              name="사업자번호"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>법인번호</label>
            <SJInput
              id="form_coNum"
              v-model="companyDetail.coNum"
              name="법인번호"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-3 mt-3">
            <label>대표자명</label>
            <SJInput
              id="form_repName"
              v-model="companyDetail.repName"
              name="대표자명"
              type="text"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>담당자 Email</label>
            <SJInput
              id="form_email"
              v-model="companyDetail.email"
              name="담당자Email"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>회사 전화</label>
            <SJInput
              id="form_phone"
              v-model="companyDetail.phone"
              name="회사전화"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-3 mt-3">
            <label>회사 FAX</label>
            <SJInput
              id="form_fax"
              v-model="companyDetail.fax"
              name="회사FAX"
              type="text"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>설립일</label>
            <SJDatePicker id="form_estabDt" v-model="companyDetail.estabDt" name="설립일" disabled-validation />
          </div>
          <div class="col-md-4 mt-3">
            <label>업태</label>
            <SJInput
              id="form_biztype"
              v-model="companyDetail.biztype"
              name="업태"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-3 mt-3">
            <label>종목</label>
            <SJInput
              id="form_bizitem"
              v-model="companyDetail.bizitem"
              name="종목"
              type="text"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>언어</label>
            <SJInput
              id="form_lang"
              v-model="companyDetail.lang"
              name="언어"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>정렬</label>
            <SJStepper
              id="form_sort"
              v-model="companyDetail.sort"
              name="stepper"
              rules="required|min_value:1"
            />
          </div>
          <div class="col-md-3 mt-3">
            <label>사용여부</label>
            <SJSelect id="form_useYN" v-model="companyDetail.useFlag" name="사용여부" :options="$api.common.getYNCodes()" rules="required" />
          </div>

          <div class="col-md-11 mt-3">
            <label>주소</label>
            <SJInput
              id="form_addr1"
              v-model="companyDetail.addr1"
              name="주소"
              type="text"
              disabled-validation
            />
            <SJInput
              id="form_addr2"
              v-model="companyDetail.addr2"
              name="주소"
              type="text"
              disabled-validation
            />
          </div>

          <div class="col-md-11 mt-3">
            <label>영문주소</label>
            <SJInput
              id="form_addr3"
              v-model="companyDetail.addr3"
              name="영문주소"
              type="text"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>코드약어</label>
            <SJInput
              id="form_coType"
              v-model="companyDetail.coType"
              name="코드약어"
              type="text"
              rules="required"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>로고파일명</label>
            <SJInput
              id="form_logoName"
              v-model="companyDetail.logoName"
              name="로고파일명"
              type="text"
              rules="required"
            />
          </div>
        </div>
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
      isUpdate: false,
      common: {},
      search: {},
      companyDetail: {
      },
      company: {
        data: {},
        columns: [
          {
            name: 'coName'
          },
          {
            name: 'biznum'
          },
          {
            name: 'repName'
          },
          { name: 'useFlag' }
        ]
      }
    }
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.company.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.company.load(item.coId)
      this.companyDetail = result.data
      this.isUpdate = true
      this.companyDetail.data = {
        Data: this.companyDetail.codes
      }
    },
    createCompany () {
      this.isUpdate = false
      this._resetForm()
    },
    ACTION_REGISTRY () {
      return {
        f1Click: () => {
          this.$notify.info('info 메시지 테스트')
          this.$notify.success('success 메시지 테스트.')
          this.$notify.warning('warning')
          this.$notify.error('error')
        },
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.company.list(this.search)
          this.company.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              /* const data = { company: this.companyDetail } */
              await this.$api.system.company.update(this.coId, this.companyDetail)
            } else {
              await this.$api.system.company.save(this.companyDetail)
            }
            this._resetForm()
            this.$notify.success('처리되었습니다.') // TODO:다국어 처리
            await this.ACTION_REGISTRY().searchClick()
          }
        },
        delClick: () => {
        }
      }
    },
    _resetForm () {
      this.$refs.form.reset()
      this.companyDetail = {}
    }
  }
}
</script>

<style scoped>

</style>
