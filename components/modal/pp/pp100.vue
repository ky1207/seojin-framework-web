<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      워크센터
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
                />
              </SJFormField>
              <SJFormField label="워크센터코드">
                <SJInput
                  id="md2"
                  name="워크센터코드"
                  rules="required|max:12"
                />
              </SJFormField>
              <SJFormField label="워크센터명">
                <SJInput
                  id="md3"
                  name="워크센터명"
                  rules="required|max:12"
                />
              </SJFormField>
              <SJFormField label="사용여부">
                <SJSelect
                  id="md4"
                  name="사용여부"
                  :options="MD_02"
                  rules="required|max:12"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="CAPA산정구분">
                <SJSelect
                  id="md5"
                  name="CAPA산정구분"
                  :options="MD_03"
                />
              </SJFormField>
              <SJFormField label="워크센터분류">
                <SJSelect
                  id="md5"
                  name="워크센터분류"
                  :options="MD_03"
                />
              </SJFormField>
              <SJFormField label="외주거래처">
                <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
              </SJFormField>
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="자재출고창고">
                <SJSelect
                  id="md5"
                  name="자재출고창고"
                  :options="MD_03"
                />
              </SJFormField>
              <SJFormField label="현장창고">
                <SJSelect
                  id="md5"
                  name="현장창고"
                  :options="MD_03"
                />
              </SJFormField>
              <SJFormField label="생산입고창고">
                <SJSelect
                  id="md5"
                  name="생산입고창고"
                  :options="MD_03"
                />
              </SJFormField>
              <SJFormField label="생산물량창고">
                <SJSelect
                  id="md5"
                  name="생산물량창고"
                  :options="MD_03"
                />
              </SJFormField>
            </SJFormRow>
            <SJTab :list="tabList">
              <template #tab-1>
                <SJTitle title="목록">
                  <button class="btn-blue-bg" @click="tab1_save">
                    라인적용
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
                    설비적용
                  </button>
                  <button class="btn-white-bg" @click="tab2_del">
                    삭제
                  </button>
                </SJTitle>
                <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" :options="grid_tab2.options" />
              </template>
              <template #tab-3>
                <SJTitle title="목록">
                  <button class="btn-blue-bg" @click="tab3_save">
                    작업자적용
                  </button>
                  <button class="btn-white-bg" @click="tab3_del">
                    삭제
                  </button>
                </SJTitle>
                <SJGrid ref="grid_tab3" v-model="grid_tab3.data" :columns="grid_tab3.columns" :options="grid_tab3.options" />
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
          { name: '라인코드', width: 100 },
          { name: '라인', width: 120 },
          { name: '일작업시간', width: 200 },
          { name: '최소인원(수)', width: 100 },
          { name: '최대인원(수)', width: 100 },
          { name: 'CAPA선정구분', width: 100 },
          { name: '사용여부', width: 100 }
        ],
        options: {
          bodyHeight: 300
        }
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '설비코드', width: 100 },
          { name: '설비명', width: 120 },
          { name: '사용여부', width: 100 }
        ],
        options: {
          bodyHeight: 300
        }
      },
      grid_tab3: {
        data: {},
        columns: [
          { name: '작업자ID', width: 100 },
          { name: '작업자명', width: 120 },
          { name: '사용여부', width: 200 }
        ],
        options: {
          bodyHeight: 300
        }
      },
      tabList: [
        { id: 1, title: '워크센터별라인' },
        { id: 2, title: '워크센터별설비' },
        { id: 3, title: '워크센터별작업자' }
      ]
    }
  },
  created () {
    this.options = []
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
    this.MD_03 = this.getMD03()
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
      await this.$notify.info('워크센터별라인 저장')
    },
    async tab1_del () {
      await this.$notify.info('워크센터별라인 삭제')
    },
    async tab2_save () {
      await this.$notify.info('워크센터별설비 저장')
    },
    async tab2_del () {
      await this.$notify.info('워크센터별설비 삭제')
    },
    async tab3_save () {
      await this.$notify.info('워크세넡별작업자 저장')
    },
    async tab3_del () {
      await this.$notify.info('워크세넡별작업자 삭제')
    },
    getMD01 () {
      return [{
        text: 'A사업부',
        value: 'A사업부'
      }, {
        text: 'B사업부',
        value: 'B사업부'
      }
      ]
    },
    getMD02 () {
      return [
        {
          text: '사용',
          value: '사용'
        },
        {
          text: '미사용',
          value: '미사용'
        }
      ]
    },
    getMD03 () {
      return [
        {
          text: '수입검사',
          value: '수입검사'
        },
        {
          text: '출하검사',
          value: '출하검사'
        },
        {
          text: '공정검사',
          value: '공정검사'
        }
      ]
    }
  }
}
</script>
