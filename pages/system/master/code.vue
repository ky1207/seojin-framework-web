<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00017')">
        <SJSelect
          id="commonCode"
          v-model="search.systemCodeType"
          name="$t('page.system.00017')"
          :options="common.CD_TYPE"
          item-text="val"
          item-value="subCode"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00018')">
        <SJInput id="large" v-model="search.codeGroupId" :name="$t('page.system.00018')" type="text" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00019')">
        <SJInput id="lname" v-model="search.codeGroupName" :name="$t('page.system.00019')" type="text" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00009')">
        <SJInput id="small" v-model="search.codeName" :name="$t('page.system.00009')" type="text" disabled-validation />
      </SJSearchField>
      <SJSearchField :label=" $t('page.system.00004') ">
        <SJSelect
          id="useYN"
          v-model="search.useFlag"
          :name=" $t('page.system.00004')"
          :options="$api.common.getYNCodes()"
          disabled-validation
        />
      </SJSearchField>
    </template>

    <template #leftTitle>
      {{ $t('page.system.00021') }}
    </template>
    <template #left>
      <SJGrid ref="large" v-model="large.data" :columns="large.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <h3><i class="fa-regular fa-folder-open" />   {{ $t('page.system.00022') }}</h3>
      <div class="btn-bar">
        <button class="btn-blue-bg" @click="createCodeGroup">
          신규코드
        </button>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00018')">
            <SJInput
              id="form_large"
              v-model="codeGroup.codeGroupId"
              :name="$t('page.system.00018')"
              type="text"
              rules="required"
              :disabled="isUpdate"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00101')">
            <SJSelect
              id="form_moduleCode"
              v-model="codeGroup.moduleCodeType"
              :name="$t('page.system.00101')"
              :options="common.PG_MODULE_CD"
              item-text="val"
              item-value="subCode"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>

        <SJFormRow>
          <SJFormField :label="$tc('page.system.00017')">
            <SJSelect
              id="form_commonCode"
              v-model="codeGroup.systemCodeType"
              :name="$t('page.system.00017')"
              :options="common.CD_TYPE"
              item-text="val"
              item-value="subCode"
              rules="required"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00004')">
            <SJSelect id="form_useYN" v-model="codeGroup.useFlag" :name="$t('page.system.00004')" :options="$api.common.getYNCodes()" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00019') ">
            <SJMultiInput id="form_lname" v-model="codeGroup.langs" :name="$t('page.system.00019')" type="text" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00009')">
            <SJTextarea id="form_desc" v-model="codeGroup.codeGroupDesc" :name="$t('page.system.00009')" disabled-validation />
          </SJFormField>
        </SJFormRow>
      </SJForm>
      <div v-if="isUpdate" class="right-grid">
        <div class="txt-wrap">
          <h3><i class="fa-regular fa-folder-open" /> {{ $t('page.system.00025') }}</h3>
          <div class="btn-bar">
            <button class="btn-white-bg" @click="appendRow">
              {{ $t('page.system.00026') }}
            </button>
            <button class="btn-white-bg" @click="removeRow">
              {{ $t('page.system.00012') }}
            </button>
          </div>
        </div>
        <SJGrid
          ref="detail"
          v-model="detail.data"
          :columns="detail.columns"
          :options="detail.options"
        />
      </div>
    </template>
  </SJSearchLRLayout>
</template>
<script>
import { MENU, ACTION } from '~/mixins'
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
          { name: 'codeGroupId' },
          { name: 'codeGroupName' },
          { name: 'moduleCodeType' },
          { name: 'systemCodeType' },
          { name: 'useFlag' }
        ]
      },
      detail: {
        data: {},
        columns: [
          { name: 'subCode' },
          {
            name: 'langs',
            header: this.$t('grid.codeName'),
            formatter: (e) => {
              if (e.value === null) {
                return ''
              }
              return e.value[e.value.findIndex(l => l.langCode === this.$i18n.getLocaleCookie())].val
            },
            editor: {
              type: CustomMultiLanguageEditor
            },
            width: 150
          },
          {
            name: 'sortSeq',
            editor: {
              type: 'text'
            }
          },
          { name: 'useFlag', renderer: CustomCheckBoxRenderer },
          {
            name: 'codeDesc',
            editor: {
              type: 'text'
            }
          },
          {
            name: 'rsvVal1',
            editor: {
              type: 'text'
            }
          },
          {
            name: 'rsvVal2',
            editor: {
              type: 'text'
            }
          },
          {
            name: 'rsvVal3',
            editor: {
              type: 'text'
            }
          },
          {
            name: 'rsvVal4',
            editor: {
              type: 'text'
            }

          },
          {
            name: 'rsvVal5',
            editor: {
              type: 'text'
            }
          }
        ],
        options: {
          rowHeaders: ['checkbox']
        }
      }
    }
  },
  watch: {
    isUpdate () {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    }
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['CD_TYPE', 'PG_MODULE_CD'])
    this.common = codes.data
    this.common.USE_YN = this.$api.common.getYNCodes()
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
      this.detail.data = {}
    },
    appendRow () {
      if (!this.codeGroup.codeGroupId) {
        this.$notify.warning(this.$t('message.00001'))
        return false
      }
      this.$refs.detail.invoke('appendRow')
    },
    removeRow () {
      this.$refs.detail.invoke('removeCheckedRows', false) //  confirm을 true로 하려면 베트남어 삽입해야 함.
    },
    ACTION_REGISTRY () {
      return {

        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.code.list(this.search)
          this.large.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              const { codes, ...rest } = this.codeGroup
              const data = { codeGroup: rest, gridRequest: this.$refs.detail.invoke('getModifiedRows') }
              await this.$api.system.code.update(rest.codeGroupId, data)
            } else {
              await this.$api.system.code.save(this.codeGroup)
            }
            this._resetForm()
            this.$notify.success(this.$t('message.00002'))
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
