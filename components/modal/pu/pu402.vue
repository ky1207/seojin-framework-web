<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      구매납품 등록 : 템플릿 적용
    </template>

    <template #default>
      <SJForm ref="form">
        <SJSearchLRLayout>
          <template #default>
            <SJSearchField label="회사">
              <SJSelect
                id="searchCompany"
                name=""
                :options="common.USE_YN"
                disabled-validation
                disabled-first-message
              />
            </SJSearchField>
          </template>

          <template #leftTitle>
            <SJTitle title="검사내역">
              <button class="btn-white-bg">
                일괄합격
              </button>
            </SJTitle>
          </template>
          <template #left>
            <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
          </template>
          <template #rightTitle>
            <SJTitle title="불량내역">
              <button class="btn-white-bg" @click="poorReg">
                불량적용
              </button>
              <button class="btn-white-bg" @click="poorCount">
                불량집계
              </button>
              <button class="btn-white-bg" @click="rowDel">
                삭제
              </button>
            </SJTitle>
          </template>
          <template #right>
            <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
          </template>
        </SJSearchLRLayout>
      </SJForm>
    </template>

    <template #footer>
      <button type="button" class="btn btn-secondary" @click="close()">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="save()">
        Save changes
      </button>
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
      search: {},
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
          bodyHeight: 250
        },
        columns: [
          { name: '검사그룹코드', width: 100 },
          { name: '검사항목명', width: 100 },
          { name: '관리SPEC', width: 100 },
          { name: '검사단위', width: 100 },
          { name: '검사상태', width: 100 },
          { name: '결과(수치)', width: 100 },
          { name: '결과(TEXT)', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 250
        },
        columns: [
          { name: '불량코드', width: 100 },
          { name: '불량명', width: 100 },
          { name: '수량', width: 100 },
          { name: '비고', width: 100 }
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
    async poorReg () {
      await this.$notify.success('불량집계 팝업호출')
    },
    async poorCount () {
      await this.$notify.success('불량집계: 어떤화면인지 확인')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
