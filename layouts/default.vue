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
          <nav class="header-nav ms-auto">
            <ul class="header-nav-list d-flex">
              <li class="nav-item dropdown header-nav-item">
                <a href="#" class="nav-link nav-icon" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ currentLang }}
                  <i class="fa-solid fa-caret-down px-1" />
                </a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow language">
                  <li class="dropdown-item d-flex align-items-center" @click="change18n('ko')">
                    <img src="~/assets/images/flag/ko.png" alt="">한국어
                  </li>
                  <li class="dropdown-item d-flex align-items-center" @click="change18n('en')">
                    <img src="~/assets/images/flag/en.png" alt="">English
                  </li>
                  <li class="dropdown-item d-flex align-items-center" @click="change18n('vi')">
                    <img src="~/assets/images/flag/vi.png" alt="">Việt Nam
                  </li>
                </ul>
              </li>
              <li class="header-nav-item position-relative">
                <i class="fa-regular fa-bell" style="cursor:pointer;" @click="alarmModalOpen" />
                <p class="position-absolute">
                  {{ pushCnt }}
                </p>
              </li>
              <li class="header-nav-item">
                <i class="fa-solid fa-power-off" style="cursor:pointer;" @click="logout" />
              </li>
              <li class="header-nav-item">
                <i class="fa-solid fa-plus" />
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

      <section class="section" style="overflow: visible;">
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

    <footer class="fixed-bottom d-flex align-items-center">
      <div class="ft-title">
        (주)서진시스템 :: 신정보시스템
      </div>
      <div class="ft-txt">
        <i class="fa-regular fa-circle-user" />
        <p>{{ $auth.user?.userName }}</p>
      </div>
      <!--      <div class="ft-btn d-flex align-items-center">-->
      <!--        <button class="btn d-flex justify-content-center align-items-center">-->
      <!--          조회-->
      <!--        </button>-->
      <!--        <button class="btn d-flex justify-content-center align-items-center">-->
      <!--          조회-->
      <!--        </button>-->
      <!--      </div>-->
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
        return 'Việt Nam'
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
  created () {
    const sortedTree = this.$store.getters.getMenus()
    this.menus = sortedTree?._children

    /* 상단 푸시 알림 숫자 */
    this.getAlarmCount()
    setInterval(() => {
      this.getAlarmCount()
    }, 60 * 1000)
  },
  mounted () {
    if (this.$route.path !== '/') {
      const menu = this.$store.getters.getMenu(this.$route.path)
      this.addTab(menu)
    }
  },
  methods: {
    async  getAlarmCount () {
      const pushCntData = await this.$api.system.alarm.alarmCnt()
      this.pushCnt = pushCntData.data
    },
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
      if (this.tabs.findIndex(e => e.progPath === menu.progPath) > -1) {
        return false
      }
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
