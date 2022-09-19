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
