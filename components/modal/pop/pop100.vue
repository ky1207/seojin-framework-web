<template>
  <SJModal ref="modal" class="modal-xxl">
    <template #title>
      제조오더조회
    </template>
    <template #button>
      <button class="btn-white-bg">
        <i class="bi bi-arrow-clockwise" />
      </button>
      <button class="btn-blue-bg">
        조회
      </button>
      <button class="btn-blue-bg">
        작업지시 선택
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap>
        <template #default>
          <SJSearchField label="공정분류">
            <SJItemCategory id="search" name="search" />
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
  data () {
    return {
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '지시일자', width: 120 },
          { name: '제조오더번호', width: 200 },
          { name: '오더상태', width: 120 },
          { name: '재작업', width: 120 },
          { name: '품목코드', width: 200 },
          { name: '품목명' },
          { name: '지시', width: 120 },
          { name: '양품', width: 120 },
          { name: '불량', width: 120 }
        ],
        options: {
          header: 200,
          rowHeaders: ['checkbox'],
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
