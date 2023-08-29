<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      제품별공정절차 일괄등록
    </template>
    <template #button>
      <button class="btn-white-bg" @click="save()">
        조회
      </button>
      <button class="btn-blue-bg" @click="save()">
        저장
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJSearchOneLayout disabled-navigator-wrap>
        <template #default>
          <SJSearchField label="회사">
            <SJSelect id="searchCoType" name="회사" :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]" />
          </SJSearchField>
          <SJSearchField label="품목유형">
            <SJSelect
              id="md4"
              name="품목유형"
              :options="[{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원재료',value: '원재료'}]"
            />
          </SJSearchField>
          <SJSearchField label="품목분류">
            <SJItemCategory id="search2" name="search2" />
          </SJSearchField>
          <SJSearchField label="품목">
            <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
          </SJSearchField>
          <SJSearchField label="라우팅코드">
            <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
          </SJSearchField>
          <SJSearchField label="생성일">
            <SJPeriodSearch id="md2" name="md2" />
          </SJSearchField>
        </template>
        <template #body>
          <SJTitle title="BOM">
            <button class="btn-blue-bg" @click="validation">
              VALIDATION
            </button>
            <button class="btn-white-bg" @click="rowAdd">
              추가
            </button>
            <button class="btn-white-bg" @click="rowDel">
              삭제
            </button>
          </SJTitle>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
        </template>
      </SJSearchOneLayout>
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
          bodyHeight: 400
        },
        columns: [
          { name: '품목코드', width: 100 },
          { name: '라우팅코드', width: 100 },
          { name: '공정코드', width: 100 },
          { name: 'REG SEQ', width: 100 },
          { name: '공정#', width: 100 },
          { name: '후공정#', width: 100 },
          { name: 'C/T(분)', width: 100 },
          { name: '워크센터', width: 100 },
          { name: '최종공정', width: 100 },
          { name: '비고', width: 100 },
          { name: 'VALID메세지', width: 100 },
          { name: '생성일', width: 100 }
        ]
      },
      resolve: null,
      reject: null
    }
  },
  created () {
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
    async validation () {
      await this.$notify.success('validation check')
    },
    async rowAdd () {
      await this.$notify.success('row 추가')
    },
    async rowDel () {
      await this.$notify.success('row 삭제')
    }
  }
}
</script>

<style scoped>
</style>
