<template>
  <SJSearchLRLayout>
    <template #leftTitle>
      <SJTitle :title="$t('page.system.00104')" />
    </template>
    <template #left>
      <SJTab :list="tabList">
        <template #tab-1>
          <SJGrid
            ref="grid"
            v-model="grid.data"
            :columns="grid.columns"
          />
        </template>
        <template #tab-2>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField :label="$tc('page.system.00108')">
                <SJInput
                  id="form_bsnsCode"
                  v-model="businessCode.bsnsCode"
                  :name="$t('page.system.00108')"
                  rules="required|max:12"
                  :disabled="isUpdate"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField :label="$tc('page.system.00109')">
                <SJInput
                  id="form_bsnsName"
                  v-model="businessCode.bsnsName"
                  :name="$t('page.system.00109')"
                  rules="required"
                />
              </SJFormField>
            </SJFormRow>
          </SJForm>
        </template>
        <template #tab-3>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField :label="$tc('page.system.00004')">
                <SJSelect id="form_useYN" v-model="businessCode.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" rules="required" />
              </SJFormField>
            </SJFormRow>
          </SJForm>
        </template>
      </SJTab>
    </template>
    <template #rightTitle>
      <SJTitle :title="$t('page.system.00110')">
        <button class="btn-blue-bg" @click="createBusiness">
          {{ $t('page.system.00115') }}
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJAccordion :accordion-id="'myAccordion'" :sections="accordionSections">
        <template #section="{ section }">
          <!-- Section 1 -->
          <template v-if="section.title === 'Section 1'">
            <SJForm ref="form">
              <SJFormRow>
                <SJFormField :label="$tc('page.system.00108')">
                  <SJInput
                    id="form_bsnsCode"
                    v-model="businessCode.bsnsCode"
                    :name="$t('page.system.00108')"
                    rules="required|max:12"
                    :disabled="isUpdate"
                  />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField :label="$tc('page.system.00109')">
                  <SJInput
                    id="form_bsnsName"
                    v-model="businessCode.bsnsName"
                    :name="$t('page.system.00109')"
                    rules="required"
                  />
                </SJFormField>
              </SJFormRow>
            </SJForm>
          </template>
          <!-- Section 2 -->
          <template v-if="section.title === 'Section 2'">
            <SJForm ref="form">
              <SJFormRow>
                <SJFormField :label="$tc('page.system.00050')">
                  <SJStepper
                    id="form_sort"
                    v-model="businessCode.sort"
                    name="stepper"
                    rules="required|min_value:1"
                  />
                </SJFormField>
                <SJFormField :label="$tc('page.system.00004')">
                  <SJSelect id="form_useYN" v-model="businessCode.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" rules="required" />
                </SJFormField>
              </SJFormRow>
            </SJForm>
          </template>
          <!-- Section 3 -->
          <template v-if="section.title === 'Section 3'">
            <SJForm ref="form">
              <SJFormRow>
                <SJFormField :label="$tc('page.system.00050')">
                  <SJStepper
                    id="form_sort"
                    v-model="businessCode.sort"
                    name="stepper"
                    rules="required|min_value:1"
                  />
                </SJFormField>
                <SJFormField :label="$tc('page.system.00004')">
                  <SJSelect id="form_useYN" v-model="businessCode.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" rules="required" />
                </SJFormField>
              </SJFormRow>
            </SJForm>
          </template>
          <!-- Section 4 -->
          <template v-if="section.title === 'Section 4'">
            <SJForm ref="form">
              <SJFormRow>
                <SJFormField :label="$tc('page.system.00050')">
                  <SJStepper
                    id="form_sort"
                    v-model="businessCode.sort"
                    name="stepper"
                    rules="required|min_value:1"
                  />
                </SJFormField>
                <SJFormField :label="$tc('page.system.00004')">
                  <SJSelect id="form_useYN" v-model="businessCode.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" rules="required" />
                </SJFormField>
              </SJFormRow>
            </SJForm>
          </template>
        </template>
      </SJAccordion>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00004')">
            <SJFileUpload2 id="form_files" v-model="businessCode.files" name="files" @fileDownload="fileDownload" />
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
  layout: 'empty',
  data () {
    return {
      isUpdate: false,
      common: {},
      search: {},
      businessCode: {
        bsnsCode: '',
        bsnsName: ''
      },
      grid: {
        data: [],
        columns: [
          { name: 'bsnsCode' },
          { name: 'bsnsName' },
          { name: 'biznum' },
          { name: 'repName' },
          { name: 'useFlag' }
        ]
      },
      tabList: [
        { id: 1, title: 'Tab 1' },
        { id: 2, title: 'Tab 2' },
        { id: 3, title: 'Tab 3' }
      ],
      accordionSections: [
        {
          title: 'Section 1',
          expanded: false
        },
        {
          title: 'Section 2',
          expanded: false
        },
        {
          title: 'Section 3',
          expanded: false
        },
        {
          title: 'Section 4',
          expanded: false
        }
      ]
    }
  },
  // watch: {
  //   // currentTab (newTab) {
  //   //   this.$emit('input', newTab)
  //   //   this.$emit('change', newTab)
  //   // }
  // },
  methods: {
    ACTION_REGISTRY () {
      return {

      }
    },
    fileDownload (fileId) {
      this.$api.system.program.downloadHelp(fileId)
    }
  }
}
</script>
<style scoped>

</style>
