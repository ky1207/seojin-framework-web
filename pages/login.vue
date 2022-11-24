<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <img
                      src="@/assets/images/seojin.png"
                      style="width: 185px;"
                      alt="logo"
                    >
                    <h4 class="mt-1 mb-5 pb-1">
                      신정보시스템
                    </h4>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      v-model="username"
                      type="text"
                      class="form-control"
                      placeholder="ID"
                    >
                  </div>

                  <div class="form-outline mb-4">
                    <input v-model="password" type="password" class="form-control" placeholder="Password">
                  </div>

                  <div class="text-center pt-1 mb-5 pb-1">
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" @click="login">
                      Log in
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">
                    서진시스템
                  </h4>
                  <p class="small mb-0">
                    .....
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      username: 'devel',
      password: 'test'

    }
  },
  mounted () {
    // popup일경우, 자신 창을 닫기
    if (window.opener) {
      this.$auth.$storage.setCookie('redirect', '/')
      window.close()
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('customStrategy', {
          data: {
            username: this.username,
            password: this.password
          }
        })
      } catch (e) {
        this.error = e.response.data
      }
    }
  }
}
</script>
<style scoped>
.gradient-custom-2 {
  /* fallback for old browsers */
  background: #fccb90;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}

@media (min-width: 768px) {
  .gradient-form {
    height: 100vh !important;
  }
}
@media (min-width: 769px) {
  .gradient-custom-2 {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }
}

</style>
