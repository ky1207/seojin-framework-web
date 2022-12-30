import Vue from 'vue'

import 'tui-grid/dist/tui-grid.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import 'tui-pagination/dist/tui-pagination.css'
import TuiGrid from 'tui-grid'
import { Grid as VueGrid } from '@toast-ui/vue-grid'
import columns from '~/plugins/lib/grid/columns'

TuiGrid.setLanguage('ko')
// default나 clean이 아니면 적용 안됨
TuiGrid.applyTheme('default', { cell: { editable: { background: '#ebf9fa' } } })

TuiGrid.prototype.customRefresh = function () {
  const p = this.store.viewport.offsetTop
  this.dispatch('setScrollTop', 0)
  this.dispatch('setScrollTop', p)
  this.refreshLayout()
}

Vue.component('Grid', VueGrid)

export default (ctx, inject) => {
  // toast grid의 locale을 vi는 없음
  if (ctx.i18n.getLocaleCookie() !== 'vi') {
    TuiGrid.setLanguage(ctx.i18n.getLocaleCookie())
  } else {
    // 베트남어는 지원하지 않으므로 가상의 Data를 셋 한다.
    TuiGrid.setLanguage('vi', {})
  }

  const grid = columns(ctx)

  inject('grid', grid)
}
