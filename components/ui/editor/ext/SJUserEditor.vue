<template>
  <div>
    <SJSearchSelect
      :id="id"
      :value="value"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :disabled-validation="disabledValidation"
      enable-popup
      search-url="/api/v1.0/user/search"
      item-text="text"
      item-value="value"
      param="search"
      :search-click="open"
    />
    <CommonItem ref="item" />
  </div>
</template>

<script>
// TODO: api url 작업후 확인
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: null
    },
    rules: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabledValidation: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    open () {
      this.$refs.item.open()
    }
  }
}
</script>

<style scoped>

</style>
