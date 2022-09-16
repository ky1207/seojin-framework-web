
<template class="vtop-layout">
  <div>
    <Grid
      ref="grid"
      :data="gridProps.data"
      :columns="gridProps.columns"
      :row-headers="gridProps.rowHeaders"
      :column-options="gridProps.columnOptions"
      :options="gridProps.options"
    />
  </div>
</template>

<script>
export default {
  auth: 'guest',
  meta: {
    title: 'Sample',
    closable: true
  },
  data () {
    return {
      gridProps: {
        data: [],
        columns: [
          // for columnData prop
          {
            header: 'Title',
            name: 'title',
            filter: 'select',
            sortable: true
          },
          {
            header: 'Brand',
            name: 'brand',
            filter: 'select',
            sortable: true

          },
          {
            header: 'Category',
            name: 'category',
            filter: 'select',
            sortable: true

          },
          {
            header: 'Price',
            name: 'price',
            filter: 'select',
            sortable: true

          }
        ],
        options: {
          pageOptions: {
            useClient: true,
            perPage: 10
          }
        }
      }
    }
  },
  async mounted () {
    const result = await this.$axios.get('https://dummyjson.com/products?limit=1000')
    this.gridProps.data = result.data.products
    this.$refs.grid.invoke('resetData', this.gridProps.data)
  }

}

</script>

<style>
</style>
