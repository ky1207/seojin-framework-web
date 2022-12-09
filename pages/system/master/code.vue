<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons f1-label="테스트" :action="ACTION" />
    </template>
    <template #default>
      <div class="row">
        <div class="col-md-2 bg-light">
          <label class="form-label">공통코드유형</label>
        </div>
        <div class="col-md-2">
          <SJSelect
            id="commonCode"
            name="공통코드유형"
            :options="common.CD_TYPE"
            item-text="val"
            item-value="codeId"
            disabled-validation
          />
        </div>

        <div class="col-md-2 bg-light">
          <label class="form-label">대분류코드</label>
        </div>
        <div class="col-md-2">
          <SJInput id="large" name="대분류코드" type="text" disabled-validation />
        </div>
        <div class="col-md-2 bg-light">
          <label class="form-label">대분류명</label>
        </div>
        <div class="col-md-2">
          <SJInput id="lname" name="대분류명" type="text" disabled-validation />
        </div>
        <div class="col-md-2 bg-light">
          <label class="form-label">소분류명</label>
        </div>
        <div class="col-md-2">
          <SJInput id="small" name="소분류명" type="text" disabled-validation />
        </div>
        <div class="col-md-2 bg-light">
          <label class="form-label">사용여부</label>
        </div>
        <div class="col-md-2">
          <SJSelect
            id="useYN"
            name="사용여부"
            :options="$api.common.getYNCodes()"
            disabled-validation
          />
        </div>
      </div>
    </template>

    <template #leftTitle>
      대분류
    </template>
    <template #left>
      <SJGrid ref="large" v-model="large.data" :columns="large.columns" />
    </template>

    <template #rightTitle>
      대분류상세
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-6 mt-3">
            <label class="form-label">대분류코드</label>
            <SJInput id="form_large" v-model="codeGroup.codeGroupId" name="대분류코드" type="text" rules="required" />
          </div>
          <div class="col-md-6 mt-3">
            <label class="form-label">공통코드유형</label>
            <SJSelect
              id="form_commonCode"
              v-model="codeGroup.systemCodeType"
              name="공통코드유형"
              :options="common.CD_TYPE"
              item-text="val"
              item-value="codeId"
              rules="required"
            />
          </div>
          <div class="col-md-10 mt-3">
            <label class="form-label">대분류명</label>
            <SJMultiInput id="form_lname" v-model="codeGroup.langs" name="대분류명" type="text" rules="required" />
          </div>

          <div class="col-md-6 mt-3">
            <label class="form-label">사용여부</label>
            <SJSelect id="form_useYN" v-model="codeGroup.useFlag" name="사용여부" :options="$api.common.getYNCodes()" rules="required" />
          </div>
          <div class="col-md-12 mt-3">
            <label class="form-label">비고</label>
            <SJTextarea id="form_desc" v-model="codeGroup.codeGroupDesc" name="비고" disabled-validation />
          </div>
        </div>
      </SJForm>
      <h5 class="card-title">
        소분류
      </h5>
      <SJGrid
        ref="detail"
        v-model="detail.data"
        :columns="detail.columns"
        :options="detail.options"
      />
    </template>
  </SJSearchLRLayout>
</template>
<script>
import { MENU, ACTION } from '~/mixins'
import { CodeFormatter } from '~/plugins/lib/grid/Formatter'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: {},
      codeGroup: {
        codeGroupId: 'TEST'
      },
      large: {
        data: {},
        columns: [
          {
            name: 'codeGroupId',
            header: this.$t('page.code.column.001')

          },
          {
            name: 'codeGroupNameKo',
            header: this.$t('page.code.column.002') + '(ko)'

          },
          {
            name: 'codeGroupNameEn',
            header: this.$t('page.code.column.002') + '(en)'

          },
          {
            name: 'codeGroupNameVi',
            header: this.$t('page.code.column.002') + '(vi)'

          },
          {
            name: 'systemCodeType',
            header: this.$t('page.code.column.003'),
            formatter: CodeFormatter
          },
          { name: 'useFlag' }
        ]
      },
      detail: {
        data: {},
        columns: [
          {
            name: 'codeId',
            header: this.$t('page.code.column.010')
          },
          {
            name: 'codeName',
            header: this.$t('page.code.column.011')
          },
          {
            name: 'sortSeq'
          },
          {
            name: 'useFlag'
          },
          {
            name: 'codeDesc',
            header: this.$t('page.code.column.012')
          },
          {
            name: 'rsvVal1',
            header: this.$t('page.code.column.013')
          },
          {
            name: 'rsvVal2',
            header: this.$t('page.code.column.014')
          },
          {
            name: 'rsvVal3',
            header: this.$t('page.code.column.015')
          },
          {
            name: 'rsvVal4',
            header: this.$t('page.code.column.016')
          },
          {
            name: 'rsvVal5',
            header: this.$t('page.code.column.017')
          }
        ],
        options: {
          bodyHeight: 130
        }
      }
    }
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['CD_TYPE', 'PG_MODULE_CD'])
    this.common = codes.data
    this.common.USE_YN = this.$api.common.getYNCodes()
  },
  mounted () {

  },
  methods: {
    test () {
      alert('test')
    },
    _makeAction () {
      return {
        f1Label: 'F1 Label',
        f2Label: 'F2 Label',
        f3Label: 'F3 Label',
        f4Label: 'F4 Label',
        f5Label: 'F5 Label',
        f1Click: () => {
          this.$notify.info('info askjdlfjaslkdjfkljasldkfjlasjf')
        },
        f2Click: () => {
          this.$notify.success('succes asdfasdfasfdsf')
        },
        f3Click: () => {
          this.$notify.warning('warning')
        },
        f4Click: () => {
          this.$notify.error('error')
        },
        f5Click: async () => {
          alert('f5Click')
          // test
          const result = await this.$api.code.read('PLC_TYPE')
          console.log(result.data)
        },
        searchClick: async () => {
          const result = await this.$api.code.list({ test: 'test' })
          this.large.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            // TODO:응답 받아서.. 확인. 실패..처리
            await this.$api.code.save(this.codeGroup)
            this.codeGroup = {}
            this.$refs.form.reset()
          }
        },
        delClick: () => {
          this.codeGroup = {}
          this.$refs.form.reset()
          console.log('del')
        }
      }
    }
  }
}
</script>
<style scoped>
.blurEffect {
  filter: blur(10px);
  -webkit-filter: blur(10px);
}
</style>
