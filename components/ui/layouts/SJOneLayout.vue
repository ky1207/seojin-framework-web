<template>
  <div>
    <div class="navi-wrap">
      <SJNavbar v-if="!disabledNavigator" />
      <slot name="master-btn" />
    </div>
    <div ref="autoHeight" class="contents row" style="flex-direction: column;" autoHeight>
      <div class="col-md-12 p-0">
        <slot name="title" />
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    disabledNavigator: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  activated () {
    window.addEventListener('resize', this.refresh)
  },
  deactivated () {
    window.removeEventListener('resize', this.refresh)
  },
  mounted () {
    this.refresh()
    window.dispatchEvent(new Event('resize'))
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.refresh)
  },
  methods: {
    refresh () {
      const height = window.innerHeight
      if (this.$refs.autoHeight.closest('.modal-dialog')) {
        // height = window.innerHeight / 2
        return
      }
      const absoluteTop = this.$refs.autoHeight.getBoundingClientRect().top

      this.$refs.autoHeight.style.height = (height - absoluteTop - 45) + 'px'
    }
  }
}
</script>
