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
    // A
    acsIp: {
      header: 'Access Ip',
      filter: null,
      sortable: false
    },
    acsLogId: {
      header: 'ID',
      filter: null,
      sortable: false
    },
    api: {
      header: 'Api URL',
      filter: null,
      sortable: false
    },
    authCheckFlag: {
      header: ctx.i18n.t('grid.authCheckFlag'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    authGroupId: {
      header: ctx.i18n.t('grid.authGroupId')
    },
    authName: {
      header: ctx.i18n.t('grid.authName')
    },
    applnUseFlag: {
      header: ctx.i18n.t('grid.applnUseFlag'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    appType: {
      header: ctx.i18n.t('grid.appType')
    },
    // B
    biznum: {
      header: ctx.i18n.t('grid.biznum')
    },
    // C
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
    codeId: {
      header: ctx.i18n.t('grid.codeId')
    },
    codeDesc: {
      header: ctx.i18n.t('grid.codeDesc')
    },
    coName: {
      header: ctx.i18n.t('grid.coName')
    },
    // D
    defaultAuthFlag: {
      header: ctx.i18n.t('grid.defaultAuthFlag'),
      formatter: YNFormatter,
      align: 'center'
    },
    delAuth: {
      header: ctx.i18n.t('grid.delAuth'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    deptName: {
      header: ctx.i18n.t('grid.deptName')
    },

    // E
    excelAuth: {
      header: ctx.i18n.t('grid.excelAuth'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    email: {
      header: 'Email'
    },
    emailFlag: {
      header: 'EMAIL',
      name: 'emailFlag',
      renderer: CustomCheckBoxRenderer,
      align: 'center'
    },
    emailSentFlag: {
      header: ctx.i18n.t('grid.emailSentFlag'),
      formatter: YNFormatter,
      align: 'center'
    },
    emailInqryFlag: {
      header: ctx.i18n.t('grid.emailInqryFlag'),
      formatter: YNFormatter,
      align: 'center'
    },
    // F
    failReasonCode: {
      header: ctx.i18n.t('grid.failReasonCode'),
      filter: null,
      sortable: false
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
    // I
    inqryAuth: {
      header: ctx.i18n.t('grid.inqryAuth'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    // J
    job: {
      header: '직급',
      formatter: CodeFormatter
    },
    // L
    logId: {
      header: 'ID',
      width: 100,
      filter: null,
      sortable: false
    },
    loginId: {
      header: ctx.i18n.t('grid.loginId')
    },
    lastUpdateFlag: {
      header: ctx.i18n.t('grid.lastUpdateFlag'),
      renderer: CustomCheckBoxRenderer,
      align: 'center'
    },
    // M
    menuName: {
      header: ctx.i18n.t('grid.menuName'),
      filter: null,
      sortable: false
    },
    modDtm: {
      header: ctx.i18n.t('grid.modDtm')
    },
    modUserName: {
      header: ctx.i18n.t('grid.modUserName')
    },
    // N
    notifyTmpltId: {
      header: ctx.i18n.t('grid.notifyTmpltId'),
      width: 100,
      filter: null,
      sortable: false,
      align: 'center'
    },
    notifyTmpltName: {
      header: ctx.i18n.t('grid.notifyTmpltName'),
      editor: {
        type: 'text'
      },
      width: 150,
      validation: { required: true }
    },
    notifyId: {
      header: ctx.i18n.t('grid.notifyId'),
      width: 100,
      filter: null,
      sortable: false,
      align: 'center'
    },
    // P
    pos: {
      header: ctx.i18n.t('grid.pos')
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
    pushFlag: {
      header: 'PUSH',
      name: 'pushFlag',
      renderer: CustomCheckBoxRenderer,
      align: 'center'
    },
    pushSentFlag: {
      header: ctx.i18n.t('grid.pushSentFlag'),
      formatter: YNFormatter,
      align: 'center'
    },
    pushInqryFlag: {
      header: ctx.i18n.t('grid.pushInqryFlag'),
      formatter: YNFormatter,
      align: 'center'
    },
    pdaUseFlag: {
      header: ctx.i18n.t('grid.pdaUseFlag'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    // R
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
    remark: {
      header: ctx.i18n.t('grid.remark'),
      editor: {
        type: 'text'
      },
      width: 300,
      filter: null
    },
    repName: {
      header: ctx.i18n.t('grid.repName')
    },
    regDtm: {
      header: ctx.i18n.t('grid.regDtm'),
      formatter: DateFormatter,
      align: 'center'

    },
    rcvrId: {
      header: ctx.i18n.t('grid.rcvrId')
    },
    rcvrEmail: {
      header: ctx.i18n.t('grid.rcvrEmail'),
      width: 180
    },
    // S
    sortSeq: {
      name: 'sortSeq',
      header: ctx.i18n.t('grid.sortSeq')
    },
    systemCodeType: {
      header: ctx.i18n.t('grid.systemCodeType'),
      formatter: CodeFormatter
    },
    saveAuth: {
      header: ctx.i18n.t('grid.saveAuth'),
      align: 'center',
      renderer: CustomCheckBoxRenderer,
      filter: null
    },
    systemType: {
      header: ctx.i18n.t('grid.systemType'),
      formatter: CodeFormatter
    },
    sndrId: {
      header: ctx.i18n.t('grid.sndrId')
    },
    sndrEmail: {
      header: ctx.i18n.t('grid.sndrEmail'),
      width: 180
    },
    // U
    useFlag: {
      header: ctx.i18n.t('grid.useFlag'),
      name: 'useFlag',
      formatter: YNFormatter,
      align: 'center'
    },
    userName: {
      header: ctx.i18n.t('grid.userName')
    },
    updateId: {
      header: ctx.i18n.t('grid.updateId')
    },
    updateTitle: {
      header: ctx.i18n.t('grid.title')
    },
    updateCntn: {
      header: ctx.i18n.t('grid.cntn')
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
