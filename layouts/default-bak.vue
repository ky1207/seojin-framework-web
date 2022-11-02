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
        <SJSlideBar :value="menus" />
      </ul>
      <hr>
    </div>

    <router-tab :tabs="tabs" :contextmenu="false" />
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
      ],
      menus: [
        {
          id: 1,
          name: 'Home',
          children: [{
            id: 2,
            name: this.$t('sample'),
            url: '/sample'
          },
          {
            id: 3,
            name: 'About',
            url: '/about'
          },
          {
            id: 4,
            name: '서진시스템',
            url: '/iframe/http:%2F%2Fseojinsystem.net%2F/%EC%84%9C%EC%A7%84%EC%8B%9C%EC%8A%A4%ED%85%9C'
          }
          ]
        },
        {
          id: 11,
          name: 'Second',
          children: [{
            id: 12,
            name: 'Second child1'
          },
          {
            id: 13,
            name: 'Second child2',
            url: '/sample'
          },
          {
            id: 14,
            name: 'Second child3',
            url: '/sample'
          }
          ]
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
