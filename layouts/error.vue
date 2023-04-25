<template>
  <div style="height: 100%">
    <div class="container">
      <div><img src="~/assets/images/error.png"></div>
      <div class="error-layer">
        <div class="error-header" style="font-size: 60px;color: #007DB6;font-weight: bold">
          페이지를 찾을 수 없습니다.
        </div>
        <div class="error-body" style="font-size: 18px;line-height: 2.1">
          <p>페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. <br> 입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
        </div>
        <div class="error-footer">
          <button class="btn-alert" type="button" @click="goToMain">
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

Diff
Copy
Insert
New
<script>
export default {
  layout: 'empty',
  props: ['error'],
  methods: {
    goToMain () {
      this.$router.back()
    }
  }
}
</script>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100vh;
}
.error-layer{
  margin-left: 30px;}
</style>
