<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      자재검색
    </template>
    <template #button>
      <button class="btn-white-bg">
        <i class="bi bi-arrow-clockwise" />
      </button>
      <button class="btn-blue-bg">
        조회
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap>
        <template #default>
          <SJSearchField label="창고">
            <SJSelect
              id="search"
              disabled-first-message
              name="창고"
              :options="[{text: '반도체 재공(화성)',value: ''}]"
            />
          </SJSearchField>
          <SJSearchField label="품목코드">
            <SJInput
              id="search"
              name="품목코드"
            />
          </SJSearchField>
          <SJSearchField label="품목명">
            <SJInput
              id="search"
              name="품목명"
            />
          </SJSearchField>
          <SJSearchField label="LOT">
            <SJInput
              id="search"
              name="LOT"
            />
          </SJSearchField>
        </template>
        <template #body>
          <SJPOPGrid
            v-model="grid.data"
            :columns="grid.columns"
            :options="grid.options"
          />
        </template>
      </SJPOPOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '작업자ID', width: 200 },
          { name: '작업자명', width: 200 }
        ],
        options: {
          header: 200,
          bodyHeight: 400
        }
      },
      resolve: null,
      reject: null
    }
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
      this.resolve(false) // response의 응답
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.search) {
  .search-field{
    display: flex;
    align-items: center;
    flex-basis: 30% !important;
    .field-wrap{
      width: 100%;
    }
  }
}

</style>
