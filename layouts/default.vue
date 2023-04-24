<template>
  <SJSearch style="height:100vh;">
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
                <i class="fa-solid fa-user " />
                <p class="position-absolute">
                  99
                </p>
              </li>
              <li class="header-nav-item">
                <i class="fa-solid fa-power-off" />
              </li>
              <li class="header-nav-item">
                <i class="fa-solid fa-bars" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main id="main" class="main">
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
            >
              <i class="fa-solid fa-circle-arrow-left text-white" />
            </button>
            <div class="inb-wrap-link">
              <i class="fa-solid fa-list text-white" />
            </div>
            <div class="inb-wrap-link">
              <i class="fa-solid fa-star text-white" />
            </div>
          </div>
          <SJSlideBar id="menu-area" :value="menus" />
        </div>
      </aside>

      <section class="section">
        <div class="home-wrap">
          <div class="d-flex align-items-center">
            <div class="home-wrap-icon">
              <i class="fa-solid fa-house" />
            </div>
            <ul class="home-bar">
              <li v-for="(tab) in tabs" :key="tab.menuId" class="home-bar-item" :class="tab?.progPath===$route.path?'active':''" @click="linkTo(tab)">
                {{ tab.menuName }}
                <i class="fa-solid fa-xmark" @click="remove(tab)" />
              </li>
            </ul>
          </div>
        </div>
        <!-- Body 영역 시작-->
        <div class="navi-wrap">
          <SJNavbar />
          <SJPageButtons />
        </div>
        <SJSearch>
          <SJSearchField label="공통코드유형">
            <SJSelect />
          </SJSearchField>
          <SJSearchField label="대분류코드">
            <SJInput />
          </SJSearchField>
          <SJSearchField label="대분류명">
            <SJInput />
          </SJSearchField>
          <SJSearchField label="대분류명">
            <SJInput />
          </SJSearchField>
          <SJSearchField label="사용여부">
            <SJSelect />
          </SJSearchField>
        </SJSearch>
        <div class="contents">
          <div class="left-contents">
            <div class="txt-wrap">
              <h3><i class="fa-regular fa-folder-open" /> 대분류</h3>
            </div>
            <div class="grid-wrap">
              <div class="grid">
                <div>No</div>
                <div class="flex-fill text-center">
                  대분류코드
                </div>
                <div>
                  대분류코드
                </div>
                <div>대분류코드</div>
                <div>대분류코드</div>
                <div>대분류코드</div>
                <div>대분류코드</div>
                <div>대분류코드</div>
              </div>
              <div class="data-box">
                <p>데이터가 존재하지 않습니다.</p>
                <span class="number">1-25 of 102</span>
              </div>
            </div>
          </div>
          <span class="bar" />
          <div class="right-contents">
            <div class="top-form">
              <div class="txt-wrap">
                <h3><i class="fa-regular fa-folder-open" /> 대분류상세</h3>
                <div class="btn-bar">
                  <button class="btn-blue-bg">
                    신규코드
                  </button>
                </div>
              </div>
              <SJForm>
                <SJFormRow>
                  <SJFormField label="대분류코드">
                    <SJInput
                      id="form_large"
                      name="대분류코드"
                      type="text"
                      rules="required"
                    />
                  </SJFormField>
                  <SJFormField label="사용모듈">
                    <SJInput
                      id="form_large"
                      name="사용모듈"
                      type="text"
                      rules="required"
                    />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="공통코드유형">
                    <SJInput
                      id="form_large"
                      name="공통코드유형"
                      type="text"
                      rules="required"
                    />
                  </SJFormField>
                  <SJFormField label="사용여부">
                    <SJInput
                      id="form_large"
                      name="사용여부"
                      type="text"
                      rules="required"
                    />
                  </SJFormField>
                  <SJFormField label="사용여부">
                    <SJInput
                      id="form_large"
                      name="사용여부"
                      type="text"
                      rules="required"
                    />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="사용여부">
                    <SJInput
                      id="form_large"
                      name="사용여부"
                      type="text"
                      rules="required"
                    />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="대분류명">
                    <SJMultiInput
                      id="form_large"
                      name="대분류명"
                      type="text"
                      rules="required"
                    />
                  </SJFormField>
                </SJFormRow>
                <SJFormRow>
                  <SJFormField label="비고">
                    <SJTextarea
                      id="form_large"
                      name="비고"
                      type="text"
                      rules="required"
                    />
                  </SJFormField>
                </SJFormRow>
              </SJForm>
            </div>

            <div class="right-grid">
              <div class="txt-wrap">
                <h3><i class="fa-regular fa-folder-open" /> 소분류</h3>
                <div class="btn-bar">
                  <button class="btn-white-bg">
                    추가
                  </button>
                  <button class="btn-white-bg">
                    제외
                  </button>
                </div>
              </div>
              <div class="grid d-flex">
                <div><input type="checkbox" name="check"></div>
                <div class="flex-fill text-center">
                  대분류코드
                </div>
                <div class="flex-fill">
                  소분류명
                </div>
                <div class="flex-fill">
                  정렬
                </div>
                <div class="flex-fill">
                  사용여부
                </div>
                <div class="flex-fill">
                  비고
                </div>
                <div>Option</div>
                <div>Option</div>
              </div>
              <div class="data-box">
                <p>데이터가 존재하지 않습니다.</p>
              </div>
            </div>
          </div>
        </div>
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
  </sjsearch>
</template>
<script>
export default {
  data () {
    return {
      tabs: [],
      menus: [],
      cacheArray: ['index'],
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
      console.log(to)
      // console.log(this.$route.name)
      const menu = this.$store.getters.getMenu(to.path)
      this.addTab(menu)
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

    // //
    // // this.pushCnt = 5
    // // 예제.. 추후 처리 컴포넌트로 처리해야함
    // /**
    //  * Easy selector helper function
    //  */
    // const select = (el, all = false) => {
    //   el = el.trim()
    //   if (all) {
    //     return [...document.querySelectorAll(el)]
    //   } else {
    //     return document.querySelector(el)
    //   }
    // }
    //
    // /**
    //  * Easy event listener function
    //  */
    // const on = (type, el, listener, all = false) => {
    //   if (all) {
    //     select(el, all).forEach(e => e.addEventListener(type, listener))
    //   } else {
    //     select(el, all).addEventListener(type, listener)
    //   }
    // }
    //
    // /**
    //  * Easy on scroll event listener
    //  */
    // const onscroll = (el, listener) => {
    //   el.addEventListener('scroll', listener)
    // }
    //
    // /**
    //  * Sidebar toggle
    //  */
    // if (select('.toggle-sidebar-btn')) {
    //   on('click', '.toggle-sidebar-btn', function (e) {
    //     select('body').classList.toggle('toggle-sidebar')
    //     window.dispatchEvent(new Event('resize'))
    //   })
    // }
    //
    // /**
    //  * Search bar toggle
    //  */
    // if (select('.search-bar-toggle')) {
    //   on('click', '.search-bar-toggle', function (e) {
    //     select('.search-bar').classList.toggle('search-bar-show')
    //   })
    // }
    //
    // /**
    //  * Navbar links active state on scroll
    //  */
    // const navbarlinks = select('#navbar .scrollto', true)
    // const navbarlinksActive = () => {
    //   const position = window.scrollY + 200
    //   navbarlinks.forEach((navbarlink) => {
    //     if (!navbarlink.hash) { return }
    //     const section = select(navbarlink.hash)
    //     if (!section) { return }
    //     if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
    //       navbarlink.classList.add('active')
    //     } else {
    //       navbarlink.classList.remove('active')
    //     }
    //   })
    // }
    // window.addEventListener('load', navbarlinksActive)
    // onscroll(document, navbarlinksActive)
    //
    // /**
    //  * Toggle .header-scrolled class to #header when page is scrolled
    //  */
    // const selectHeader = select('#header')
    // if (selectHeader) {
    //   const headerScrolled = () => {
    //     if (window.scrollY > 100) {
    //       selectHeader.classList.add('header-scrolled')
    //     } else {
    //       selectHeader.classList.remove('header-scrolled')
    //     }
    //   }
    //   window.addEventListener('load', headerScrolled)
    //   onscroll(document, headerScrolled)
    // }
    //
    // /**
    //  * Back to top button
    //  */
    // const backtotop = select('.back-to-top')
    // if (backtotop) {
    //   const toggleBacktotop = () => {
    //     if (window.scrollY > 100) {
    //       backtotop.classList.add('active')
    //     } else {
    //       backtotop.classList.remove('active')
    //     }
    //   }
    //   window.addEventListener('load', toggleBacktotop)
    //   onscroll(document, toggleBacktotop)
    // }
  },
  methods: {
    linkTo (menu) {
      if (menu?.progPath) {
        this.$router.push(menu.progPath)
      }
    },
    remove (menu) {
      const index = this.tabs.findIndex(e => e.menuId === menu.menuId)
      this.tabs.splice(index, 1)
      this.cacheArray.splice(index, 1) // cache 삭제
      this.linkTo(this.tabs[this.tabs.length - 1])
    },
    addTab (menu) {
      if (this.tabs.length >= this.$consts.MENU_LIMIT) {
        return false
      }
      if (this.tabs.findIndex(e => e.progPath === menu.progPath) < 0) {
        // 최초이면
        this.cacheArray.push(this.$route.name) // cache추가
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

</style>
