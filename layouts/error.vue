<template>
  <div style="height: 100%;display:flex; justify-content:center; align-items: center;">
    <div style="margin-right: 20px;">
      <img src="~assets/images/error.png">
    </div>
    <div class="error-layer">
      <div class="error-header" style="font-size: 50px;color: #007DB6;font-weight: bold">
        <h1 style="font-size: 80px">
          {{ error.statusCode }}
        </h1>페이지를 찾을 수 없습니다.
      </div>
      <div class="error-body">
        <!--{{ error.message }}-->
        <p style="font-size: 18px;line-height:1.5">
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. <br> 입력하신 주소가 정확한지 다시 한 번 확인해주세요.
        </p>
      </div>
      <button class="btn-alert" type="button" @click="goToMain">
        메인으로 돌아가기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: ['error'],
  methods: {
    goToMain () {
      if (this.$route.path === '/') {
        window.open('/', '_self')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
<style>
#__layout>div{
  height: 100%;}
img{
  width: 300px;
  height: 300px;}
.container img{
  width: 150px;
  height: 150px;}
h1 {
  font-size: 20px;
}
</style>
