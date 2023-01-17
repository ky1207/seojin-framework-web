<template>
  <div>
    <Grid
      ref="grid"
      :data="getData"
      :columns="mergedColumns"
      :options="mergedOptions"
      v-on="$listeners"
    />
    <div ref="page" class="tui-pagination tui-grid-pagination" />
  </div>
</template>
<script>
import Pagination from 'tui-pagination'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    disableContext: {
      type: Boolean,
      required: false
    },
    pageable: {
      type: Boolean,
      default () {
        return false
      }
    },
    columns: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      pagination: null,
      page: 1,
      defaultOptions: {
        contextMenu: () => [
          [
            {
              name: 'copy',
              label: this.$t('contextMenu.copy'),
              action: 'copy'
            },
            {
              name: 'copyColumns',
              label: this.$t('contextMenu.copyColumns'),
              action: 'copyColumns'
            },
            {
              name: 'copyRows',
              label: this.$t('contextMenu.copyRows'),
              action: 'copyRows'
            },
            {
              name: 'export',
              label: this.$t('contextMenu.export'),
              subMenu: [
                {
                  name: 'csvExport',
                  label: this.$t('contextMenu.csvExport'),
                  action: () => {
                    this.printExcel('csv')
                  }
                },
                {
                  name: 'excelExport',
                  label: this.$t('contextMenu.excelExport'),
                  action: () => {
                    this.printExcel('xlsx')
                  }
                }
              ]
            }
          ]
        ],
        header: {
          height: 25
        },
        rowHeaders: ['rowNum'],
        columnOptions: {
          resizable: true,
          minWidth: 50
        },
        copyOptions: {
          useFormattedValue: true
        },
        rowHeight: 30,
        minRowHeight: 30,
        selectionUnit: 'row'
      }
    }
  },
  computed: {
    mergedOptions () {
      if (this.$props.disableContext) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.defaultOptions.contextMenu = null
      }
      const options = {
        ...this.defaultOptions,
        ...this.options
      }
      if (options.pageOptions?.useClient) {
        options.pageOptions.perPage = 30
      }
      return options
    },
    mergedColumns () {
      return this.$grid.getColumns(this.columns)
    },
    getData () {
      return (this.value.Data) ? this.value.Data : []
    }

  },
  watch: {
    value (newValue, oldValue) {
      if (newValue.Data) {
        this.$refs.grid.invoke('resetData', newValue.Data)
      } else {
        this.$refs.grid.invoke('resetData', [])
      }

      if (this.$props.pageable) {
        if (newValue.Total) {
          this.pagination.setTotalItems(newValue.Total)
        } else {
          this.pagination.setTotalItems(0)
        }
        this.pagination._paginate(this.page)
      }
    },
    deep: true
  },
  activated () {
    // 화면 리사이즈 후, 본 화면 출력시 그리드 리로드 문제
    window.removeEventListener('resize', this.refresh)
    window.addEventListener('resize', this.refresh)
    this.$refs.grid.invoke('customRefresh')
    if (this.$props.pageable) {
      this.pagination.on('afterMove', this.moveToGridPage)
    }
  },
  deactivated () {
    window.removeEventListener('resize', this.refresh)
    if (this.$props.pageable) {
      this.pagination.off('afterMove', this.moveToGridPage)
    }
  },
  mounted () {
    // grid자체 페이징 기능은 data가 바뀌면 1페이지로 가는 문제가 있으며
    // Data set을 이용하면 json 포맷이 tui Grid에 고정되는 문제가 있음.
    // 자체적으로 기능을 분리하여 추가 -- kskim 23.01.17
    if (this.$props.pageable) {
      this.pagination = new Pagination(this.$refs.page, {
        usageStatistics: false,
        itemsPerPage: 30
      })
    }
    window.addEventListener('resize', this.refresh)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.refresh)
    if (this.$props.pageable) {
      this.pagination.off('afterMove', this.moveToGridPage)
    }
  },
  methods: {
    async refresh () {
      if (this.$refs.grid.$el.closest('.modal-dialog')) {
        return
      }
      if (this.$refs.grid.$el.closest('[autoHeight]')) {
        const autoHeightArea = this.$refs.grid.$el.closest('[autoHeight]').getBoundingClientRect()
        const parent = this.$refs.grid.$el.parentElement.parentElement.closest('div').getBoundingClientRect()
        const grid = this.$refs.grid.$el.getBoundingClientRect()

        let height = grid.height + (autoHeightArea.bottom - parent.bottom - 30)
        if (this.$props.pageable) {
          height -= 50
        }
        this.$refs.grid.invoke('setBodyHeight', height)
      }
      const _this = this
      await new Promise((resolve) => {
        setTimeout(() => {
          _this.invoke('customRefresh')
        }, 300)
      })
    },
    moveToGridPage (e) {
      this.page = e.page
      this.$emit('moveToGridPage', e)
    },
    printExcel (type) {
      this.$refs.grid.invoke('export', type, { useFormattedValue: true })
    },
    getRootElement () {
      return this.$refs.grid
    },
    invoke (methodName, ...args) {
      return this.$refs.grid.invoke(methodName, ...args)
    }
  }
}
</script>
