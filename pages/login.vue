<template>
  <section class="login-layer-wrap">
    <div><img src="~/assets/images/seojin.png"></div>
    <div class="login-layout">
      <div class="login-layout-title">
        <p><i class="fa-regular fa-user" /></p>
        <h2>LOGIN</h2>
      </div>
      <SJForm ref="form" class="login-layout-form">
        <div class="form-outline" style="margin-bottom: 20px;">
          <i class="fa-solid fa-building" style="margin-right: 10px;" />
          <SJSearchField label="Company">
            <SJSelect class="select" />
          </SJSearchField>
        </div>
        <div class="form-outline" style="margin-bottom: 20px;">
          <i class="fa-solid fa-user" style="margin-right: 10px;" />
          <SJSearchField label="ID">
            <SJInput
              id="name"
              v-model="username"
              name="ID"
              type="text"
              rules="required"
              placeholder="ID"
              class="select"
            />
          </SJSearchField>
        </div>
        <div class="form-outline" style="margin-bottom: 20px;">
          <i class="fa-solid fa-key" style="margin-right: 10px;" />
          <SJSearchField label="Password">
            <SJInput
              id="name"
              v-model="password"
              name="Password"
              type="password"
              rules="required"
              placeholder="Password"
              class="select"
            />
          </SJSearchField>
        </div>
      </SJForm>
      <div class="id-box">
        <input type="checkbox" name="check" style="margin-right: 5px;">
        <p>계정저장</p>
        <p>비밀번호 찾기</p>
      </div>
      <button class="btn btn-blue-bg" type="button" @click="login">
        Login
      </button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      username: 'devel',
      password: 'test',
      bsnsId: 1

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
      this.error = null
      const result = await this.$refs.form.validate()
      if (!result) { return false }

      await this.$auth.loginWith('customStrategy', {
        data: {
          username: this.username,
          password: this.password,
          bsnsId: this.bsnsId
        }
      })
    }
  }
}
</script>
<style scoped>
section{
  width: 100%;
  height: 100vh;
  background-image: url("~assets/images/login_bg.png");
  background-position:center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
img{
  position: absolute;
  left: 0;
  top: 0;
  width: 160px;
  height: 80px;
  margin: 20px 0 0 30px;
}
.btn:hover{
  background: #0365A9;
  color: #fff;
}
</style>
