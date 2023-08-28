<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      기타이동요청등록
    </template>
    <template #button>
      <button class="btn-blue-bg">
        저장
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="등록" />
        </template>
        <template #default>
          <SJForm>
            <SJFormRow>
              <SJFormField label="사업장">
                <SJSelect
                  id="md1"
                  name="사업장"
                  :options="MD_01"
                />
              </SJFormField>
              <SJFormField label="담당자">
                <SJUserEditor id="user" name="user" />
              </SJFormField>
              <SJFormField label="요청번호">
                <SJInput id="md2" v-model="search.md2" name="요청번호" disabled />
              </SJFormField>
              <SJFormField label="요청일자">
                <SJDatePicker
                  id="md3"
                  name="요청일자"
                  rules="required|max:12"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="이동유형">
                <SJSelect
                  id="md4"
                  name="이동유형"
                  :options="MD_02"
                />
              </SJFormField>
              <SJFormField />
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="이동전창고">
                <SJSelect
                  id="md5"
                  name="이동전창고"
                  disabled
                />
              </SJFormField>
              <SJFormField label="이동후창고">
                <SJSelect
                  id="md6"
                  name="이동후창고"
                  disabled
                />
              </SJFormField>
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="이동전품목">
                TODO:SELECTINPUT
              </SJFormField>
              <SJFormField label="이동후품목">
                TODO:SELECTINPUT
              </SJFormField>
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="비고" style="width: 100%;">
                <SJTextarea id="md7" name="비고" />
              </SJFormField>
            </SJFormRow>
          </sjform>
          <SJTitle title="이동요청 상세">
            <button class="btn-blue-bg">
              품목적용
            </button>
            <button class="btn-white-bg">
              추가
            </button>
            <button class="btn-white-bg">
              삭제
            </button>
          </SJTitle>
          <SJGrid
            ref="grid"
            v-model="grid.data"
            :columns="grid.columns"
            :options="grid.options"
          />
        </template>
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
import SJFormField from '~/components/ui/common/SJFormField'
export default {
  components: { SJFormField },
  data () {
    return {
      search: {},
      resolve: null,
      reject: null,
      grid: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 150 },
          { name: 'REV', width: 80 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 80 },
          { name: '기준단위', width: 100 },
          { name: '수량', width: 80 },
          { name: '이동수량', width: 80 },
          { name: '사유', width: 200 },
          { name: '비고', width: 150 }
        ],
        options: {
          bodyHeight: 320
        }
      }
    }
  },
  created () {
    this.options = []
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    close () {
      this.$refs.modal.hide()
    },
    getMD01 () {
      return [{
        text: 'A사업부',
        value: 'A사업부'
      }, {
        text: 'B사업부',
        value: 'B사업부'
      }
      ]
    },
    getMD02 () {
      return [
        {
          text: '창고이동',
          value: '창고이동'
        },
        {
          text: '양품>불량이동',
          value: '양품>불량이동'
        },
        {
          text: '불량>양품이동',
          value: '불량>양품이동'
        },
        {
          text: '품목간이동',
          value: '품목간이동'
        },
        {
          text: '품목간이동(계정)',
          value: '품목간이동(계정)'
        }
      ]
    }
  }
}
</script>
