<template>
  <div>
    <div v-if="!disabledNavigatorWrap" class="navi-wrap">
      <SJNavbar v-if="!disabledNavigator" />
      <slot name="master-btn" />
    </div>
    <SJSearch v-if="!disabledSearch">
      <slot />
    </SJSearch><!-- End Page Title -->
    <div ref="autoHeight" class="contents" style="flex-wrap: nowrap" autoHeight>
      <div style="position:relative;flex:1 1 0;">
        <slot name="bodyTitle" />
        <slot name="body" />
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
      // const absoluteBottom = this.$refs.autoHeight.getBoundingClientRect().bottom

      this.$refs.autoHeight.style.height = (height - absoluteTop - 45) + 'px'
    }
  }
}
</script>
<style scoped>
.SJSearchOneLayout_full {
  flex: 0 0 auto;
  width: 100%;
}
.contents{
  width: 100%;
  display: flex;
  margin: 0;
  padding: 0 20px;
}
</style>
