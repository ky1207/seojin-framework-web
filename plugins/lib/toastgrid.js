import Vue from 'vue'

import 'tui-grid/dist/tui-grid.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import 'tui-pagination/dist/tui-pagination.css'
import { Grid } from '@toast-ui/vue-grid'

import TuiGrid from 'tui-grid'
import { DateFormatter } from '~/plugins/lib/grid/Formatter.js'

TuiGrid.setLanguage('ko')
// default나 clean이 아니면 적용 안됨
TuiGrid.applyTheme('default', { cell: { editable: { background: '#ebf9fa' } } })

Vue.component('Grid', Grid)

export default (ctx, inject) => {
  // toast grid의 locale을 vi는 없음
  if (ctx.i18n.getLocaleCookie() !== 'vi') {
    TuiGrid.setLanguage(ctx.i18n.getLocaleCookie())
  } else {
    // 베트남어는 지원하지 않으므로 가상의 Data를 셋 한다.
    TuiGrid.setLanguage('vi', {})
  }

  const grid = {
    defined: {
      title: {
        header: ctx.i18n.t('grid.title'),
        name: 'title',
        filter: 'select',
        sortable: true
      },
      insertDate: {
        header: ctx.i18n.t('grid.insertDate'),
        name: 'insertDate',
        filter: 'select',
        formatter: DateFormatter,
        sortable: true
      }

    },
    getColumns: (c) => {
      c.forEach((e, idx) => {
        c[idx] = { ...grid.defined[e.name], ...e }
      })
      return c
    }
  }

  inject('grid', grid)
}
