<template>
  <SJOneLayout>
    <div class="page-wrap d-flex flex-row align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 text-center">
            <span class="display-1 d-block"> {{ error.statusCode }}</span>
            <div class="mb-4 lead">
              {{ error.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </SJOneLayout>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  }

}
</script>
<style>
h1 {
  font-size: 20px;
}
</style>
