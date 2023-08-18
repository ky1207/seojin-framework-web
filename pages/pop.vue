<template>
  <SJPOPOneLayout>
    <template #status-bar>
      <div>:::: test ::::</div>
    </template>
    <template #left-button>
      <button class="btn-pop-sm" type="button" @click="toggleFullScreen">
        <i class="fa-solid fa-up-right-and-down-left-from-center" />
      </button>
      <button class="btn-pop-sm" @click="refresh">
        <i class="fa-solid fa-rotate-right" />
      </button>
      <button class="btn-pop-sm" @click="toggleExitScreen">
        <i class="fa-solid fa-down-left-and-up-right-to-center" />
      </button>
      <button class="btn-pop-sm" @click="authModal">
        <i class="fa-solid fa-gear" />
      </button>
    </template>
    <template #right-button>
      <button class="btn-pop-bg" type="button" @click="checkModal">
        <i class="fa-solid fa-magnifying-glass" />
        작업조회
      </button>
      <button class="btn-pop-bg" style="background: #3A83B7;" @click="operModal">
        <i class="fa-solid fa-triangle-exclamation" />
        비가동
      </button>
      <button class="btn-pop-bg" style="background: #3A83B7;" @click="inputModal">
        <i class="fa-solid fa-boxes-stacked" />
        자재투입/불량
      </button>
      <button class="btn-pop-bg" style="background: #A814A0;">
        <i class="fa-solid fa-circle-minus" />
        불량등록
      </button>
      <button class="btn-pop-bg" style="background: #13b077;">
        <i class="fa-solid fa-play" />
        작업시작
      </button>
      <button class="btn-pop-bg" style="background: #0CA896;">
        <i class="fa-solid fa-circle-plus" />
        양품등록
      </button>
      <button class="btn-pop-bg" style="background: #3A83B7;" @click="workerModal">
        <i class="fa-solid fa-user-plus" />
        작업자등록
      </button>
      <button class="btn-pop-bg" style="background: #3A83B7;" @click="workModal">
        설비등록
      </button>
      <button class="btn-pop-bg" style="background: #3A83B7;">
        <i class="fa-solid fa-file-circle-check" />
        작업표준서
      </button>
      <button class="btn-pop-bg" style="background: #A81714;">
        <i class="fa-solid fa-stop" />
        작업종료
      </button>
      <pop100 ref="checkModal" /> <pop101 ref="inputModal" /> <pop102 ref="authModal" />
      <pop103 ref="workerModal" /> <pop105 ref="operModal" /> <pop106 ref="workModal" />
    </template>
    <template #default>
      <SJSearchField label="제조오더">
        <SJInput
          id="search"
          v-model="search.md1"
          name="제조오더"
        />
      </SJSearchField>
      <SJSearchField label="수주번호">
        <SJInput
          id="search"
          v-model="search.md2"
          name="수주번호"
        />
      </SJSearchField>
      <SJSearchField label="품목코드">
        <SJInput
          id="search"
          v-model="search.md3"
          name="품목코드"
        />
      </SJSearchField>
      <SJSearchField label="품목명">
        <SJInput
          id="search"
          v-model="search.md3"
          name="품목명"
        />
      </SJSearchField>
      <SJSearchField label="Bay명">
        <SJInput
          id="search"
          v-model="search.md4"
          name="Bay명"
        />
      </SJSearchField>
      <SJSearchField label="규격">
        <SJInput
          id="search"
          v-model="search.md5"
          name="규격"
        />
      </SJSearchField>
      <SJSearchField label="단위">
        <SJInput
          id="search"
          v-model="search.md6"
          name="단위"
        />
      </SJSearchField>
      <SJSearchField label="지시수량">
        <SJInput
          id="search"
          v-model="search.md7"
          name="지시수량"
        />
      </SJSearchField>
      <SJSearchField label="생산라인">
        <SJInput
          id="search"
          v-model="search.md8"
          name="생산라인"
        />
      </SJSearchField>
      <SJSearchField label="재작업여부">
        <SJInput
          id="search"
          v-model="search.md9"
          name="재작업여부"
        />
      </SJSearchField>
      <SJSearchField label="상태">
        <SJSelect
          id="search"
          disabled-first-message
          name="상태"
          :options="[{text: '전체',value: ''},{text: '완료제외',value: '완료제외'}]"
        />
      </SJSearchField>
    </template>
    <template #body>
      <SJGrid
        v-model="grid.data"
        :columns="grid.columns"
        :options="grid.options"
      />
    </template>
  </SJPOPOneLayout>
</template>

<script>

export default {
  layout: 'empty',
  data () {
    return {
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '지시일자', width: 100 },
          { name: '우선순위', width: 100 },
          { name: '작업자', width: 150 },
          { name: '공정', width: 300 },
          { name: '상태', width: 100 },
          { name: '생산', width: 100 },
          { name: '양품', width: 100 },
          { name: '불량', width: 100 },
          { name: '자재', width: 100 },
          { name: '작업상세', width: 100 }
        ],
        options: {
          header: 200,
          rowHeaders: ['rowNum'],
          selectionUnit: 'row'
        }
      }
    }
  },
  methods: {
    async checkModal () {
      const result = await this.$refs.checkModal.open()
      if (result) {
        console.log('check')
      }
    },
    async inputModal () {
      const result = await this.$refs.inputModal.open()
      if (result) {
        console.log('check')
      }
    },
    async authModal () {
      const result = await this.$refs.authModal.open()
      if (result) {
        console.log('check')
      }
    },
    async workerModal () {
      const result = await this.$refs.workerModal.open()
      if (result) {
        console.log('check')
      }
    },
    async operModal () {
      const result = await this.$refs.operModal.open()
      if (result) {
        console.log('check')
      }
    },
    async workModal () {
      const result = await this.$refs.workModal.open()
      if (result) {
        console.log('check')
      }
    },
    toggleFullScreen () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    toggleExitScreen () {
      if (!document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    refresh () {
      this.$router.go()
    }
  }
}
</script>
