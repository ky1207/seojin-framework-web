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
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="목록" />
        </template>
        <template #default>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
        </template>
      </SJOneLayout>
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
