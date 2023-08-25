<template>
  <div style="display: flex;">
    <SJGrid
      ref="grid"
      style="width: 95%;"
      :value="value"
      :columns="columns"
      :options="options"
    />
    <div class="grid-wrap" style="display:flex;flex-direction: column; align-items: center;margin: 0 5px;">
      <button class="btn-pop-none">
        <i class="fa-solid fa-caret-up" />
      </button>
      <button class="btn-pop-none">
        <i class="fa-solid fa-caret-down" />
      </button>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>

</style>
