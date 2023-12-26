import {
  BusinessFormatter,
  CodeFormatter,
  CompanyFormatter,
  DateFormatter,
  YNFormatter
} from '~/plugins/lib/grid/Formatter'
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
    authGroupCode: {
      header: ctx.i18n.t('grid.authGroupCode'),
      align: 'center'
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
      header: ctx.i18n.t('grid.appType'),
      formatter: CodeFormatter
    },
    availInvntryFlag: {
      header: ctx.i18n.t('grid.availInvntryFlag'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
    },
    // B
    biznum: {
      header: ctx.i18n.t('grid.biznum')
    },
    bsnsId: {
      header: ctx.i18n.t('grid.bsnsId'),
      formatter: BusinessFormatter,
      align: 'center'
    },
    bsnsName: {
      header: ctx.i18n.t('grid.bsnsName')
    },
    bsnsCode: {
      header: ctx.i18n.t('grid.bsnsCode')
    },
    // C
    coId: {
      header: ctx.i18n.t('grid.coId'),
      formatter: CompanyFormatter
    },
    coCode: {
      header: ctx.i18n.t('grid.coCode'),
      align: 'center'
    },
    codeGroupId: {
      header: ctx.i18n.t('grid.codeGroupId')
    },
    codeGroupName: {
      header: ctx.i18n.t('grid.codeGroupName')
    },
    codeDesc: {
      header: ctx.i18n.t('grid.codeDesc')
    },
    coName: {
      header: ctx.i18n.t('grid.coName')
    },
    customer: {
      header: ctx.i18n.t('grid.customer')
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
    deptCode: {
      header: ctx.i18n.t('grid.deptCode'),
      align: 'center',
      width: '150',
      sortable: false,
      filter: null
    },
    deptName: {
      header: ctx.i18n.t('grid.deptName'),
      sortable: false,
      filter: null
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
      formatter: YNFormatter,
      align: 'center'
    },
    // M
    menuName: {
      header: ctx.i18n.t('grid.menuName'),
      filter: null,
      sortable: false
    },
    menuCode: {
      header: ctx.i18n.t('grid.menuCode'),
      align: 'center',
      filter: null,
      sortable: false
    },
    modDtm: {
      header: ctx.i18n.t('grid.modDtm'),
      formatter: DateFormatter,
      align: 'center'
    },
    modUserId: {
      header: ctx.i18n.t('grid.modUserId')
    },
    modUserName: {
      header: ctx.i18n.t('grid.modUserName')
    },
    moduleCodeType: {
      header: ctx.i18n.t('grid.moduleCodeType'),
      formatter: CodeFormatter,
      align: 'center'
    },
    // N
    notifyTmpltCode: {
      header: ctx.i18n.t('grid.notifyTmpltCode'),
      width: 150,
      filter: null,
      sortable: false,
      align: 'center'
    },
    notifyTmpltName: {
      header: ctx.i18n.t('grid.notifyTmpltName'),
      editor: {
        type: 'text'
      },
      width: 300
    },
    notifyId: {
      header: ctx.i18n.t('grid.notifyId'),
      width: 100,
      filter: null,
      sortable: false,
      align: 'center'
    },
    // O
    osdWhseFlag: {
      header: ctx.i18n.t('grid.osdWhseFlag'),
      renderer: CustomCheckBoxRenderer,
      align: 'center',
      filter: null
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
    regUserId: {
      header: ctx.i18n.t('grid.regUserId')
    },
    regUserName: {
      header: ctx.i18n.t('grid.regUserName')
    },
    respDeptId: {
      header: ctx.i18n.t('grid.respDeptId')
    },
    rcvrId: {
      header: ctx.i18n.t('grid.rcvrId')
    },
    rcvrEmail: {
      header: ctx.i18n.t('grid.rcvrEmail'),
      width: 180
    },
    // S
    sort: {
      header: ctx.i18n.t('grid.sort')
    },
    sortSeq: {
      name: 'sortSeq',
      header: ctx.i18n.t('grid.sortSeq')
    },
    systemCodeType: {
      header: ctx.i18n.t('grid.systemCodeType'),
      formatter: CodeFormatter,
      align: 'center'
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
    sndrName: {
      header: ctx.i18n.t('grid.sndrName'),
      width: 180
    },
    subCode: {
      header: ctx.i18n.t('grid.subCode'),
      editor: {
        type: 'text'
      },
      width: 150,
      validation: { required: true }
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
    },
    // W
    whseCode: {
      header: ctx.i18n.t('grid.whseCode')
    },
    whseId: {
      header: ctx.i18n.t('grid.whseId'),
      name: 'whseId',
      width: 100
    },
    whseName: {
      header: ctx.i18n.t('grid.whseName'),
      width: 180
    },
    whseType: {
      header: ctx.i18n.t('grid.whseType')
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
