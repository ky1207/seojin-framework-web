import Vue from 'vue'

import 'tui-grid/dist/tui-grid.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import 'tui-pagination/dist/tui-pagination.css'
import { Grid } from '@toast-ui/vue-grid'

import TuiGrid from 'tui-grid'

TuiGrid.setLanguage('ko')
TuiGrid.applyTheme('striped')

Vue.component('Grid', Grid)

Vue.mixin({
  activated () {
    // 화면 리사이즈 후, 본 화면 출력시 그리드 리로드 문제
    Object.keys(this.$refs).forEach((element) => {
      if (this.$refs[element].invoke) {
        this.$refs[element].invoke('refreshLayout')
      }
    })
  }
})
