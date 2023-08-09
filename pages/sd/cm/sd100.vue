<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="sd1"
          name="sd1"
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="거래처유형">
        <SJSelect id="sd2" name="sd2" :options="[{text: '매입처',value: '매입처'},{text: '매출처',value: '매출처'}]" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJSelectInput id="sd3" v-model="search.company" name="sd3" :options="selectinput" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect id="sd4" name="sd4" :options="[{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]" />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle title="거래처목록" />
    </template>
    <template #left>
      <SJGrid ref="large" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle title="거래처정보">
        <button class="btn-blue-bg">
          신규
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJAccordion :accordion-id="'myAccordion'" :sections="accordionSections">
          <template #section="{ section }">
            <!-- 사업자정보 -->
            <template v-if="section.title === '사업자정보'">
              <SJFormRow>
                <SJFormField label="거래처코드">
                  <SJInput id="coCode" v-model="inputData.CO_CODE" name="거래처코드" rules="required" />
                </SJFormField>
                <SJFormField label="사용여부">
                  <SJSelect id="useYn" name="사용여부" :options="[{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]" rules="required" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="거래처유형">
                  <SJSelect id="coType" name="거래처유형" :options="[{text: '매입처',value: '매입처'},{text: '매출처',value: '매출처'}]" rules="required" />
                </SJFormField>
                <SJFormField label="거래처형태">
                  <SJSelect id="coForm" name="거래처형태" :options="[{text: '공급처',value: '공급처'},{text: '세금계산서발행처',value: '세금계산서발행처'},{text: '지급처',value: '지급처'}]" rules="required" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="사업자등록번호">
                  <SJInput id="coRegNo" v-model="inputData.CO_REG_NO" name="사업자등록번호" rules="required" />
                </SJFormField>
                <SJFormField label="대표자명">
                  <SJInput id="coForm" v-model="inputData.CO_FORM" name="대표자명" rules="required" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="거래처명(전명)">
                  <SJInput id="coType1" v-model="inputData.CO_TYPE" name="거래처명(전명)" rules="required" />
                </SJFormField>
                <SJFormField label="거래처명(약명)">
                  <SJInput id="representativeName" v-model="inputData.REPRESENTATIVE_NAME" name="거래처명(약명)" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="대표이메일">
                  <SJInput id="representativeEmail" v-model="inputData.REPRESENTATIVE_EMAIL" name="대표이메일" />
                </SJFormField>
                <SJFormField label="사내/외">
                  <SJSelect id="companyType" name="사내/외" :options="[{text: '사내',value: '사내'},{text: '사외',value: '사외'}]" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="업태">
                  <SJSelect id="businessStatus" name="업태" :options="[{text: '서비스',value: '서비스'},{text: '전자부품',value: '전자부품'},{text: '기타',value: '기타'}]" rules="required" />
                </SJFormField>
                <SJFormField label="업종">
                  <SJSelect id="businessType" name="업종" :options="[{text: '제조업',value: '제조업'},{text: '도매',value: '도매'}]" rules="required" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="거래시작일">
                  <SJInput id="tradeStartDay" v-model="inputData.TRADE_START_DAY" name="거래시작일" />
                </SJFormField>
                <SJFormField label="거래종료일">
                  <SJInput id="tradeEndDay" v-model="inputData.TRADE_END_DAY" name="거래종료일" />
                </SJFormField>
              </SJFormRow>
            </template>
            <!-- 일반정보 -->
            <template v-if="section.title === '일반정보'">
              <SJFormRow>
                <SJFormField label="거래처분류">
                  <SJInput id="coGroup" v-model="inputData.CO_GROUP" name="거래처분류" rules="required" />
                </SJFormField>
                <SJFormField label="국가">
                  <SJSelect id="nation" name="국가" :options="[{text: '대한민국',value: '대한민국'},{text: '베트남',value: '베트남'}]" rules="required" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="주소">
                  <SJInput id="address" v-model="inputData.ADDRESS" name="주소" rules="required" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="영문주소">
                  <SJInput id="engAddress" v-model="inputData.ENG_ADDRESS" name="영문주소" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="대표전화번호">
                  <SJInput id="representativeTelNo" v-model="inputData.REPRESENTATIVE_TEL_NO" name="대표전화번호" rules="required" />
                </SJFormField>
                <SJFormField label="FAX번호">
                  <SJInput id="fax" v-model="inputData.FAX" name="FAX번호" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="영업담당자명1">
                  <SJInput id="traderName1" v-model="inputData.TRADER_NAME1" name="영업담당자명1" />
                </SJFormField>
                <SJFormField label="영업담당자연락처1">
                  <SJInput id="traderTelNo1" v-model="inputData.TRADER_TEL_NO1" name="영업담당자연락처1" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="영업담당자명2">
                  <SJInput id="traderName2" v-model="inputData.TRADER_NAME2" name="영업담당자명2" />
                </SJFormField>
                <SJFormField label="영업담당자연락처2">
                  <SJInput id="traderTelNo2" v-model="inputData.TRADER_TEL_NO2" name="영업담당자연락처2" />
                </SJFormField>
              </SJFormRow>
            </template>
            <!-- 업무정보 -->
            <template v-if="section.title === '업무정보'">
              <SJFormRow>
                <SJFormField label="운송방법">
                  <SJSelect id="transWay" name="운송방법" :options="common.USE_YN" />
                </SJFormField>
                <SJFormField label="운송L/T">
                  <SJSelect id="transLt" name="운송L/T" :options="common.USE_YN" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="거래처담당자명">
                  <SJInput id="clientName" v-model="inputData.CLIENT_NAME" name="거래처담당자명" />
                </SJFormField>
                <SJFormField label="거래처담당자연락처">
                  <SJInput id="clientTelNo" v-model="inputData.CLIENT_TEL_NO" name="거래처담당자연락처" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="수수료율">
                  <SJInput id="chargeRate" v-model="inputData.CHARGE_RATE" name="수수료율" />
                </SJFormField>
                <SJFormField label="납품시검사방법">
                  <SJSelect id="checkWay" name="납품시검사방법" :options="common.USE_YN" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="SCM사용여부">
                  <SJSelect id="scmYn" name="SCM사용여부" :options="[{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]" />
                </SJFormField>
                <SJFormField label="발주형태">
                  <SJInput id="orderType" v-model="inputData.ORDER_TYPE" name="발주형태" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="부가세포함여부">
                  <SJSelect id="surtaxYn" name="부가세포함여부" :options="[{text: '포함',value: '포함'},{text: '포함안함',value: '포함안함'}]" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="비고">
                  <SJInput id="desc" v-model="inputData.DESC" name="비고" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="파일첨부">
                  <SJInput id="fileUpload" v-model="inputData.FILE_UPLOAD" name="파일첨부" />
                </SJFormField>
              </SJFormRow>
            </template>
            <!-- 회계정보 -->
            <template v-if="section.title === '회계정보'">
              <SJFormRow>
                <SJFormField label="통화">
                  <SJSelect id="currency" name="통화" :options="[{text: 'WON',value: 'WON'},{text: 'DOLLAR',value: 'DOLLAR'}]" rules="required" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="부가세형태">
                  <SJSelect id="supertaxType" name="부가세형태" :options="[{text: '',value: ''},{text: '',value: ''}]" rules="required" />
                </SJFormField>
                <SJFormField label="부가세율">
                  <SJInput id="supertaxRate" v-model="inputData.SUPERTAX_RATE" name="부가세율" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="결제조건">
                  <SJInput id="payCondition" v-model="inputData.PAY_CONDITION" name="결제조건" rules="required" />
                </SJFormField>
                <SJFormField label="결제방법">
                  <SJInput id="payWay" v-model="inputData.PAY_WAY" name="결제방법" rules="required" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="금융기관">
                  <SJSelect id="financialCompany" name="금융기관" :options="[{text: '기업은행',value: '기업은행'},{text: '신한은행',value: '신한은행'}]" />
                </SJFormField>
                <SJFormField label="예금주">
                  <SJInput id="accountHolder" v-model="inputData.ACCOUNT_HOLDER" name="예금주" />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="계좌번호">
                  <SJInput id="accountNumber" v-model="inputData.ACCOUNT_NUMBER" name="계좌번호" />
                </SJFormField>
                <SJFormField label="이메일계산서">
                  <SJInput id="emailBill" v-model="inputData.EMAIL_BILL" name="이메일계산서" />
                </SJFormField>
              </SJFormRow>
            </template>
          </template>
        </SJAccordion>
        <SJFormRow>
          <SJFormField label="등록일시">
            2023-06-01 01:01:59
          </SJFormField>
          <SJFormField label="등록자">
            홍길동
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="수정일시">
            2023-06-01 01:01:59
          </SJFormField>
          <SJFormField label="수정자">
            홍길동
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      common: {},
      search: {},
      inputData: {
        coCode: '',
        coType: '',
        coForm: ''
      },
      grid: {
        data: {},
        columns: [
          { name: '거래처코드', width: 100 },
          { name: '거래처명' },
          { name: '거래처유형', width: 100 },
          { name: '사업자등록번호', width: 100 },
          { name: '대표자' },
          { name: '업태' },
          { name: '업종', width: 100 },
          { name: '사용여부', width: 100 }
        ]
      },
      accordionSections: [
        {
          title: '사업자정보',
          expanded: true
        },
        {
          title: '일반정보',
          expanded: false
        },
        {
          title: '업무정보',
          expanded: false
        },
        {
          title: '회계정보',
          expanded: false
        }
      ]
    }
  },
  created () {
    this.selectinput = this.getSelectinput()
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        async saveClick () {
          await fnc.$notify.success('저장')
        }
      }
    },
    getSelectinput () {
      return [
        {
          text: '거래처코드',
          value: 'A1'
        },
        {
          text: '거래처명',
          value: 'B1'
        }
      ]
    }
  }
}
</script>
