<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 bg-light">
          <label class="form-label">공통코드유형</label>
        </div>
        <div class="col-md-1">
          <SJSelect
            id="commonCode"
            v-model="search.systemCodeType"
            name="공통코드유형"
            :options="common.CD_TYPE"
            item-text="val"
            item-value="codeId"
            disabled-validation
          />
        </div>

        <div class="col-md-1 bg-light">
          <label class="form-label">대분류코드</label>
        </div>
        <div class="col-md-1">
          <SJInput id="large" v-model="search.codeGroupId" name="대분류코드" type="text" disabled-validation />
        </div>
        <div class="col-md-1 bg-light">
          <label class="form-label">대분류명</label>
        </div>
        <div class="col-md-1">
          <SJInput id="lname" v-model="search.codeGroupName" name="대분류명" type="text" disabled-validation />
        </div>
        <div class="col-md-1 bg-light">
          <label class="form-label">소분류명</label>
        </div>
        <div class="col-md-1">
          <SJInput id="small" v-model="search.codeName" name="소분류명" type="text" disabled-validation />
        </div>
        <div class="col-md-1 bg-light">
          <label class="form-label">사용여부</label>
        </div>
        <div class="col-md-1">
          <SJSelect
            id="useYN"
            v-model="search.useFlag"
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
      <SJGrid ref="large" v-model="large.data" :columns="large.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          대분류상세
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="createCodeGroup">
            신규 코드
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-6 mt-3">
            <label class="form-label">대분류코드</label>
            <SJInput
              id="form_large"
              v-model="codeGroup.codeGroupId"
              name="대분류코드"
              type="text"
              rules="required"
              :disabled="isUpdate"
            />
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
        <div class="row align-items-center">
          <div class="col">
            소분류
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-dark" @click="appendRow">
              추가
            </button>
            <button class="btn btn-outline-dark" @click="removeRow">
              삭제
            </button>
          </div>
        </div>
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
import { CodeFormatter, MulitLanguageFormatter } from '~/plugins/lib/grid/Formatter'
import { CustomCheckBoxRenderer } from '~/plugins/lib/grid/editor/CustomCheckBoxRenderer'
import { CustomMultiLanguageEditor } from '~/plugins/lib/grid/editor/CustomMultiLanguageEditor'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      isUpdate: false,
      common: {},
      search: {},
      codeGroup: {
      },
      large: {
        data: {},
        columns: [
          {
            name: 'codeGroupId',
            header: this.$t('page.code.column.001')
          },
          {
            name: 'codeGroupName',
            header: this.$t('page.code.column.002')

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
            name: 'langs',
            header: this.$t('page.code.column.011'),
            formatter: MulitLanguageFormatter,
            editor: {
              type: CustomMultiLanguageEditor
            }
          },
          {
            name: 'sortSeq',
            editor: {
              type: 'text'
            }
          },
          {
            name: 'useFlag',
            renderer: CustomCheckBoxRenderer
          },
          {
            name: 'codeDesc',
            header: this.$t('page.code.column.012'),
            editor: {
              type: 'text'
            }
          },
          {
            name: 'rsvVal1',
            header: this.$t('page.code.column.013'),
            editor: {
              type: 'text'
            }
          },
          {
            name: 'rsvVal2',
            header: this.$t('page.code.column.014'),
            editor: {
              type: 'text'
            }
          },
          {
            name: 'rsvVal3',
            header: this.$t('page.code.column.015'),
            editor: {
              type: 'text'
            }
          },
          {
            name: 'rsvVal4',
            header: this.$t('page.code.column.016'),
            editor: {
              type: 'text'
            }

          },
          {
            name: 'rsvVal5',
            header: this.$t('page.code.column.017'),
            editor: {
              type: 'text'
            }
          }
        ],
        options: {
          rowHeaders: ['checkbox'],
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
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.large.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.code.load(item.codeGroupId)
      this.codeGroup = result.data
      this.isUpdate = true
      this.detail.data = {
        Data: this.codeGroup.codes
      }
    },
    createCodeGroup () {
      this.isUpdate = false
      this._resetForm()
    },
    _resetForm () {
      this.$refs.form.reset()
      this.codeGroup = {}
      this.detail.data = {
        Data: []
      }
    },
    appendRow () {
      this.$refs.detail.invoke('appendRow')
    },
    removeRow () {
      this.$refs.detail.invoke('removeCheckedRows', false) //  confirm을 true로 하려면 베트남어 삽입해야 함.
    },
    ACTION_REGISTRY () {
      return {
        f1Label: 'F1 Label',
        f2Label: 'F2 Label',
        f3Label: 'F3 Label',
        f4Label: 'F4 Label',
        f5Label: 'F5 Label',
        f1Click: () => {
          this.$notify.info('info 메시지 테스트')
          this.$notify.success('success 메시지 테스트.')
          this.$notify.warning('warning')
          this.$notify.error('error')
        },
        f2Click: () => {

        },
        f3Click: () => {

        },
        f4Click: () => {

        },
        f5Click: () => {
        },
        searchClick: async () => {
          const result = await this.$api.system.code.list(this.search)
          this.large.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              // TODO:수정시 편집 못하게 해야함. codeGroupID
              const { codes, ...rest } = this.codeGroup
              const data = { codeGroup: rest, gridRequest: this.$refs.detail.invoke('getModifiedRows') }
              await this.$api.system.code.update(rest.codeGroupId, data)
            } else {
              await this.$api.system.code.save(this.codeGroup)
            }
            this._resetForm()
            this.$notify.success('처리되었습니다.') // TODO:다국어 처리
            await this.ACTION_REGISTRY().searchClick()
          }
        },
        delClick: () => {
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
