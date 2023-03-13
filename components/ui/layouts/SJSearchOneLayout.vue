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
      <div v-if="!disabledSearch" class="SJSearchOneLayout_full">
        <div class="card">
          <div class="card-body">
            <slot />
          </div>
        </div>
      </div>
      <div class="SJSearchOneLayout_full">
        <div ref="autoHeight" class="card" autoHeight>
          <div class="card-body">
            <h5 class="card-title">
              <slot name="bodyTitle" />  <!--body 타이틀명 -->
            </h5>

            <!-- body -->
            <div>
              <slot name="body" />
            </div>
            <!-- End body-->
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
    }
  }
}
</script>
<style scoped>
.SJSearchOneLayout_full {
  flex: 0 0 auto;
  width: 100%;
}
</style>
