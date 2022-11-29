<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <button type="button" class="btn btn-outline-primary">
        등록
      </button>
      <button type="button" class="btn btn-outline-primary">
        저장
      </button>
      <button type="button" class="btn btn-outline-secondary">
        삭제
      </button>
      <button type="button" class="btn btn-outline-dark">
        HELP
      </button>
    </template>
    <template #default>
      <div class="row">
        <div class="col-md-2 bg-light">
          <label class="form-label">공통코드유형</label>
        </div>
        <div class="col-md-2">
          <SJSelect id="commonCode" name="공통코드유형" disabled-validation />
        </div>
        <div class="col-md-2 bg-light">
          <label class="form-label">사용모듈코드</label>
        </div>
        <div class="col-md-2">
          <SJSelect id="moduleCode" name="사용모듈코드" disabled-validation />
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
          <SJSelect id="commonCode" name="사용여부" disabled-validation />
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
          <SJInput id="large" name="대분류코드" type="text" disabled-validation />
        </div>
        <div class="col-md-6 mt-3">
          <label class="form-label">대분류명</label>
          <SJInput id="lname" name="대분류명" type="text" disabled-validation />
        </div>
        <div class="col-md-6 mt-3">
          <label class="form-label">사용모듈코드</label>
          <SJSelect id="moduleCode" name="사용모듈코드" disabled-validation />
        </div>
        <div class="col-md-6 mt-3">
          <label class="form-label">공통코드유형</label>
          <SJSelect id="commonCode" name="공통코드유형" disabled-validation />
        </div>
        <div class="col-md-6 mt-3">
          <label class="form-label">사용여부</label>
          <SJSelect id="commonCode" name="사용여부" disabled-validation />
        </div>
        <div class="col-md-6 mt-3">
          <label class="form-label">비고</label>
          <SJTextarea id="textarea" name="textarea" rules="required" />
        </div>
      </div>

      <h5 class="card-title">
        소분류
      </h5>
      <SJGrid ref="detail" v-model="detail.data" :columns="detail.columns" />
    </template>
  </SJSearchLRLayout>
</template>
<script>
import { MENU } from '@/mixins' // tab menu를 표기를 위한 mixins

export default {
  mixins: [MENU],
  data () {
    return {
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
            name: 'codeGroupName',
            header: this.$t('page.code.column.002'),
            filter: 'select',
            sortable: true
          },
          {
            name: 'systemCodeFlag',
            header: this.$t('page.code.column.003'),
            filter: 'select',
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
          { name: 'useFlag' },
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
        ]
      }
    }
  }
}
</script>
<style scoped>

</style>
