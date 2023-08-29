<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      제조BOM
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="save()">
        저장
      </button>
      <button class="btn-gray-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="등록" />
        </template>
        <template #default>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="회사">
                <SJSelect id="searchCoType" name="회사" :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]" rules="required" />
              </SJFormField>
              <SJFormField label="라우팅명">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="라우팅명" rules="required" />
              </SJFormField>
              <SJFormField label="품목코드">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목코드" rules="required" />
              </SJFormField>
              <SJFormField label="품명">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="품명" rules="required" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="규격">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="규격" rules="required" />
              </SJFormField>
              <SJFormField label="품목유형">
                <SJSelect
                  id="md1"
                  name="품목유형"
                  :options="[{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원료',value: '원료'}]"
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="기준단위">
                <SJSelect
                  id="md4"
                  name="기준단위"
                  :options="[{text: 'EA',value: 'EA'},{text: 'L',value: 'L'}]"
                  rules="required"
                />
              </SJFormField>
              <SJFormField />
            </SJFormRow>
          </SJForm>
          <SJTitle title="공정">
            <button class="btn-blue-bg" @click="routingSet">
              라우팅적용
            </button>
          </SJTitle>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />

          <SJTitle title="BOM">
            <div style="display:flex; margin-right: 5px;">
              품목코드:
              <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
            </div>
            <button class="btn-blue-bg">
              조회
            </button>
            <button class="btn-blue-bg" @click="bomSet">
              설계BOM적용
            </button>
            <button class="btn-blue-bg" @click="itemPop">
              품목적용
            </button>
            <button class="btn-blue-bg" @click="processPop">
              공정맵핑
            </button>
            <button class="btn-white-bg" @click="rowDel">
              삭제
            </button>
          </SJTitle>
          <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
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
      search: {},
      item: {
        title: null,
        content: null,
        upload: []
      },
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 150
        },
        columns: [
          { name: '불출일자', width: 100 },
          { name: '공정#', width: 100 },
          { name: '공정코드', width: 100 },
          { name: '공정', width: 200 },
          { name: '후공정#', width: 100 },
          { name: 'C/T(분)', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '워크센터구분', width: 100 },
          { name: '거래처', width: 100 },
          { name: '실적여부', width: 100 },
          { name: '최종공정', width: 100 },
          { name: '비고', width: 200 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 150
        },
        columns: [
          { name: '공정#', width: 100 },
          { name: '공정코드', width: 100 },
          { name: '투입공정', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 200 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: 'LOSS(%)', width: 100 },
          { name: 'LOSS', width: 100 },
          { name: '총소요량', width: 100 },
          { name: '비고', width: 200 },
          { name: '우선순위', width: 100 }
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
    async routingSet () {
      await this.$notify.success('라우팅 적용')
    },
    async bomSet () {
      await this.$notify.success('설계BOM적용')
    },
    async itemPop () {
      await this.$notify.success('품목 팝업호출')
    },
    async processPop () {
      await this.$notify.success('공정 팝업호출')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
