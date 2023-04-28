<template>
  <div style="height:100vh;">
    <header id="header" class="header fixed-top">
      <div class="navbar">
        <div class="logo">
          <img class="logo-image" src="~/assets/images/logo.png" alt="">
        </div>
        <div class="nav-wrap">
          <div class="search-bar">
            <input type="text" name="search" placeholder="SEARCH" class="search-bar-input">
            <i class="search-bar-icon fa-solid fa-magnifying-glass" />
          </div>
          <nav class="header-nav">
            <ul class="header-nav-list d-flex">
              <li class="header-nav-item position-relative">
                <i class="fa-solid fa-user" style="cursor:pointer;" @click="alarmModalOpen" />
                <p class="position-absolute">
                  99
                </p>
              </li>
              <li class="header-nav-item">
                <i class="fa-solid fa-power-off" style="cursor:pointer;" @click="logout" />
              </li>
              <li class="header-nav-item">
                <i class="fa-solid fa-bars" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main id="main" class="main" style="">
      <aside class="aside">
        <div class="slider d-flex">
          <div class="inb-wrap">
            <button
              id="toggle-button"
              class="inb-wrap-link rotate"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu-area"
              aria-expanded="true"
              aria-controls="#menu-area"
              @click="resize"
            >
              <i class="fa-solid fa-circle-arrow-left text-white" />
            </button>
            <div class="inb-wrap-link">
              <i class="fa-solid fa-list text-white" @click="resize" />
            </div>
            <div class="inb-wrap-link">
              <i class="fa-solid fa-star text-white" />
            </div>
          </div>
          <SJSlideBar id="menu-area" :value="menus" />
        </div>
      </aside>

      <section class="section" style="">
        <div class="home-wrap">
          <div class="d-flex align-items-center">
            <div class="home-wrap-icon" style="cursor:pointer;" @click="$router.push('/')">
              <i class="fa-solid fa-house" />
            </div>
            <ul class="home-bar" style="cursor:pointer;">
              <li v-for="(tab) in tabs" :key="tab.menuId" class="home-bar-item" :class="tab?.progPath===$route.path?'active':''" @click="linkTo(tab)">
                {{ tab.menuName }}
                <i class="fa-solid fa-xmark" @click="remove(tab)" />
              </li>
            </ul>
          </div>
        </div>
        <RouterTab ref="tab" :tabs="tabs" />
        <SJNotify />
        <SJSpinner ref="spinner" />
        <CommonAlarm ref="alarmModal" />
        <!-- Body 영역 끝-->
      </section>
    </main>

    <footer class=" fixed-bottom d-flex justify-content-end align-items-center">
      <div class="ft-txt">
        <i class="fa-regular fa-circle-user" />
        <p>개발자님 안녕하세요.</p>
      </div>
      <div class="ft-btn d-flex align-items-center">
        <button class="btn d-flex justify-content-center align-items-center">
          조회
        </button>
        <button class="btn d-flex justify-content-center align-items-center">
          조회
        </button>
      </div>
    </footer>
  </div>
</template>
<script>

// const HOME = { menuName: 'Home', progPath: '/', menuId: '0' }
export default {
  data () {
    return {
      tabs: [],
      menus: [],
      pushCnt: 0,
      search: {}
    }
  },

  computed: {
    currentLang () {
      if (this.$i18n.getLocaleCookie() === 'en') {
        return 'English'
      } else if (this.$i18n.getLocaleCookie() === 'vi') {
        return '베트남어'
      }
      return '한국어'
    }
  },
  watch: {
    $route (to, from) {
      const menu = this.$store.getters.getMenu(to.path)
      if (menu !== null) { this.addTab(menu) }
    }
  },
  async created () {
    const sortedTree = this.$store.getters.getMenus()
    this.menus = sortedTree?._children

    /* 상단 푸시 알림 숫자 */
    this.search.rcvrId = this.$auth.user.userId
    this.search.pushInqryFlag = false
    const pushCntData = await this.$api.system.alarm.alarmCnt(this.search)
    this.pushCnt = pushCntData.data
  },
  mounted () {
    if (this.$route.path !== '/') {
      const menu = this.$store.getters.getMenu(this.$route.path)
      this.addTab(menu)
    }
  },
  methods: {
    resize () {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    },
    linkTo (menu) {
      if (menu?.progPath) {
        this.$router.push(menu.progPath)
      } else {
        this.$router.push('/')
      }
    },
    remove (menu) {
      const index = this.tabs.findIndex(e => e.menuId === menu.menuId)
      this.tabs.splice(index, 1)
      this.$tabs.closeTab(menu.progPath)
      this.linkTo(this.tabs[this.tabs.length - 1])
    },
    addTab (menu) {
      if (this.tabs.length >= this.$consts.MENU_LIMIT) {
        const first = this.tabs.shift()
        this.$tabs.removeTab(first.progPath)
      }
      if (this.tabs.findIndex(e => e.progPath === menu.progPath) < 0) {
        // 최초이면
        this.tabs.push(menu)
      }
    },
    change18n (lang) {
      this.$i18n.setLocale(lang)

      // iframe 사라짐
      window.location.reload()
    },
    isActive (url) {
      return this.$route.path === url
    },
    logout () {
      this.$auth.logout()
    },
    async alarmModalOpen () {
      await this.$refs.alarmModal.open()
    }

  }
}
</script>
<style>
body {
  background: #E8ECF4;
}
.router-tab__header {
  display: none;
}
</style>
