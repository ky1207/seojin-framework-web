<template>
  <div>
    <Grid
      ref="grid"
      :data="value"
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
      type: [Array, Object],
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
        columnOptions: {
          resizable: true
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
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.$refs.grid.invoke('resetData', newValue)
    }
  }
}
</script>
<style>

</style>
