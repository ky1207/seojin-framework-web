<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      품목별PR그룹 적용
    </template>

    <template #button>
      <button class="btn-white-bg">
        조회
      </button>
      <button class="btn-white-bg">
        적용
      </button>
    </template>

    <template #default>
      <SJSearchOneLayout disabled-navigator-wrap>
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
          <SJSearchField label="품목">
            <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
          </SJSearchField>
          <SJSearchField label="등록일">
            <SJDatePicker
              id="sentStartDtm"
              v-model="search.sentStartDtm"
              :name="$t('page.system.00083')"
              show-current="true"
              disabled-validation
            />
            <div>~</div>
            <SJDatePicker
              id="sentStartDtm"
              v-model="search.sentStartDtm"
              :name="$t('page.system.00083')"
              show-current="true"
              disabled-validation
            />
          </SJSearchField>
        </template>
        <template #bodyTitle>
          <SJTitle title="구매요청목록">
            <button class="btn-white-bg">
              그룹생성
            </button>
          </SJTitle>
        </template>
        <template #body>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
        </template>
      </SJSearchOneLayout>
    </template>

    <template #footer>
      <button type="button" class="btn btn-secondary" @click="close()">
        Close
      </button>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      search: {},
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
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '요청일자', width: 100 },
          { name: '구매발주필요일', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '요청번호', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '수량', width: 100 },
          { name: '수주번호', width: 100 },
          { name: '수주품목명', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '그룹순번', width: 100 },
          { name: '요청자', width: 100 },
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
      // this.$refs.form.reset()

      this.$refs.modal.hide()
      this.resolve(false) // response의 응답
    }
  }
}
</script>

<style scoped>
</style>
