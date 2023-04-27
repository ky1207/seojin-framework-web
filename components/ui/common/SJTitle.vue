<template>
  <div class="txt-wrap">
    <h3><i class="fa-regular fa-folder-open" /> {{ title }}</h3>
    <div class="btn-bar">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
