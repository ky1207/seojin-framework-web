<template>
  <div>
    <div class="row pagetitle mt-1">
      <div v-if="!disabledNavigator" class="col">
        <h1>Dashboard</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active">
              Dashboard
            </li>
          </ol>
        </nav>
      </div>
      <div class="col-auto">
        <slot name="master-btn" />
      </div>
    </div><!-- End Page Title -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <slot />
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <slot name="bodyTitle" />  <!--body 타이틀명 -->
            </h5>

            <!-- body -->
            <slot name="body" />
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
    disabledNavigator: {
      type: Boolean,
      required: false,
      default: false
    }

  }
}
</script>
