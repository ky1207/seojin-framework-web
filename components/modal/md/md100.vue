<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      품목정보등록
    </template>
    <template #button>
      <button class="btn-gray-bg">
        저장
      </button>
      <button class="btn-gray-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJTitle title="기준정보" />
      <SJSearchOneLayout disabled-navigator-wrap>
        <template #default>
          <SJSearchField label="품목코드">
            <SJInput id="md1" v-model="search.md1" name="품목코드" />
          </SJSearchField>
          <SJSearchField label="코드명">
            <SJInput id="md2" v-model="search.md2" name="코드명" />
          </SJSearchField>
          <SJSearchField label="품목유형">
            <SJSelect
              id="md3"
              name="품목유형"
              :options="MD_01"
              class="md-select"
            />
          </SJSearchField>
          <SJSearchField label="품목분류">
            <SJInput id="md4" v-model="search.md4" name="품목분류" />
          </SJSearchField>
          <SJSearchField label="품목코드">
            <SJInput id="md5" v-model="search.md5" name="품목코드" />
          </SJSearchField>
          <SJSearchField label="기준단위">
            <SJSelect
              id="md5"
              name="기준단위"
              :options="MD_02"
            />
          </SJSearchField>
          <SJSearchField label="사용여부">
            <SJSelect
              id="md6"
              name="사용여부"
              :options="MD_03"
            />
          </SJSearchField>
        </template>
        <template #body>
          <SJForm>
            <SJTab :list="tabList">
              <template #tab-1>
                <SJTitle title="표준항목" />
                <SJFormRow>
                  <SJFormField label="표준원가">
                    <SJInput id="md7" v-model="search.md7" name="표준원가" />
                  </SJFormField>
                  <SJFormField label="조달방법">
                    <SJSelect
                      id="md8"
                      name="조달방법"
                      :options="MD_04"
                      rules="required|min_value:1"
                    />
                  </SJFormField>
                  <SJFormField label="CE!구분">
                    <SJInput id="md9" v-model="search.md9" name="CE!구분" rules="required|min_value:1" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="REV번호">
                    <SJInput id="md10" v-model="search.md10" name="REV번호" rules="required|min_value:1" />
                  </SJFormField>
                  <SJFormField label="크리티컬여부">
                    <SJSelect
                      id="md11"
                      name="크리티컬여부"
                      :options="MD_05"
                    />
                  </SJFormField>
                  <SJFormField label="크리티컬등급">
                    <SJInput id="md12" v-model="search.md12" name="크리티컬등급" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="사진" style="width: 100%;">
                    <SJTextarea id="md13" name="사진" />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-2>
                <SJTitle title="영업" />
                <SJFormRow>
                  <SJFormField label="가공시간">
                    <SJInput id="md14" v-model="search.md14" name="가공시간" />
                  </SJFormField>
                  <SJFormField label="가공임율">
                    <SJInput id="md15" v-model="search.md15" name="가공임율" />
                  </SJFormField>
                  <SJFormField label="TEST시간">
                    <SJInput id="md16" v-model="search.md16" name="TEST시간" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="TEST임율">
                    <SJInput id="md17" v-model="search.md17" name="TEST임율" />
                  </SJFormField>
                  <SJFormField label="Country of Origin">
                    <SJInput id="md18" v-model="search.md18" name="Country of Origin" />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-3>
                <SJTitle title="품질" />
                <SJFormRow>
                  <SJFormField label="검사방법(입고)">
                    <SJInput id="md19" v-model="search.md19" name="검사방법(입고)" class="md-input" />
                  </SJFormField>
                  <SJFormField label="입고검사">
                    <SJSelect
                      id="md20"
                      class="md-select"
                      name="입고검사"
                      :options="MD_05"
                    />
                  </SJFormField>
                  <SJFormField label="검사방법(출하)">
                    <SJSelect
                      id="md21"
                      class="md-select"
                      name="검사방법(출하)"
                      :options="MD_06"
                    />
                  </SJFormField>
                  <SJFormField label="출하검사">
                    <SJSelect
                      id="md22"
                      class="md-select"
                      name="출하검사"
                      :options="MD_05"
                    />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-4>
                <SJTitle title="자재" />
                <SJFormRow>
                  <SJFormField label="입고창고">
                    <SJSelect
                      id="md23"
                      name="입고창고"
                      :options="MD_07"
                    />
                  </SJFormField>
                  <SJFormField label="기본랙위치">
                    <SJInput id="md24" v-model="search.md24" name="기본랙위치" />
                  </SJFormField>
                  <SJFormField label="출고창고">
                    <SJSelect
                      id="md25"
                      name="출고창고"
                      :options="MD_07"
                    />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="선입선출">
                    <SJSelect
                      id="md26"
                      name="선입선출"
                      :options="MD_03"
                    />
                  </SJFormField>
                  <SJFormField label="출고단위">
                    <SJSelect
                      id="md27"
                      name="출고단위"
                      :options="MD_02"
                    />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-5>
                <SJTitle title="제조" />
                <SJFormRow>
                  <SJFormField label="LOT관리">
                    <SJSelect
                      id="md28"
                      name="LOT관리"
                      :options="MD_03"
                    />
                  </SJFormField>
                  <SJFormField label="투입관리">
                    <SJSelect
                      id="md29"
                      name="투입관리"
                      :options="MD_02"
                    />
                  </SJFormField>
                  <SJFormField label="검수여부">
                    <SJSelect
                      id="md30"
                      name="검수여부"
                      :options="MD_05"
                    />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="생산Gap(일)">
                    <SJInput id="md31" v-model="search.md31" name="생산Gap(일)" rules="required|min_value:1" />
                  </SJFormField>
                  <SJFormField label="Loss율">
                    <SJInput id="md32" v-model="search.md32" name="Loss율" />
                  </SJFormField>
                  <SJFormField label="기준수량(S/T)">
                    <SJInput id="md33" v-model="search.md33" name="기준수량(S/T)" rules="required|min_value:1" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="생산Gap(일)">
                    <SJInput id="md34" v-model="search.md34" name="생산Gap(일)" rules="required|min_value:1" />
                  </SJFormField>
                  <SJFormField label="올림수">
                    <SJInput id="md35" v-model="search.md35" name="올림수" />
                  </SJFormField>
                  <SJFormField label="제조L/T(일)">
                    <SJInput id="md36" v-model="search.md36" name="제조L/T(일)" rules="required|min_value:1" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="최소LOT수량">
                    <SJInput id="md37" v-model="search.md37" name="최소LOT수량" />
                  </SJFormField>
                  <SJFormField label="최대LOT수량">
                    <SJInput id="md38" v-model="search.md38" name="최대LOT수량" />
                  </SJFormField>
                  <SJFormField label="안전재고">
                    <SJInput id="md39" v-model="search.md39" name="안전재고" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="대상구분">
                    <SJSelect
                      id="md40"
                      name="대상구분"
                      :options="MD_08"
                    />
                  </SJFormField>
                  <SJFormField label="FreeStock">
                    <SJSelect
                      id="md41"
                      name="FreeStock"
                      :options="MD_03"
                    />
                  </SJFormField>
                  <SJFormField label="HS CODE">
                    <SJInput id="md42" v-model="search.md42" name="HS CODE" />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-6>
                <SJTitle title="구매" />
                <SJFormRow>
                  <SJFormField label="구매단위">
                    <SJSelect
                      id="md43"
                      name="구매단위"
                      :options="MD_02"
                    />
                  </SJFormField>
                  <SJFormField label="구매L/T(일)">
                    <SJInput id="md44" v-model="search.md44" name="구매L/T(일)" rules="required|min_value:1" />
                  </SJFormField>
                  <SJFormField label="입고필요일">
                    <SJInput id="md45" v-model="search.md45" name="입고필요일" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="구매조직">
                    <SJInput id="md46" v-model="search.md46" name="구매조직" />
                  </SJFormField>
                  <SJFormField label="초품여부">
                    <SJInput id="md47" v-model="search.md47" name="초품여부" />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-7>
                <SJTitle title="기타" />
                <SJFormRow>
                  <SJFormField label="비고" style="width: 100%;">
                    <SJTextarea id="md48" name="비고" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="파일첨부" style="width: 100%;">
                    <SJFileUpload2 id="md48" name="파일첨부" />
                  </SJFormField>
                </SJFormRow>
              </template>
            </SJtab>
          </SJform>
        </template>
      </SJSearchOneLayout>
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
      tabList: [
        { id: 1, title: '표준항목' },
        { id: 2, title: '영업' },
        { id: 3, title: '품질' },
        { id: 4, title: '자재' },
        { id: 5, title: '제조' },
        { id: 6, title: '구매' },
        { id: 7, title: '기타' }
      ]
    }
  },
  created () {
    this.options = []
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
    this.MD_03 = this.getMD03()
    this.MD_04 = this.getMD04()
    this.MD_05 = this.getMD05()
    this.MD_06 = this.getMD06()
    this.MD_07 = this.getMD07()
    this.MD_08 = this.getMD08()
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    close () {
      this.$refs.modal.hide()
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
          text: 'EA',
          value: 'EA'
        },
        {
          text: 'FT',
          value: 'FT'
        },
        {
          text: 'L',
          value: 'L'
        },
        {
          text: 'T',
          value: 'T'
        },
        {
          text: '...',
          value: '...'
        }
      ]
    },
    getMD03 () {
      return [
        {
          text: '-',
          value: '-'
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
    },
    getMD04 () {
      return [
        {
          text: '구매(P)',
          value: '구매(P)'
        },
        {
          text: '생산(M)',
          value: '생산(M)'
        },
        {
          text: '외주가공품(O)',
          value: '외주가공품(O)'
        }
      ]
    },
    getMD05 () {
      return [
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
    getMD06 () {
      return [
        {
          text: '전수',
          value: '전수'
        },
        {
          text: '샘플링',
          value: '샘플링'
        }
      ]
    },
    getMD07 () {
      return [
        {
          text: '반도체 원자재(화성)',
          value: '반도체 원자재(화성)'
        },
        {
          text: '반도체 재공(화성)',
          value: '반도체 재공(화성)'
        },
        {
          text: '반도체 완제품(화성)',
          value: '반도체 완제품(화성)'
        },
        {
          text: '반도체 원자재불량(화성)',
          value: '반도체 원자재불량(화성)'
        },
        {
          text: '반도체 반품(화성)',
          value: '반도체 반품(화성)'
        },
        {
          text: '...',
          value: '...'
        }
      ]
    },
    getMD08 () {
      return [
        {
          text: 'MRP',
          value: 'MRP'
        },
        {
          text: 'ROP',
          value: 'ROP'
        },
        {
          text: '비대상',
          value: '비대상'
        }
      ]
    }
  }
}
</script>
<style scoped>
.search-field{
  width: 200px !important;}
form .sj-form-field fieldset{
  width: 250px ;
}
</style>
