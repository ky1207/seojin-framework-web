<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      구매납품 등록
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="save()">
        저장
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="구매납품 등록" />
        </template>
        <template #default>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="회사">
                <SJSelect id="searchCoType" name="회사" :options="common.USE_YN" rules="required" />
              </SJFormField>
              <SJFormField label="담당자">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="담당자" rules="required" />
              </SJFormField>
              <SJFormField label="가입고번호">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="가입고번호" rules="required" />
              </SJFormField>
              <SJFormField label="등록일">
                <SJDatePicker
                  id="sentStartDtm"
                  v-model="inputData.sentStartDtm"
                  name="등록일"
                  show-current="true"
                  disabled-validation
                  rules="required"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="거래처">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="거래처" rules="required" />
              </SJFormField>
              <SJFormField label="내/외자구분">
                <SJSelect id="searchCoType" name="내/외자구분" :options="common.USE_YN" rules="required" />
              </SJFormField>
              <SJFormField label="부가세적용">
                <SJSelect id="searchCoType" name="부가세적용" :options="common.USE_YN" rules="required" />
              </SJFormField>
              <SJFormField label="통화">
                <SJSelectInput id="searchCoType" name="searchCoType" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="비고">
                <SJTextarea
                  id="textarea"
                  v-model="inputData.content"
                  name="textarea"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="등록일시">
                2023-07-20 18:00:00
              </SJFormField>
              <SJFormField label="등록자">
                홍길동
              </SJFormField>
              <SJFormField label="수정일시">
                2023-07-20 18:00:00
              </SJFormField>
              <SJFormField label="수정자">
                홍길동
              </SJFormField>
            </SJFormRow>
          </SJForm>
          <SJTitle title="상세정보">
            <div style="display:flex; margin-right: 5px;">
              납품창고:
              <SJSelect id="searchCoType" name="회사" :options="common.USE_YN" />
            </div>
            <button class="btn-white-bg" @click="blocApply">
              일괄적용
            </button>
            <button class="btn-white-bg" @click="orderApply">
              발주적용
            </button>
            <button class="btn-white-bg" @click="scmApply">
              SCM적용
            </button>
            <button class="btn-white-bg" @click="rowDel">
              삭제
            </button>
          </SJTitle>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
        </template>
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      current: null,
      counter: 10,
      test: 'test',
      selected: null,
      options: null,
      common: {},
      inputData: { CO_CODE: null },
      item: {
        title: null,
        content: null,
        upload: []
      },
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 300
        },
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '창고', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '출력수량', width: 100 },
          { name: '납품수량', width: 100 },
          { name: '단가', width: 100 },
          { name: '공급가', width: 100 },
          { name: '부가세', width: 100 },
          { name: '합계', width: 100 },
          { name: '검사여부', width: 100 },
          { name: '검사우선순위', width: 100 }
        ]
      },
      resolve: null,
      reject: null
    }
  },
  created () {
    this.options = [{ value: 1, text: '사과' }, { value: 2, text: '바나나' }]
  },
  methods: {
    open () {
      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.$refs.form.reset()

      this.$refs.modal.hide()
      this.resolve(false) // response의 응답
    },
    async save () {
      const result = await this.$refs.form.validate()
      if (result) {
        this.$refs.modal.hide()
        this.resolve(true)
      }
    },
    async blocApply () {
      await this.$notify.success('일괄적용')
    },
    async orderApply () {
      await this.$notify.success('발주적용')
    },
    async scmApply () {
      await this.$notify.success('SCM적용')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
