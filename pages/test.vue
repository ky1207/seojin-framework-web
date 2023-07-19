<template>
  <SJSearchLRLayout>
    <template #default>
      <SJSearchField label="거래처">
        <SJInput id="md1" v-model="search.md1" name="md1" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJSelectInput />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle :title="$t('page.system.00104')" />
    </template>
    <template #left>
      <SJForm>
        <SJTab :list="tabList">
          <template #tab-1>
            <SJGrid
              ref="grid"
              v-model="grid.data"
              :columns="grid.columns"
            />
          </template>
          <template #tab-2>
            <SJForm>
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
            </sjform>
          </template>
          <template #tab-3>
            <SJFormRow>
              <SJFormField :label="$tc('page.system.00004')">
                <SJSelect id="form_useYN" v-model="businessCode.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" rules="required" />
              </SJFormField>
            </SJFormRow>
          </template>
        </SJTab>
      </SJForm>
    </template>
    <template #rightTitle>
      <SJTitle :title="$t('page.system.00110')">
        <button class="btn-blue-bg" @click="createBusiness">
          {{ $t('page.system.00115') }}
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJAccordion :accordion-id="'myAccordion'" :sections="accordionSections">
          <template #section="{ section }">
            <!-- Section 1 -->
            <template v-if="section.id === 'section1'">
              <SJFormRow>
                <SJFormField label="사업장명">
                  <SJSelectInput />
                </SJFormField>
              </SJFormRow>
              <SJFormRow>
                <SJFormField label="검색">
                  <SJAutoComplete />
                </SJFormField>
              </SJFormRow>
            </template>
            <!-- Section 2 -->
            <template v-if="section.id === 'section2'">
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
            </template>
            <!-- Section 3 -->
            <template v-if="section.id === 'section3'">
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
            </template>
            <!-- Section 4 -->
            <template v-if="section.id === 'section4'">
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
      </SJForm>
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
          id: 'section1',
          title: 'Section 1',
          expanded: false
        },
        {
          id: 'section2',
          title: 'Section 2',
          expanded: false
        },
        {
          id: 'section3',
          title: 'Section 3',
          expanded: false
        },
        {
          id: 'section4',
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
