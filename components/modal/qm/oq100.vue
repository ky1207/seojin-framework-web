<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      출하검사 등록
    </template>
    <template #button>
      <button class="btn-blue-bg">
        저장
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="등록" />
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
      resolve: null,
      reject: null
    }
  },
  created () {
    this.options = []
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    close () {
      this.$refs.modal.hide()
    }
  }
}
</script>
