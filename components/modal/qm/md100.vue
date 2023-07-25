<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      품질검사그룹 등록
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
        <template #default>
          <SJForm>
            <SJFormRow>
              <SJFormField label="사업장">
                <SJSelect
                  id="md1"
                  name="사업장"
                  :options="MD_01"
                />
              </SJFormField>
              <SJFormField label="검사그룹코드">
                <SJInput
                  id="md2"
                  name="검사그룹코드"
                  rules="required|max:12"
                  disabled
                />
              </SJFormField>
              <SJFormField label="검사그룹명">
                <SJInput
                  id="md3"
                  name="검사그룹명"
                  rules="required|max:12"
                  disabled
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
              <SJFormField label="검사유형">
                <SJSelect
                  id="md5"
                  name="검사유형"
                  :options="MD_03"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="파일첨부">
                <SJFileUpload2 id="md6" name="파일첨부" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="비고">
                <SJTextarea id="md7" name="비고" />
              </SJFormField>
            </SJFormRow>
          </sjform>
          <SJTab :list="tabList">
            <template #tab-1>
              <SJTitle title="목록">
                <button class="btn-blue-bg">
                  검사항목적용
                </button>
                <button class="btn-white-bg">
                  삭제
                </button>
              </SJTitle>
              <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
            </template>
            <template #tab-2>
              <SJTitle title="목록">
                <button class="btn-blue-bg">
                  검사불량적용
                </button>
                <button class="btn-white-bg">
                  삭제
                </button>
              </SJTitle>
              <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
            </template>
            <template #tab-3>
              <SJTitle title="목록">
                <button class="btn-blue-bg">
                  품목적용
                </button>
                <button class="btn-white-bg">
                  삭제
                </button>
              </SJTitle>
              <SJGrid ref="grid_tab3" v-model="grid_tab3.data" :columns="grid_tab3.columns" />
            </template>
          </SJtab>
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
          { name: '검사항목코드', width: 100 },
          { name: '검사항목명', width: 150 },
          { name: '검사유형', width: 100 },
          { name: '검사단위', width: 100 },
          { name: '관리SPEC', width: 250 },
          { name: '정렬', width: 80 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '불량코드', width: 100 },
          { name: '불량명', width: 100 },
          { name: '비고', width: 200 },
          { name: '정렬', width: 80 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab3: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 150 },
          { name: 'REV', width: 80 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 80 },
          { name: '기준단위', width: 80 },
          { name: '정렬', width: 80 },
          { name: '사용여부', width: 80 }
        ]
      },
      tabList: [
        { id: 1, title: '검사항목' },
        { id: 2, title: '검사불량' },
        { id: 3, title: '검사품목' }
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
    close () {
      this.$refs.modal.hide()
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
