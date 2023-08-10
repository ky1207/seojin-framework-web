<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="지시일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="제조오더번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="지시상태">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: 'LOCK',value: 'LOCK'},{text: '지시대기',value: '지시대기'},{text: '가동중',value: '가동중'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>
    <template #bodyTitle />
    <template #body>
      <SJTab :list="tabList">
        <template #tab-1>
          <div style="width: 100%; display: table;">
            <div style="display: table-row; height: 100px;">
              <div style="width: 30%; display: table-cell; ">
                <SJGrid ref="grid1" v-model="grid1.data" :columns="grid1.columns" />
              </div>
              <div style="display: table-cell;">
                <SJTitle title="상세정보" />
                <SJForm>
                  <SJFormRow>
                    <SJFormField label="회사">
                      <SJSelect
                        id="searchCompany"
                        name=""
                        :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
                        disabled-validation
                        disabled-first-message
                      />
                    </SJFormField>
                    <SJFormField label="제조오더번호">
                      <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
                    </SJFormField>
                    <SJFormField label="착수예정일">
                      <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
                    </SJFormField>
                    <SJFormField label="완료예정일">
                      <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
                    </SJFormField>
                  </SJFormRow>
                  <SJFormRow>
                    <SJFormField label="품목코드">
                      <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
                    </SJFormField>
                    <SJFormField label="품목명">
                      <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
                    </SJFormField>
                    <SJFormField label="규격">
                      <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
                    </SJFormField>
                    <SJFormField label="재작업여부">
                      <SJSelect
                        id="searchCompany"
                        name=""
                        :options="[{text: 'Y',value: 'Y'},{text: 'N',value: 'N'}]"
                        disabled-validation
                        disabled-first-message
                      />
                    </SJFormField>
                  </SJFormRow>
                  <SJFormRow>
                    <SJFormField label="단위">
                      <SJSelect
                        id="searchCompany"
                        name=""
                        :options="[{text: 'L',value: 'L'},{text: 'EA',value: 'EA'}]"
                        disabled-validation
                        disabled-first-message
                      />
                    </SJFormField>
                    <SJFormField label="지시수량">
                      <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
                    </SJFormField>
                    <SJFormField label="담당자">
                      <SJItemEditor id="search" name="search" />
                    </SJFormField>
                    <SJFormField label="계획번호(MPS)">
                      <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
                    </SJFormField>
                  </SJFormRow>
                </SJForm>
                <SJTitle title="자재준비현황">
                  <button class="btn-blue-bg">
                    불출지시서발행
                  </button>
                </SJTitle>
                <SJGrid ref="grid2" v-model="grid2.data" :columns="grid2.columns" />
              </div>
            </div>
          </div>
        </template>
        <template #tab-2>
          <SJTitle title="불출지시서">
            <button class="btn-blue-bg">
              불출지시서출력
            </button>
            <button class="btn-blue-bg">
              발행취소
            </button>
          </SJTitle>
          <SJGrid ref="grid3" v-model="grid3.data" :columns="grid3.columns" :options="grid3.options" />
          <SJTitle title="불출대상리스트">
            <button class="btn-blue-bg">
              발행취소
            </button>
          </SJTitle>
          <SJGrid ref="grid4" v-model="grid4.data" :columns="grid4.columns" />
        </template>
      </SJtab>
    </template>
  </SJSearchOneLayout>
</template>

<script>
// 메뉴 화면
// 기능권한버튼을 사용하는 경우
import { MENU, ACTION } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: {},
      search: {},
      inputData: {},
      grid1: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '수주번호', width: 100 },
          { name: '제조오더번호', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '오더상태', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '불출일자', width: 100 },
          { name: '제조오더번호', width: 100 },
          { name: '공정', width: 100 },
          { name: 'BOM순번', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: 'FreeStock', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '자재창고재고', width: 100 },
          { name: '원자재창고재고', width: 100 },
          { name: '발주잔량', width: 100 },
          { name: '수입검사대기', width: 100 },
          { name: '예약수량', width: 100 },
          { name: 'Kitting수량', width: 100 },
          { name: '불량수량', width: 100 },
          { name: '이동잔량', width: 100 }
        ]
      },
      grid3: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 200
        },
        columns: [
          { name: '제조오더번호', width: 100 },
          { name: '오더일자', width: 100 },
          { name: '불출지시번호', width: 100 },
          { name: '발행일자', width: 100 },
          { name: '품목수', width: 100 }
        ]
      },
      grid4: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '불출일자', width: 100 },
          { name: '제조오더번호', width: 100 },
          { name: '불출지시그룹', width: 100 },
          { name: '공정', width: 100 },
          { name: '우선순위', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '규격', width: 100 },
          { name: 'FreeStock', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '자재창고재고', width: 100 },
          { name: '원자재창고재고', width: 100 },
          { name: '발주잔량', width: 100 },
          { name: '수입검사대기', width: 100 },
          { name: '예약수량', width: 100 },
          { name: 'Kitting수량', width: 100 },
          { name: '불량수량', width: 100 },
          { name: '이동잔량', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '미발행' },
        { id: 2, title: '발행' }
      ]
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        }
      }
    }
  }
}
</script>
