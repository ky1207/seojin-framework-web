<template>
  <section class="login-layer-wrap">
    <div class="login-layout-title">
      <p>(주)서진시스템 :: 신정보시스템</p>
    </div>
    <div class="login-layout d-flex">
      <div class="login-left">
        <img class="logo" src="~/assets/images/login_icon.png">
      </div>
      <div class="login-right">
        <img class="logo" src="~/assets/images/seojin.png">
        <SJForm ref="form" class="login-layout-form">
          <div class="form-outline">
            <i class="fa-solid fa-building" />
            <SJSearchField :label="$t('page.system.00104')">
              <SJSelect
                id="business"
                v-model="bsnsId"
                class="select"
                :name="$t('page.system.00104')"
                :options="common.BUSINESS"
                disabled-validation
                disabled-first-message
              />
            </SJSearchField>
          </div>
          <div class="form-outline">
            <i class="fa-solid fa-user" />
            <SJSearchField label="ID">
              <SJInput
                id="name"
                v-model="username"
                name="ID"
                rules="required"
                placeholder="ID"
                class="select"
              />
            </SJSearchField>
          </div>
          <div class="form-outline">
            <i class="fa-solid fa-key" />
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
          <input type="checkbox" name="check" style="border:solid 1px #999; margin-right: 5px;">
          <p>계정저장</p>
          <p>비밀번호 찾기</p>
        </div>
        <button class="btn btn-blue-bg" type="button" @click="login">
          LOGIN
        </button>
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
      password: 'test',
      bsnsId: null,
      common: {}
    }
  },
  async created () {
    await Promise.all([this.$api.common.getBusinessIds()])
      .then((response) => {
        this.common = {
          BUSINESS: response[0].data
        }
      })
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
  background: #007DB6;
  position: relative;
}
</style>
