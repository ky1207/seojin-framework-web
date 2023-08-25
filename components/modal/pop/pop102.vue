<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      POP 권한
    </template>
    <template #button>
      <button class="btn-white-bg">
        <i class="bi bi-arrow-clockwise" />
      </button>
      <button class="btn-blue-bg">
        변경
      </button>
      <button class="btn-blue-bg">
        로그아웃
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJPOPLRLayout disabled-navigator-wrap disabled-status-wrap>
        <template #default>
          <SJSearchField label="아이디">
            <SJInput
              id="search"
              name="아이디"
              disabled
            />
          </SJSearchField>
          <SJSearchField label="사용자명">
            <SJInput
              id="search"
              name="사용자명"
              disabled
            />
          </SJSearchField>
          <SJSearchField label="워크상태코드">
            <SJSelect
              id="search"
              disabled-first-message
              name="워크상태코드"
              :options="[{text: 'Build bay',value: ''}]"
            />
          </SJSearchField>
          <SJSearchField label="등록설비조회">
            <SJSelect
              id="search"
              disabled-first-message
              name="등록설비조회"
              :options="[{text: '사용',value: ''},{text: '미사용',value: '미사용'}]"
            />
          </SJSearchField>
        </template>
        <template #left>
          <SJGrid
            v-model="grid.data"
            :columns="grid.columns"
            :options="grid.options"
          />
        </template>
        <template #right>
          <SJGrid
            v-model="grid_right.data"
            :columns="grid_right.columns"
            :options="grid_right.options"
          />
        </template>
      </SJPOPLRLayout>
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
          { name: '설비' }
        ],
        options: {
          header: 200,
          rowHeaders: ['checkbox'],
          bodyHeight: 400
        }
      },
      grid_right: {
        data: {},
        columns: [
          { name: '등록설비' }
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
