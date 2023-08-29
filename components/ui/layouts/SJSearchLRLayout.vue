<template>
  <div>
    <div v-if="!disabledNavigatorWrap" class="navi-wrap">
      <SJNavbar v-if="!disabledNavigator" />
      <slot name="master-btn" />
    </div><!-- End Page Title -->
    <SJSearch v-if="!disabledSearch">
      <slot />
    </SJSearch>
    <div class="contents d-flex" style="flex-wrap: nowrap">
      <Splitpanes class="default-theme" @resize="onResize">
        <Pane :size="leftSize" min-size="30">
          <div ref="autoHeight" class="left-contents" autoHeight>
            <slot name="leftTitle" />
            <slot name="left" />
          </div>
        </Pane>
        <Pane :size="rightSize" min-size="30">
          <div ref="autoHeight2" class="right-contents" autoHeight>
            <slot name="rightTitle" />
            <slot name="right" />
          </div>
        </Pane>
      </Splitpanes>
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
    },
    leftSize: {
      type: Number,
      default: 50
    },
    rightSize: {
      type: Number,
      default: 50
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
    onResize () {
      window.dispatchEvent(new Event('resize'))
    },
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
<style>
.SJSearchLRLayout_full {
  flex: 0 0 auto;
  width: 100%;
}
.SJSearchLRLayout_half {
  flex: 0 0 auto;
  width: 50%;
}

.splitpanes.default-theme .splitpanes__pane {
  background: white;
}
.default-theme .splitpanes--vertical>.splitpanes__splitter,.default-theme.splitpanes--vertical>.splitpanes__splitter {
  border-left: unset;
  width: 10px;
  margin:1px;
}
</style>
