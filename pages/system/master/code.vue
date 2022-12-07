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
      <div class="row">
        <div class="col-md-6 mt-3">
          <label class="form-label">대분류코드</label>
          <SJInput id="form_large" v-model="codeGroup.codeGroupId" name="대분류코드" type="text" rules="required" />
        </div>
        <div class="col-md-6 mt-3">
          <label class="form-label">공통코드유형</label>
          <SJSelect
            id="form_commonCode"
            v-model="codeGroup.systemCodeFlag"
            name="공통코드유형"
            :options="common.CD_TYPE"
            item-text="val"
            item-value="codeId"
            rules="required"
          />
        </div>
        <div class="col-md-10 mt-3">
          <label class="form-label">대분류명</label>
          <SJMultiInput id="form_lname" v-model="codeGroup.lang" name="대분류명" type="text" rules="required" />
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
        lang: {}
      },
      large: {
        data: {},
        columns: [
          {
            name: 'codeGroupId',
            header: this.$t('page.code.column.001'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'codeGroupNameKo',
            header: this.$t('page.code.column.002') + '(ko)',
            filter: 'select',
            sortable: true
          },
          {
            name: 'codeGroupNameEn',
            header: this.$t('page.code.column.002') + '(en)',
            filter: 'select',
            sortable: true
          },
          {
            name: 'codeGroupNameVi',
            header: this.$t('page.code.column.002') + '(vi)',
            filter: 'select',
            sortable: true
          },
          {
            name: 'systemCodeType',
            header: this.$t('page.code.column.003'),
            filter: 'select',
            formatter: CodeFormatter,
            sortable: true
          },
          { name: 'useFlag' }
        ]
      },
      detail: {
        data: {},
        columns: [
          {
            name: 'codeId',
            header: this.$t('page.code.column.010'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'codeName',
            header: this.$t('page.code.column.011'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'sortSeq'
          },
          {
            name: 'useFlag'
          },
          {
            name: 'codeDesc',
            header: this.$t('page.code.column.012'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'rsvVal1',
            header: this.$t('page.code.column.013'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'rsvVal2',
            header: this.$t('page.code.column.014'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'rsvVal3',
            header: this.$t('page.code.column.015'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'rsvVal4',
            header: this.$t('page.code.column.016'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'rsvVal5',
            header: this.$t('page.code.column.017'),
            filter: 'select',
            sortable: true
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
          alert('f1Click')
        },
        f2Click: () => {
          alert('f2Click')
        },
        f3Click: () => {
          alert('f3Click')
        },
        f4Click: () => {
          alert('f4Click')
        },
        f5Click: () => {
          alert('f5Click')
        },
        searchClick: async () => {
          const result = await this.$api.code.list({ test: 'test' })
          this.large.data = result.data
        },
        saveClick: () => {
          console.log(this.$api.common)
          console.log(this.codeGroup)
          console.log('save')
        },
        delClick: () => {
          console.log('del')
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
