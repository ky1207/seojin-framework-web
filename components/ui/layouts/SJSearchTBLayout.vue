<template>
  <div>
    <div v-if="!disabledNavigatorWrap" class="navi-wrap">
      <SJNavbar v-if="!disabledNavigator" />
      <slot name="master-btn" />
    </div><!-- End Page Title -->
    <SJSearch v-if="!disabledSearch">
      <slot />
    </SJSearch>
    <div class="contents row" style="height: 30%;position: relative;">
      <div class="col-md-12" style="padding: 0">
        <slot name="topTitle" />
        <slot name="top" />
      </div>
      <div ref="autoHeight" class="left-contents col-md-12" autoHeight>
        <slot name="bottomTitle" />
        <slot name="bottom" />
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
    },
    disabledNavigatorWrap: {
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
<style scoped>

.contents{
  width: 100%;
  display: flex;
  margin: 0;
  padding: 0 20px;
}

</style>
