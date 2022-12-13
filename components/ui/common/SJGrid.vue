<template>
  <div>
    <Grid
      ref="grid"
      :data="getData"
      :columns="mergedColumns"
      :options="mergedOptions"
      v-on="$listeners"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
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
          minWidth: 100
        },
        copyOptions: {
          useFormattedValue: true
        },
        bodyHeight: 500,
        rowHeight: 30,
        minRowHeight: 30,
        selectionUnit: 'row'
      }
    }
  },
  computed: {
    mergedOptions () {
      return {
        ...this.defaultOptions,
        ...this.options
      }
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
      }
    }
  },
  activated () {
    // 화면 리사이즈 후, 본 화면 출력시 그리드 리로드 문제
    window.removeEventListener('resize', this.refresh)
    window.addEventListener('resize', this.refresh)
    this.$refs.grid.invoke('customRefresh')
  },
  deactivated () {
    window.removeEventListener('resize', this.refresh)
  },
  mounted () {
    window.removeEventListener('resize', this.refresh)
    window.addEventListener('resize', this.refresh)
  },
  methods: {
    refresh () {
      const _this = this
      setTimeout(() => {
        _this.invoke('customRefresh')
      }, 300)
    },
    printExcel (type) {
      this.$refs.grid.invoke('export', type, { useFormattedValue: true })
    },
    getRootElement () {
      return this.$refs.grid
    },
    invoke (methodName, ...args) {
      return this.$refs.grid.invoke(methodName, args)
    }
  }
}
</script>
