<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template>
      <SJSearchField label="품목번호">
        <SJInput id="md6" v-model="search.md6" name="md6" />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="md1"
          name="md1"
          :options="MD_01"
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="규격">
        <SJInput id="md3" v-model="search.md3" name="md3" />
      </SJSearchField>
      <SJSearchField label="구매L/T">
        <SJInput id="md5" v-model="search.md5" name="md5" />
      </SJSearchField>

      <SJSearchField label="거래처">
        <SJInput id="md7" v-model="search.md7" name="md7" />
      </SJSearchField>
      <!--      <SJSearchField label="사용여부">-->
      <!--        <SJSelect-->
      <!--          id="md8"-->
      <!--          name="md8"-->
      <!--          :options="MD_03"-->
      <!--        />-->
      <!--      </SJSearchField>-->
    </template>
    <template #bodyTitle>
      <SJTitle title="품목목록">
        <button class="btn-white-bg">
          추가
        </button>
        <button class="btn-white-bg">
          삭제
        </button>
      </SJTitle>
    </template>
    <template #body>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
      />
    </template>
    <md100 ref="mdModal" />
  </SJSearchOneLayout>
</template>

<script>
import { ACTION } from '~/mixins'

export default {
  mixins: [ACTION],
  data () {
    return {
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '품목유형' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: '품목대분류' },
          { name: '품목소분류' },
          { name: '기준단위' },
          { name: '거래처명' },
          { name: '단가' },
          { name: '조달구분' },
          { name: 'Country or Origin' },
          { name: '가공시간' }
        ]
      }
    }
  },
  created () {
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
    this.MD_03 = this.getMD03()
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.mdModal.open()
          if (result) {
            console.log(result)
          }
        },
        async f2Click () {
          await fnc.$notify.success('수정')
        },
        f1Label: '신규',
        f2Label: '수정'
      }
    },
    getMD01 () {
      return [
        {
          text: '제품',
          value: '제품'
        },
        {
          text: '반제품',
          value: '반제품'
        },
        {
          text: '원재료',
          value: '원재료'
        },
        {
          text: '저장품',
          value: '저장품'
        },
        {
          text: '...',
          value: '...'
        }
      ]
    },
    getMD02 () {
      return [
        {
          text: '전체',
          value: '전체'
        },
        {
          text: 'Y',
          value: 'Y'
        },
        {
          text: 'N',
          value: 'N'
        }
      ]
    },
    getMD03 () {
      return [
        {
          text: '전체',
          value: '전체'
        },
        {
          text: '사용',
          value: '사용'
        },
        {
          text: '미사용',
          value: '미사용'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
