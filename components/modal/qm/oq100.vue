<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      출하검사 등록
    </template>
    <template #button>
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
                  id="search1"
                  disabled-first-message
                  name="사업장"
                  :options="[{text: 'A사업부',value: ''},{text: 'B사업부',value: 'B사업부'}]"
                />
              </SJFormField>
              <SJFormField label="LOT번호">
                <SJInput
                  id="search2"
                  name="LOT번호"
                  disabled
                />
              </SJFormField>
              <SJFormField label="거래처">
                <SJInput id="search3" name="거래처" disabled />
              </SJFormField>
              <SJFormField label="창고명">
                <SJInput
                  id="search4"
                  value="반도체 완제품(화성)"
                  name="창고명"
                  disabled
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="품목코드">
                <SJInput
                  id="search5"
                  name="품목코드"
                  disabled
                />
              </SJFormField>
              <SJFormField label="품명">
                <SJInput
                  id="search6"
                  name="품명"
                  disabled
                />
              </SJFormField>
              <SJFormField label="규격">
                <SJInput
                  id="search7"
                  name="규격"
                  disabled
                />
              </SJFormField>
              <SJFormField label="FCID">
                <SJInput
                  id="search8"
                  name="FCID"
                  disabled
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="검사요청수량">
                <SJInput
                  id="search9"
                  name="검사요청수량"
                  disabled
                />
              </SJFormField>
              <SJFormField label="검사번호">
                <SJInput
                  id="search10"
                  name="검사번호"
                  disabled
                />
              </SJFormField>
              <SJFormField label="검사일자">
                <SJDatePicker
                  id="search11"
                  name="검사일자"
                  rules="required|max:12"
                />
              </SJFormField>
              <SJFormField label="담당자">
                TODO:SELECTINPUT
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="검사결과">
                <SJSelect
                  id="search12"
                  disabled-first-message
                  name="검사결과"
                  :options="[{text: '미검사',value: ''},{text: '합격',value: '합격'},{text: '부분합격',value: '부분합격'},{text: '불합격',value: '불합격'}]"
                />
              </SJFormField>
              <SJFormField label="합격수량">
                <SJInput
                  id="search13"
                  name="합격수량"
                  disabled
                />
              </SJFormField>
              <SJFormField label="불합격수량">
                <SJInput
                  id="search14"
                  name="불합격수량"
                  disabled
                />
              </SJFormField>
              <SJFormField label="검사방법">
                <SJSelect
                  id="search15"
                  disabled-first-message
                  name="검사방법"
                  disabled
                  :options="[{text: '전수',value: ''}]"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="Z-TAG Serial">
                <SJInput
                  id="search16"
                  name="Z-TAG Serial"
                  disabled
                />
              </SJFormField>
              <SJFormField label="FCID">
                <SJInput
                  id="search17"
                  name="FCID"
                  disabled
                />
              </SJFormField>
              <SJFormField label="FAB">
                <SJInput
                  id="search18"
                  name="FAB"
                  disabled
                />
              </SJFormField>
              <SJFormField label="고객PO번호">
                <SJInput
                  id="search19"
                  name="고객PO번호"
                  disabled
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="내용">
                <SJTextarea id="search20" name="내용" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="파일첨부">
                <SJFileUpload2 id="search21" name="파일첨부" />
              </SJFormField>
            </SJFormRow>
          </SJForm>
          <SJTitle title="검사내역">
            <button class="btn-white-bg">
              일괄합격
            </button>
          </SJTitle>
          <SJGrid
            ref="grid"
            v-model="grid.data"
            :columns="grid.columns"
          />
        </template>
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      resolve: null,
      reject: null,
      grid: {
        data: {},
        columns: [
          { name: '검사항목명', width: 200 },
          { name: '관리SPEC', width: 100 },
          { name: '검사단위', width: 100 },
          { name: '검사상태', width: 100 },
          { name: '결과(수치)', width: 100 },
          { name: '결과(TEXT)', width: 200 }
        ]
      }
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
