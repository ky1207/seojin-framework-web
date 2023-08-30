<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      공정마스터
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="save">
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
        <template #default>
          <SJForm>
            <SJFormRow>
              <SJFormField label="회사">
                <SJSelect
                  id="md1"
                  name="회사"
                  :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="공정분류">
                <SJSelect
                  id="md1"
                  name="공정분류"
                  :options="[{text: '전체',value: '전체'},{text: 'BUILD',value: 'BUILD'},{text: 'Packing',value: 'Packing'},{text: 'Test',value: 'Test'},{text: 'Prep',value: 'Prep'}]"
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="사용여부">
                <SJSelect
                  id="md4"
                  name="사용여부"
                  :options="[{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]"
                  rules="required"
                />
              </SJFormField>
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="공정코드">
                <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" rules="required" />
              </SJFormField>
              <SJFormField label="공정명">
                <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" rules="required" />
              </SJFormField>
              <SJFormField label="공정검사여부">
                <SJSelect
                  id="md5"
                  name="공정검사여부"
                  :options="[{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]"
                />
              </SJFormField>
              <SJFormField />
            </SJFormRow>
            <SJTab :list="tabList">
              <template #tab-1>
                <SJTitle title="목록">
                  <button class="btn-blue-bg" @click="tab1_save">
                    비가동적용
                  </button>
                  <button class="btn-white-bg" @click="tab1_del">
                    삭제
                  </button>
                </SJTitle>
                <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" :options="grid_tab1.options" />
              </template>
              <template #tab-2>
                <SJTitle title="목록">
                  <button class="btn-blue-bg" @click="tab2_save">
                    불량적용
                  </button>
                  <button class="btn-white-bg" @click="tab2_del">
                    삭제
                  </button>
                </SJTitle>
                <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" :options="grid_tab2.options" />
              </template>
            </SJTab>
          </SJForm>
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
      reject: null,
      grid_tab1: {
        data: {},
        columns: [
          { name: '바가동코드', width: 100 },
          { name: '비가동명', width: 120 },
          { name: '비고', width: 300 },
          { name: '사용여부', width: 100 }
        ],
        options: {
          bodyHeight: 400
        }
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '블량코드', width: 100 },
          { name: '불량명', width: 120 },
          { name: '비고', width: 300 },
          { name: '사용여부', width: 100 }
        ],
        options: {
          bodyHeight: 400
        }
      },
      tabList: [
        { id: 1, title: '공정별비가동' },
        { id: 2, title: '공정별불량유형' }
      ]
    }
  },
  created () {
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    async save () {
      await this.$notify.info('저장')
    },
    close () {
      this.$refs.modal.hide()
    },
    async tab1_save () {
      await this.$notify.info('비가동 저장')
    },
    async tab1_del () {
      await this.$notify.info('비가동 삭제')
    },
    async tab2_save () {
      await this.$notify.info('불량적용 저장')
    },
    async tab2_del () {
      await this.$notify.info('블량적용 삭제')
    }
  }
}
</script>
