<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      품목정보등록
    </template>
    <template #button>
      <button class="btn-blue-bg">
        저장
      </button>
      <button class="btn-gray-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="기준정보" />
        </template>
        <template #default>
          <SJForm>
            <SJFormRow>
              <SJFormField label="품번">
                <SJInput id="md1" name="품번" />
              </SJFormField>
              <SJFormField label="구)품번">
                <SJInput id="md1" name="구품번" />
              </SJFormField>
              <SJFormField label="품목명">
                <SJInput id="md2" name="품목명" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="규격">
                <SJInput id="md2" name="규격" />
              </SJFormField>

              <SJFormField label="모델">
                <SJInput id="md2" name="모델" />
              </SJFormField>
              <SJFormField label="품명약어">
                <SJInput id="md2" name="품명약어" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="기준단위">
                <SJInput id="md2" name="기준단위" />
              </SJFormField>
              <SJFormField label="고객처">
                <SJInput id="md2" name="고객처" />
              </SJFormField>
              <SJFormField label="고객처품번">
                <SJInput id="md2" name="고객처품번" />
              </SJFormField>
            </SJFormRow>

            <!--              <SJFormField label="사용여부">-->
            <!--                <SJSelect-->
            <!--                  id="md6"-->
            <!--                  name="사용여부"-->
            <!--                  :options="MD_03"-->
            <!--                />-->
            <!--              </SJFormField>-->

            <SJTab :list="tabList" style="height: 400px;">
              <template #tab-1>
                <SJTitle title="표준항목" />
                <SJFormRow>
                  <SJFormField label="사업구분">
                    <SJSelect id="md7" name="사업구분" disabled-first-message :options="[{text: 'A-공통',value: 'A'},{text: 'B-통신',value: 'B'},{text: '...',value: '...'}]" />
                  </SJFormField>
                  <SJFormField label="품목구분">
                    <SJSelect id="md7" name="품목구분" disabled-first-message :options="[{text: 'A-제품',value: 'A'},{text: 'B-반제품',value: 'B'},{text: '...',value: '...'}]" />
                  </SJFormField>
                  <SJFormField label="품목유형">
                    <SJSelect id="md7" name="품목유형" disabled-first-message :options="[{text: 'AL-알루미늄',value: 'A'},{text: 'ST-철판',value: 'B'},{text: '...',value: '...'}]" />
                  </SJFormField>
                  <SJFormField label="집중관리">
                    <SJSelect id="md7" name="집중관리" disabled-first-message :options="[{text: 'KOREA 3.5G BKT-MCT',value: 'A'},{text: 'ANTENNA',value: 'B'},{text: '...',value: '...'}]" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="Air-leak">
                    <SJSelect id="md7" name="Air-leak" :options="MD_05" />
                  </SJFormField>
                  <SJFormField label="AL_T/Time(초)">
                    <SJInput id="md7" name="AL_T" />
                  </SJFormField>
                  <SJFormField label="AL_R/Time(초)">
                    <SJInput id="md7" name="AL_R" />
                  </SJFormField>
                  <SJFormField />
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="URL">
                    <SJInput id="md7" name="URL" />
                  </SJFormField>
                  <SJFormField label="표준원가">
                    <SJInput id="md7" name="표준원가" />
                  </SJFormField>
                  <SJFormField label="조달방법">
                    <SJSelect
                      id="md8"
                      name="조달방법"
                      :options="MD_04"
                      rules="required|min_value:1"
                    />
                  </SJFormField>
                  <SJFormField />
                </SJFormRow>

                <SJTitle title="(설변)단종정보" />
                <SJFormRow>
                  <SJFormField label="단종여부">
                    <SJSelect id="md14" name="단종여부" :options="MD_05" />
                  </SJFormField>
                  <SJFormField label="적용일자">
                    <SJDatePicker id="md14" name="적용일자" />
                  </SJFormField>
                  <SJFormField label="잔여수량">
                    <SJInput id="md14" name="잔여수량" />
                  </SJFormField>
                  <SJFormField label="고객담당">
                    <SJInput id="md14" name="고객담당" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="예보관리여부">
                    <SJSelect id="md14" name="예보관리여부" :options="MD_05" />
                  </SJFormField>
                  <SJFormField label="예보관리일자">
                    <SJDatePicker id="md14" name="예보관리일자" />
                  </SJFormField>
                  <SJFormField label="단종내역">
                    <SJInput id="md14" name="단종내역" />
                  </SJFormField>
                  <SJFormField />
                </SJFormRow>
              </template>
              <template #tab-2>
                <SJTitle title="영업" />
                <SJFormRow>
                  <SJFormField label="영업담당자">
                    <SJInput id="md14" name="영업담당자" />
                  </SJFormField>
                  <SJFormField label="가공시간">
                    <SJInput id="md14" name="가공시간" />
                  </SJFormField>
                  <SJFormField label="가공임율">
                    <SJInput id="md15" name="가공임율" />
                  </SJFormField>
                  <SJFormField label="TEST시간">
                    <SJInput id="md16" name="TEST시간" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="TEST임율">
                    <SJInput id="md17" name="TEST임율" />
                  </SJFormField>
                  <SJFormField label="Country of Origin">
                    <SJInput id="md18" name="Country of Origin" />
                  </SJFormField>
                  <SJFormField />
                  <SJFormField />
                </SJFormRow>
                <SJTitle title="구매" />
                <SJFormRow>
                  <SJFormField label="구매요청부서">
                    <SJInput id="md14" name="구매요청부서" />
                  </SJFormField>
                  <SJFormField label="구매담당자">
                    <SJInput id="md14" name="구매담당자" />
                  </SJFormField>
                  <SJFormField label="재고관리단가">
                    <SJInput id="md47" name="재고관리단가" />
                  </SJFormField>
                  <SJFormField label="입고단위변경여부">
                    <SJInput id="md47" name="입고단위변경여부" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="구매단위">
                    <SJSelect
                      id="md43"
                      name="구매단위"
                      :options="MD_02"
                    />
                  </SJFormField>
                  <SJFormField label="구매L/T(일)">
                    <SJInput id="md44" name="구매L/T(일)" rules="required|min_value:1" />
                  </SJFormField>

                  <SJFormField label="선행일">
                    <SJInput id="md7" name="선행일" />
                  </SJFormField>
                  <SJFormField />
                </SJFormRow>
              </template>
              <template #tab-3>
                <SJTitle title="자재" />
                <SJFormRow>
                  <SJFormField label="입고창고">
                    <SJSelect
                      id="md23"
                      name="입고창고"
                      :options="MD_07"
                    />
                  </SJFormField>
                  <SJFormField label="관리창고">
                    <SJInput id="md24" name="관리창고" />
                  </SJFormField>
                  <SJFormField label="저장위치">
                    <SJInput id="md24" name="저장위치" />
                  </SJFormField>

                  <SJFormField />
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="출고창고">
                    <SJSelect
                      id="md25"
                      name="출고창고"
                      :options="MD_07"
                    />
                  </SJFormField>
                  <SJFormField label="선입선출">
                    <SJSelect
                      id="md26"
                      name="선입선출"
                      :options="MD_03"
                    />
                  </SJFormField>
                  <SJFormField label="출고방식">
                    <SJSelect id="md47" name="출고방식" disabled-first-message :options="[{text: '',value: ''},{text: 'KIT',value: 'kIT'}]" />
                  </SJFormField>
                  <SJFormField label="출고단위">
                    <SJSelect
                      id="md27"
                      name="출고단위"
                      :options="MD_02"
                    />
                  </SJFormField>
                </SJFormRow>
                <SJTitle title="품질" />
                <SJFormRow>
                  <SJFormField label="검사방법(입고)">
                    <SJSelect
                      id="md21"
                      name="검사방법(입고)"
                      :options="MD_06"
                    />
                  </SJFormField>
                  <SJFormField label="입고검사">
                    <SJSelect
                      id="md20"
                      name="입고검사"
                      :options="MD_05"
                    />
                  </SJFormField>
                  <SJFormField label="검사방법(출하)">
                    <SJSelect
                      id="md21"
                      name="검사방법(출하)"
                      :options="MD_06"
                    />
                  </SJFormField>
                  <SJFormField label="출하검사">
                    <SJSelect
                      id="md22"
                      name="출하검사"
                      :options="MD_05"
                    />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-4>
                <SJTitle title="제조" />
                <SJFormRow>
                  <SJFormField label="계획방식">
                    <SJSelect id="md40" name="계획방식" :options="MD_08" disabled-first-message />
                  </SJFormField>
                  <SJFormField label="LOT관리">
                    <SJSelect id="md28" name="LOT관리" :options="MD_03" disabled-first-message />
                  </SJFormField>
                  <SJFormField label="투입단위">
                    <SJSelect
                      id="md29"
                      name="투입단위"
                      :options="MD_02"
                    />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="수율">
                    <SJInput id="md32" name="Loss율" />
                  </SJFormField>
                  <SJFormField label="제조L/T(일)">
                    <SJInput id="md36" name="제조L/T(일)" rules="required|min_value:1" />
                  </SJFormField>
                  <SJFormField />
                </SJFormRow>

                <SJFormRow>
                  <SJFormField label="MAX">
                    <SJInput id="md37" name="MAX" />
                  </SJFormField>
                  <SJFormField label="MIN">
                    <SJInput id="md38" name="MIN" />
                  </SJFormField>
                  <SJFormField label="LOT">
                    <SJInput id="md39" name="LOT" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow />
              </template>
              <template #tab-5>
                <SJTitle title="중량/면적" />
                <SJFormRow>
                  <SJFormField label="투입중량(kg)">
                    <SJInput id="md37" name="투입중량" />
                  </SJFormField>
                  <SJFormField label="제품중량(kg)">
                    <SJInput id="md37" name="제품중량" />
                  </SJFormField>
                  <SJFormField label="가공중량(kg)">
                    <SJInput id="md37" name="가공중량" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="총표면적(dm2)">
                    <SJInput id="md37" name="총표면적" />
                  </SJFormField>
                  <SJFormField label="도금표면적(dm2)">
                    <SJInput id="md37" name="제품중량" />
                  </SJFormField>
                  <SJFormField label="도료중량(kg)">
                    <SJInput id="md37" name="가공중량" />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-6>
                <SJTitle title="물류" />
                <SJFormRow>
                  <SJFormField label="분류">
                    <SJInput id="md37" name="분류" />
                  </SJFormField>
                  <SJFormField label="포장단위수량">
                    <SJInput id="md37" name="포장단위수량" />
                  </SJFormField>
                  <SJFormField />
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="Box-Spec">
                    <SJInput id="md37" name="Box-Spec" />
                  </SJFormField>
                  <SJFormField label="Pallet">
                    <SJInput id="md37" name="Pallet" />
                  </SJFormField>
                  <SJFormField label="Bar-Code Type">
                    <SJSelect id="md37" name="Bar-Code " :options="[{text:'PALLET',value:'p'},{text:'BOX',value:'b'},{text:'SINGLE',value:'s'}]" />
                  </SJFormField>
                </SJFormRow>
              </template>
              <template #tab-7>
                <SJTitle title="5점관리" />
                <SJFormRow>
                  <SJFormField label="사진">
                    <SJInput id="md37" name="사진" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="도면">
                    <SJInput id="md37" name="도면" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="작업표준서">
                    <SJInput id="md37" name="작업표준서" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="검사기준서">
                    <SJInput id="md37" name="검사기준서" />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="승인원">
                    <SJInput id="md37" name="승인원" />
                  </SJFormField>
                </SJFormRow>
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
      tabList: [
        { id: 1, title: '표준항목/(설변)단종정보' },
        { id: 2, title: '영업/구매' },
        { id: 3, title: '자재/품질' },
        { id: 4, title: '제조' },
        { id: 5, title: '중량/면적' },
        { id: 6, title: '물류' },
        { id: 7, title: '5점관리' }
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
          text: '-',
          value: '-'
        },
        {
          text: 'MRP',
          value: 'MRP'
        },
        {
          text: 'ROP',
          value: 'ROP'
        }

      ]
    }
  }
}
</script>
