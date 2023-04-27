<template>
  <div>
    <div class="navi-wrap">
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
      <div ref="autoHeight" class="left-contents col-md-6" autoHeight>
        <slot name="leftTitle" />  <!--left 타이틀명 -->
        <slot name="left" />
      </div>
      <div ref="topAutoHeight" class="right-contents col-md-6">
        <slot name="rightTitle1" />
        <slot name="right1" />
        <slot name="rightTitle2" />
        <div ref="autoHeight2" autoHeight>
          <slot name="right2" />
        </div>
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

      this.$refs.autoHeight.style.height = (height - absoluteTop - 45) + 'px'
      this.$refs.autoHeight2.style.height = ((height - absoluteTop - 45) - this.$refs.topAutoHeight.getBoundingClientRect().height - 10) + 'px'
    }
  }

}
</script>
<style scoped>
/*.SJSearchTLRLayout_full {*/
/*  flex: 0 0 auto;*/
/*  width: 100%;*/
/*}*/
/*.SJSearchTLRLayout_half {*/
/*  flex: 0 0 auto;*/
/*  width: 50%;*/
/*}*/

.contents{
  width: 100%;
  display: flex;
  margin: 0;
  padding: 0 20px;
}

</style>
