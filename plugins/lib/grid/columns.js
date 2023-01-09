import { CodeFormatter, CompanyFormatter, DateFormatter, YNFormatter } from '~/plugins/lib/grid/Formatter'
import { CustomCheckBoxRenderer } from '~/plugins/lib/grid/editor/CustomCheckBoxRenderer'

export default ctx => ({
  defined: {
    title: {
      header: ctx.i18n.t('grid.title'),
      name: 'title'
    },
    insertDate: {
      header: ctx.i18n.t('grid.insertDate'),
      name: 'insertDate',
      formatter: DateFormatter,
      align: 'center'
    },
    useFlag: {
      header: ctx.i18n.t('grid.useFlag'),
      name: 'useFlag',
      formatter: YNFormatter,
      align: 'center'
    },
    sortSeq: {
      name: 'sortSeq',
      header: ctx.i18n.t('grid.sortSeq')
    },
    coId: {
      header: ctx.i18n.t('grid.coId'),
      formatter: CompanyFormatter
    },
    codeGroupId: {
      header: '대분류코드'
    },
    codeGroupName: {
      header: '대분류명'
    },
    systemCodeType: {
      header: '사용모듈',
      formatter: CodeFormatter
    },
    codeId: {
      header: '소분류코드'
    },
    codeDesc: {
      header: '비고'
    },
    rsvVal1: {
      header: 'Option1'
    },
    rsvVal2: {
      header: 'Option2'
    },
    rsvVal3: {
      header: 'Option3'
    },
    rsvVal4: {
      header: 'Option4'
    },
    rsvVal5: {
      header: 'Option5'
    },
    progName: {
      header: '프로그램명',
      editor: {
        type: 'text'
      },
      width: 150,
      validation: { required: true }
    },
    progPath: {
      header: '경로',
      editor: {
        type: 'text'
      },
      width: 300,
      validation: { required: true }
    },
    authCheckFlag: {
      header: '권한체크',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    inqryAuth: {
      header: '조회',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    saveAuth: {
      header: '저장',
      align: 'center',
      renderer: CustomCheckBoxRenderer,
      filter: null
    },
    excelAuth: {
      header: '엑셀',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    delAuth: {
      header: '삭제',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    fn1Auth: {
      header: 'FN1',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    fn2Auth: {
      header: 'FN2',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    fn3Auth: {
      header: 'FN3',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    fn4Auth: {
      header: 'FN4',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    fn5Auth: {
      header: 'FN5',
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    remark: {
      header: '비고',
      editor: {
        type: 'text'
      },
      width: 300,
      filter: null
    },
    authGroupId: {
      header: '권한코드'
    },
    authName: {
      header: '권한명'
    },
    defaultAuthFlag: {
      header: '기본권한',
      formatter: YNFormatter,
      align: 'center'
    },
    loginId: {
      header: '로그인ID'
    },
    userName: {
      header: '사용자명'
    },
    deptName: {
      header: '부서명'
    },
    pos: {
      header: '직급'
    },
    email: {
      header: 'Email'
    }

  },
  getColumns (c) {
    c.forEach((e, idx) => {
      let filterValue = 'select'
      if (this.defined[e.name]?.filter) {
        filterValue = this.defined[e.name].filter
      }
      let sortValue = true
      if (this.defined[e.name]?.sortable) {
        sortValue = this.defined[e.name].sortable
      }

      c[idx] = {
        ...{
          ...this.defined[e.name],
          filter: filterValue,
          sortable: sortValue
        },
        ...e
      }
    })
    return c
  }

})
