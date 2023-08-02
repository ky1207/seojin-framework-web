<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      품목조회
    </template>
    <template #button>
      <button class="btn-gray-bg">
        조회
      </button>
      <button class="btn-gray-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJSearchOneLayout disabled-navigator-wrap>
        <template #default>
          <SJSearchField label="품목유형">
            <SJSelect
              id="md1"
              name="md1"
            />
          </SJSearchField>
          <SJSearchField label="품목분류">
            <SJInput id="md2" name="md2" />
          </SJSearchField>
          <SJSearchField label="품목코드">
            <SJInput id="md3" name="md3" />
          </SJSearchField>
          <SJSearchField label="품명">
            <SJInput id="md3" name="md3" />
          </SJSearchField>
          <SJSearchField label="규격">
            <SJInput id="md3" name="md3" />
          </SJSearchField>
        </template>
        <template #bodyTitle>
          <SJTitle title="목록" />
        </template>
        <template #body>
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

      grid: {
        data: {},
        columns: [
          { name: '품목유형' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: 'REV번호' },
          { name: '크리티컬여부' },
          { name: '크리티컬등급' },
          { name: '품목대분류' },
          { name: '품목소분류' },
          { name: '기준단위' },
          { name: '거래처명' },
          { name: '단가' },
          { name: '조달구분' },
          { name: 'Country or Origin' },
          { name: '가공시간' }
        ],
        options: {
          rowHeaders: ['rowNum', 'checkbox'],
          bodyHeight: 450,
          cell: {
            normal: {
              text: 'red'
            }
          }
        }
      },
      resolve: null,
      reject: null
    }
  },
  created () {
    // 모달에서 그리드 사용시, 그리드를 모달 크기에 맞추기 위함.
    this.$nuxt.$on('modal.show', () => {
      this.$refs.grid.invoke('refreshLayout')
    })
  },
  beforeDestroy () {
    // 위의 이벤트를 삭제 한다. this.$nuxt.$on('modal.show')
    this.$nuxt.$off('modal.show')
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
      this.$refs.modal.hide()
      this.resolve([]) // response의 응답
    }
  }

}
</script>
