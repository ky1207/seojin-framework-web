<template>
  <div>
    <!-- ======= Header ======= -->
    <header id="header" class="header fixed-top d-flex align-items-center">
      <div class="d-flex align-items-center justify-content-between">
        <nuxt-link to="/" class="logo d-flex align-items-center">
          <img src="@/assets/images/seojin.png">
          <span class="d-none d-lg-block" />
        </nuxt-link>
        <i class="bi bi-list toggle-sidebar-btn" />
      </div><!-- End Logo -->

      <div class="search-bar">
        <form class="search-form d-flex align-items-center" method="POST">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword">
          <button type="submit" title="Search">
            <i class="bi bi-search" />
          </button>
        </form>
      </div><!-- End Search Bar -->

      <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">
          <li class="nav-item d-block d-lg-none">
            <div class="nav-link nav-icon search-bar-toggle">
              <i class="bi bi-search" />
            </div>
          </li><!-- End Search Icon-->
          <li class="nav-item dropdown pe-3">
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
              <span class="d-none d-md-block dropdown-toggle ps-2">{{ currentLang }}</span>
            </a><!-- End Profile Iamge Icon -->

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li>
                <a class="dropdown-item d-flex align-items-center" @click="change18n('en')">
                  <span>English</span>
                </a>
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center" @click="change18n('ko')">
                  <span>한국어</span>
                </a>
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center" @click="change18n('vi')">
                  <span>베트남어</span>
                </a>
              </li>
            </ul><!-- End Profile Dropdown Items -->
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link nav-icon" href="#" @click="alarmModalOpen()">
              <i class="bi bi-bell" />
              <span class="badge bg-primary badge-number">{{ pushCnt }}</span>
            </a><!-- End Notification Icon -->
          </li><!-- End Notification Nav -->

          <li class="nav-item dropdown pe-3">
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
              <span class="d-none d-md-block dropdown-toggle ps-2">{{ $auth.user?.userName }}</span>
            </a><!-- End Profile Iamge Icon -->

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li class="dropdown-header">
                <h6>{{ $auth.user?.userName }}</h6>
                <span>{{ $auth.user?.userEnName }}</span>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                  <i class="bi bi-gear" />
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                  <i class="bi bi-question-circle" />
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center" @click="logout">
                  <i class="bi bi-box-arrow-right" />
                  <span>Sign Out</span>
                </a>
              </li>
            </ul><!-- End Profile Dropdown Items -->
          </li><!-- End Profile Nav -->
        </ul>
      </nav><!-- End Icons Navigation -->
    </header><!-- End Header -->

    <SJSlideBar :value="menus" />
    <SJNotify />
    <!-- ======= Sidebar ======= -->
    <main id="main" class="main">
      <router-tab :tabs="tabs" :contextmenu="false" />
    </main><!-- End #main -->
    <SJSpinner ref="spinner" />
    <!-- ======= Footer ======= -->
    <CommonAlarm ref="alarmModal" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabs: [
        {
          to: '/',
          title: this.$t('sample'),
          closable: false
        }
      ],
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
  async created () {
    const sortedTree = this.$store.getters.getMenus()
    this.menus = sortedTree._children

    /* 상단 푸시 알림 숫자 */
    this.search.rcvrId = this.$auth.user.userId
    this.search.pushInqryFlag = false
    const pushCntData = await this.$api.system.alarm.alarmCnt(this.search)
    this.pushCnt = pushCntData.data
  },
  mounted () {
    //
    // this.pushCnt = 5
    // 예제.. 추후 처리 컴포넌트로 처리해야함
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      if (all) {
        select(el, all).forEach(e => e.addEventListener(type, listener))
      } else {
        select(el, all).addEventListener(type, listener)
      }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }

    /**
     * Sidebar toggle
     */
    if (select('.toggle-sidebar-btn')) {
      on('click', '.toggle-sidebar-btn', function (e) {
        select('body').classList.toggle('toggle-sidebar')
        window.dispatchEvent(new Event('resize'))
      })
    }

    /**
     * Search bar toggle
     */
    if (select('.search-bar-toggle')) {
      on('click', '.search-bar-toggle', function (e) {
        select('.search-bar').classList.toggle('search-bar-show')
      })
    }

    /**
     * Navbar links active state on scroll
     */
    const navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      const position = window.scrollY + 200
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) { return }
        const section = select(navbarlink.hash)
        if (!section) { return }
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    const selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    const backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  },
  methods: {
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
 .router-tab__nav {
   background: white;
 }

</style>
