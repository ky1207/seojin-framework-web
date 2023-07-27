<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      사용자
    </template>
    <template #button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="등록" />
        </template>
        <template #default>
          <SJForm>
            <SJFormRow>
              <SJFormField label="부서">
                <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
              </SJFormField>
              <SJFormField label="사용자ID">
                <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
              </SJFormField>
              <SJFormField label="사용자명">
                <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
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
          { name: '사용자ID', width: 100 },
          { name: '사용자명', width: 100 },
          { name: '부서', width: 100 },
          { name: '직급', width: 100 },
          { name: 'EMAIL', width: 100 }
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
