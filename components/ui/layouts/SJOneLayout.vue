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
    <div ref="autoHeight" autoHeight class="card">
      <div class="card-body">
        <h5 class="card-title">
          <slot name="title" />
        </h5>
        <div>
          <slot />
        </div>
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
      const absoluteTop = this.$refs.autoHeight.getBoundingClientRect().top
      const absoluteBottom = this.$refs.autoHeight.getBoundingClientRect().bottom

      this.$refs.autoHeight.style.height = (window.innerHeight - absoluteBottom + (absoluteBottom - absoluteTop)) + 'px'
    }
  }
}
</script>
