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
              label: this.$i18n.t('contextMenu.copy'),
              action: 'copy'
            },
            {
              name: 'copyColumns',
              label: this.$i18n.t('contextMenu.copyColumns'),
              action: 'copyColumns'
            },
            {
              name: 'copyRows',
              label: this.$i18n.t('contextMenu.copyRows'),
              action: 'copyRows'
            },
            {
              name: 'export',
              label: this.$i18n.t('contextMenu.export'),
              subMenu: [
                {
                  name: 'csvExport',
                  label: this.$i18n.t('contextMenu.csvExport'),
                  action: () => {
                    this.printExcel('csv')
                  }
                },
                {
                  name: 'excelExport',
                  label: this.$i18n.t('contextMenu.excelExport'),
                  action: () => {
                    this.printExcel('xlsx')
                  }
                }
              ]
            }
          ]
        ],
        rowHeaders: ['rowNum'],
        columnOptions: {
          resizable: true
        },
        copyOptions: {
          useFormattedValue: true
        },
        bodyHeight: 500
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
  methods: {
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
