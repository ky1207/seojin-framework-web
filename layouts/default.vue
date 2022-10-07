<template>
  <div id="app">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-black bg-light" style="width: 280px;">
      <div class="dropdown">
        <a id="dropdownUser1" href="#" class="d-flex align-items-center text-black text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong>장 한 수</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><a class="dropdown-item" href="#">설정</a></li>
          <li><a class="dropdown-item" href="#">프로필</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">로그아웃</a></li>
        </ul>
      </div>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <nuxt-link
            to="/sample"
            class="nav-link"
            :class="{active: isActive('/sample'),'text-black':!isActive('/sample')}"
            aria-current="page"
          >
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#home" /></svg>
            Sample
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/about"
            class="nav-link"
            :class="{active: isActive('/about'),'text-black':!isActive('/about')}"
          >
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2" /></svg>
            About
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'iframe',
              params: {
                src: 'http://seojinsystem.net/',
                title: '서진시스템'
              }
            }"
            class="nav-link"
            :class="{active: isActive('/iframe/http:%2F%2Fseojinsystem.net%2F/%EC%84%9C%EC%A7%84%EC%8B%9C%EC%8A%A4%ED%85%9C'),'text-black':!isActive('/iframe/http:%2F%2Fseojinsystem.net%2F/%EC%84%9C%EC%A7%84%EC%8B%9C%EC%8A%A4%ED%85%9C'
            )}"
          >
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#table" /></svg>
            서진시스템
          </nuxt-link>
        </li>
      </ul>
      <hr>
    </div>

    <router-tab :tabs="tabs" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabs: [
        {
          to: '/sample',
          title: 'Sample',
          closable: false
        }
      ]
    }
  },
  methods: {
    isActive (url) {
      return this.$route.path === url
    }
  }
}
</script>
<style lang="scss">
html,
body {
  margin: 0;
  width: 100%;
}
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#nav {
  flex: none;
  box-sizing: border-box;
  padding: 30px 15px;
  width: 200px;
  border-right: 1px solid #eaecef;
  text-align: center;
  a {
    display: block;
    margin: 1em 0;
    font-weight: bold;
    color: #2c3e50;
    &:hover,
    &.nuxt-link-exact-active {
      color: #42b983;
    }
    &.hightLight {
      color: #ff5b77;
      &:hover,
      &.nuxt-link-exact-active {
        color: red;
      }
    }
  }
}
.router-tab {
  flex: 1 1 0px;
  &-page {
    padding: 20px 15px;
  }
}
$smallScreen: 767.98px;
@media screen and (max-width: $smallScreen) {
  #app {
    flex-direction: column;
  }
  #nav {
    padding: 0 15px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    overflow: auto;
    a {
      margin: 0 1em;
      display: inline-block;
    }
  }
}
</style>
