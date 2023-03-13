<template>
  <div>
    <div class="row pagetitle mt-1">
      <div v-if="!disabledNavigator" class="col">
        <SJNavbar />
      </div>
      <div class="col-auto">
        <slot name="master-btn" />
      </div>
    </div><!-- End Page Title -->
    <div class="row">
      <div v-if="!disabledSearch" class="SJSearchLRLayout_full">
        <div class="card">
          <div class="card-body">
            <slot />
          </div>
        </div>
      </div>
      <div class="SJSearchLRLayout_half">
        <div ref="autoHeight" class="card" autoHeight>
          <div class="card-body">
            <h5 class="card-title">
              <slot name="leftTitle" />  <!--left 타이틀명 -->
            </h5>

            <!-- left -->
            <div>
              <slot name="left" />
            </div>
            <!-- End left-->
          </div>
        </div>
      </div>

      <div class="SJSearchLRLayout_half">
        <div ref="autoHeight2" class="card" autoHeight>
          <div class="card-body">
            <h5 class="card-title">
              <slot name="rightTitle" />  <!--right 타이틀명 -->
            </h5>
            <!-- left -->
            <div>
              <slot name="right" />
            </div>
            <!-- End left-->
          </div>
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
      const absoluteBottom = this.$refs.autoHeight.getBoundingClientRect().bottom

      this.$refs.autoHeight.style.height = (height - absoluteBottom + (absoluteBottom - absoluteTop)) + 'px'
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
