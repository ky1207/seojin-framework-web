<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      품목조회
    </template>
    <template #button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="조회" />
        </template>
        <template #default>
          <SJForm>
            <SJFormRow>
              <SJFormField label="거래처">
                <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
              </SJFormField>
              <SJFormField label="품목">
                <SJInput id="searchCoCode" v-model="search.item" name="searchItem" />
              </SJFormField>
            </SJFormRow>
          </SJForm>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
        </template>
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      search: {},
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '거래처코드', width: 100 },
          { name: '거래처명', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '품목코드', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '품목대분류', width: 100 },
          { name: '품목소분류', width: 100 },
          { name: '기준단위', width: 100 }
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
form .sj-form-field fieldset{
  width: 250px ;
}
</style>
