<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      입고검사 등록
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="reg">
        저장
      </button>
      <button class="btn-white-bg" @click="del">
        삭제
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJSearchTLRLayout disabled-navigator-wrap disabled-search>
        <template #topTitle>
          <SJTitle title="등록" />
        </template>
        <template #top>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="회사">
                <SJSelect id="searchCoType" name="회사" :options="common.USE_YN" rules="required" />
              </SJFormField>
              <SJFormField label="납품번호">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="납품번호" rules="required" />
              </SJFormField>
              <SJFormField label="거래처">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="거래처" rules="required" />
              </SJFormField>
              <SJFormField label="납품수량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="납품수량" rules="required" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="품목코드">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목코드" rules="required" />
              </SJFormField>
              <SJFormField label="품명">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="품명" rules="required" />
              </SJFormField>
              <SJFormField label="규격">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="규격" rules="required" />
              </SJFormField>
              <SJFormField label="LOT">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="LOT" rules="required" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="검사요청수량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="검사요청수량" />
              </SJFormField>
              <SJFormField label="검사번호">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="검사번호" />
              </SJFormField>
              <SJFormField label="검사일자">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="검사일자" />
              </SJFormField>
              <SJFormField label="담당자">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="담당자" rules="required" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="검사결과">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="검사결과" rules="required" />
              </SJFormField>
              <SJFormField label="합격수량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="합격수량" />
              </SJFormField>
              <SJFormField label="불합격수량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="불합격수량" />
              </SJFormField>
              <SJFormField label="검사결과">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="검사결과" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="비고">
                <SJTextarea
                  id="textarea"
                  v-model="inputData.content"
                  name="textarea"
                />
              </SJFormField>
            </SJFormRow>
          </SJForm>
        </template>
        <template #leftTitle>
          <SJTitle title="검사내역">
            <button class="btn-white-bg" @click="blockSuccess">
              일괄합격
            </button>
          </SJTitle>
        </template>
        <template #left>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
        </template>
        <template #rightTitle1>
          <SJTitle title="불량내역">
            <button class="btn-white-bg" @click="poorReg">
              불량적용
            </button>
            <button class="btn-white-bg" @click="poorCount">
              불량집계
            </button>
            <button class="btn-white-bg" @click="rowDel">
              삭제
            </button>
          </SJTitle>
        </template>
        <template #right1>
          <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
        </template>
      </SJSearchTLRLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      inputData: {},
      common: {},
      search: {},
      alarmDetail: {},
      grid: {
        data: {},
        columns: [
          {
            name: 'notifyId',
            hidden: true
          },
          {
            name: '검사그룹코드',
            filter: null,
            sortable: false,
            editor: null,
            width: 150
          },
          {
            name: '검사항목명',
            width: 200,
            filter: null,
            sortable: false
          },
          {
            name: '관리SPEC',
            filter: null,
            sortable: false,
            width: 100
          },
          {
            name: '검사단위',
            filter: null,
            sortable: false,
            width: 100
          },
          {
            name: '검사상태',
            filter: null,
            sortable: false,
            width: 100
          },
          {
            name: '결과(수치)',
            filter: null,
            sortable: false,
            width: 100
          },
          {
            name: '검사단위(TEXT)',
            filter: null,
            sortable: false,
            width: 100
          }
        ],
        options: {
          rowHeaders: ['rowNum', 'checkbox'],
          bodyHeight: 250,
          cell: {
            normal: {
              text: 'red'
            }
          }
        }
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 250
        },
        columns: [
          { name: '불량코드', width: 100 },
          { name: '불량명', width: 100 },
          { name: '수량', width: 100 },
          { name: '비고', width: 100 }
        ]
      },
      resolve: null,
      reject: null
    }
  },
  methods: {
    open () {
      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.$refs.form.reset()

      this.$refs.modal.hide()
      this.resolve(false)
    },
    async reg () {
      await this.$notify.success('입고검사 등록')
    },
    async del () {
      await this.$notify.success('입고검사 삭제')
    },
    async blockSuccess () {
      await this.$notify.success('일괄합격')
    },
    async poorReg () {
      await this.$notify.success('불량집계 팝업호출')
    },
    async poorCount () {
      await this.$notify.success('불량집계: 어떤화면인지 확인')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>
