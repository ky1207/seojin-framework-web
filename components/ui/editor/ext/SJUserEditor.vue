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
    <CommonUser ref="user" />
  </div>
</template>

<script>
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
    async  open () {
      // TODO: modal에 단일선택만 가능하게 및 선택된 값 전달.
      const data = await this.$refs.user.open()
      if (data.length > 0) {
        console.log(data)
      }
    }
  }
}
</script>

<style scoped>

</style>
