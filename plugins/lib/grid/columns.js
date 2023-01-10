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
      header: ctx.i18n.t('grid.codeGroupId')
    },
    codeGroupName: {
      header: ctx.i18n.t('grid.codeGroupName')
    },
    systemCodeType: {
      header: ctx.i18n.t('grid.systemCodeType'),
      formatter: CodeFormatter
    },
    codeId: {
      header: ctx.i18n.t('grid.codeId')
    },
    codeDesc: {
      header: ctx.i18n.t('grid.codeDesc')
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
      header: ctx.i18n.t('grid.progName'),
      editor: {
        type: 'text'
      },
      width: 150,
      validation: { required: true }
    },
    progPath: {
      header: ctx.i18n.t('grid.progPath'),
      editor: {
        type: 'text'
      },
      width: 300,
      validation: { required: true }
    },
    authCheckFlag: {
      header: ctx.i18n.t('grid.authCheckFlag'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    inqryAuth: {
      header: ctx.i18n.t('grid.inqryAuth'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    saveAuth: {
      header: ctx.i18n.t('grid.saveAuth'),
      align: 'center',
      renderer: CustomCheckBoxRenderer,
      filter: null
    },
    excelAuth: {
      header: ctx.i18n.t('grid.excelAuth'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    delAuth: {
      header: ctx.i18n.t('grid.delAuth'),
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
      header: ctx.i18n.t('grid.remark'),
      editor: {
        type: 'text'
      },
      width: 300,
      filter: null
    },
    authGroupId: {
      header: ctx.i18n.t('grid.authGroupId')
    },
    authName: {
      header: ctx.i18n.t('grid.authName')
    },
    defaultAuthFlag: {
      header: ctx.i18n.t('grid.defaultAuthFlag'),
      formatter: YNFormatter,
      align: 'center'
    },
    loginId: {
      header: ctx.i18n.t('grid.loginId')
    },
    userName: {
      header: ctx.i18n.t('grid.userName')
    },
    deptName: {
      header: ctx.i18n.t('grid.deptName')
    },
    pos: {
      header: ctx.i18n.t('grid.pos')
    },
    email: {
      header: 'Email'
    },
    menuName: {
      header: ctx.i18n.t('grid.menuName'),
      filter: null,
      sortable: false
    }
  },
  getColumns (c) {
    c.forEach((e, idx) => {
      let filterValue = 'select'
      if (this.defined[e.name]?.filter !== undefined) {
        filterValue = this.defined[e.name].filter
      }
      let sortValue = true
      if (this.defined[e.name]?.sortable !== undefined) {
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
