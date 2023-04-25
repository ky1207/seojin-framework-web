<template>
  <div>
    <div class="navi-wrap">
      <SJNavbar v-if="!disabledNavigator" />
      <slot name="master-btn" />
    </div><!-- End Page Title -->
    <SJSearch v-if="!disabledSearch">
      <slot />
    </SJSearch>
    <div class="contents row" style="position: relative;">
      <div ref="autoHeight" class="left-contents col-md-6" autoHeight>
        <slot name="leftTitle" />
        <slot name="left" />
      </div>
      <span class="bar px-1" />
      <div ref="autoHeight2" class="right-contents col-md-6" autoHeight>
        <slot name="rightTitle" />
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    disabledSearch: {
      type: Boolean,
      required: false,
      default: false
    },
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
      // const absoluteBottom = this.$refs.autoHeight.getBoundingClientRect().bottom

      this.$refs.autoHeight.style.height = (height - absoluteTop - 45) + 'px'
      this.$refs.autoHeight2.style.height = this.$refs.autoHeight.style.height
    }
  }

}
</script>
<style scoped>
.SJSearchLRLayout_full {
  flex: 0 0 auto;
  width: 100%;
}
.SJSearchLRLayout_half {
  flex: 0 0 auto;
  width: 50%;
}
</style>
