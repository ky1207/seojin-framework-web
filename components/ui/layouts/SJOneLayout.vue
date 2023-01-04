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
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <slot name="title" />
        </h5>
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

  }
}
</script>
