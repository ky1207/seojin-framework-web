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
              aria-expanded="false"
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
          <div id="menu-area" class="menu-area collapse-in">
            <ul id="menuAccordion" class="main-menu accordion">
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">기존정보관리</a>
                </div>
              </li>
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">영업관리</a>
                </div>
              </li>
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">구매자재관리</a>
                </div>
              </li>
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">SCM</a>
                </div>
              </li>
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">재고관리</a>
                </div>
              </li>
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">생산관리</a>
                </div>
              </li>
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">품질관리</a>
                </div>
              </li>
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">현황관리</a>
                </div>
              </li>
              <li class="main-menu-item">
                <div class="main-menu-link">
                  <a href="#">커뮤니티</a>
                </div>
              </li>
              <li class="main-menu-item">
                <a
                  id="heading-ten"
                  class="main-menu-link btn collapsed accordion-button-one"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-ten"
                >
                  시스템관리
                </a>
                <ul
                  id="collapse-ten"
                  class="sub-menu accordion-collapse collapse"
                  data-bs-parent="#menuAccordion"
                >
                  <li id="heading-sub-one" class="accordion-item accordion-header">
                    <a
                      class="btn sub-menu-item active accordion-button"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-sub-one"
                    >
                      기준정보관리
                    </a>
                    <ul
                      id="collapse-sub-one"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <li class="sub-menu-list accordion-body">
                        <a href="#">공통코드관리</a>
                      </li>
                      <li class="sub-menu-list accordion-body">
                        <a href="#">프로그램관리</a>
                      </li>
                      <li class="sub-menu-list accordion-body">
                        <a href="#">회사관리</a>
                      </li>
                      <li class="sub-menu-list accordion-body">
                        <a href="#">부서관리</a>
                      </li>
                      <li class="sub-menu-list accordion-body">
                        <a href="#">일일양식관리</a>
                      </li>
                      <li class="sub-menu-list accordion-body">
                        <a href="#">프로그램 도움말</a>
                      </li>
                    </ul>
                  </li>
                  <li id="heading-sub-two" class="accordion-item accordion-header">
                    <a
                      class="btn sub-menu-item accordion-button"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-sub-two"
                    >
                      권한관리
                    </a>
                    <ul
                      id="collapse-sub-two"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    />
                  </li>
                  <li id="heading-sub-three" class="accordion-item accordion-header">
                    <a
                      class="btn sub-menu-item accordion-button"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-sub-three"
                    >
                      서버관리
                    </a>
                    <ul
                      id="collapse-sub-three"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <section class="section">
        <div class="home-wrap">
          <div class="d-flex align-items-center">
            <div class="home-wrap-icon">
              <i class="fa-solid fa-house" />
            </div>
            <ul class="home-bar">
              <li class="home-bar-item active">
                공통코드관리
                <i class="fa-solid fa-xmark" />
              </li>
              <li class="home-bar-item">
                기준정보관리
                <i class="fa-solid fa-xmark" />
              </li>
              <li class="home-bar-item">
                Home
                <i class="fa-solid fa-xmark" />
              </li>
            </ul>
          </div>
        </div>
        <div class="navi-wrap">
          <div class="navi">
            <i class="navi-icon active fa-solid fa-star" />
            <div class="navi-link">
              home
            </div>
            <i class="navi-icon fa-solid fa-chevron-right" />
            <div class="navi-link">
              기준정보관리
            </div>
            <i class="navi-icon fa-solid fa-chevron-right" />
            <div class="navi-link">
              기준정보관리
            </div>
          </div>
          <div class="d-flex">
            <div class="btn-bar">
              <button class="btn-gray-bg">
                조회
              </button>
              <button class="btn-gray-bg">
                조회
              </button>
              <button class="btn-gray-bg">
                조회
              </button>
              <button class="btn-gray-bg">
                조회
              </button>
            </div>
          </div>
        </div>

        <div class="code-search">
          <div class="code-search-form">
            <label>공통코드유형</label>
            <select class="code-search-select" name="code">
              <option value="선택하세요">
                선택하세요
              </option>
              <option value="선택하세요">
                선택하세요
              </option>
              <option value="선택하세요">
                선택하세요
              </option>
            </select>
          </div>
          <div class="code-search-form">
            <label>대분류코드</label>
            <input class="code-search-input" type="text">
          </div>
          <div class="code-search-form">
            <label>대분류명 </label>
            <input class="code-search-input" type="text">
          </div>
          <div class="code-search-form">
            <label>대분류명</label>
            <input class="code-search-input" type="text">
          </div>
          <div class="code-search-form">
            <label>사용여부 </label>
            <select class="code-search-select" name="code">
              <option value="선택하세요">
                선택하세요
              </option>
              <option value="선택하세요">
                선택하세요
              </option>
              <option value="선택하세요">
                선택하세요
              </option>
            </select>
          </div>
        </div>
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
              <form>
                <div class="sj-form-field">
                  <fieldset>
                    <legend>대분류코드<i class="fa-solid fa-asterisk fa-2xs" /></legend>
                    <div>
                      <input type="text">
                      <span class="inp-alert">대분류명 항목은 필수 정보입니다.</span>
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend>사용모듈</legend>
                    <div>
                      <input type="text">
                      <span class="inp-alert">대분류명 항목은 필수 정보입니다.</span>
                    </div>
                  </fieldset>
                </div>
                <div class="sj-form-field">
                  <fieldset>
                    <legend>공통코드유형<i class="fa-solid fa-asterisk fa-2xs" /></legend>
                    <div>
                      <input type="text">
                      <span class="inp-alert">대분류명 항목은 필수 정보입니다.</span>
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend>사용여부</legend>
                    <div>
                      <input type="text">
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend>사용여부</legend>
                    <div>
                      <input type="text">
                    </div>
                  </fieldset>
                </div>
                <div class="sj-form-field">
                  <fieldset>
                    <legend>사용여부</legend>
                    <div>
                      <input type="text">
                      <span class="inp-alert">대분류명 항목은 필수 정보입니다.</span>
                    </div>
                  </fieldset>
                </div>
                <div class="sj-form-field">
                  <fieldset>
                    <legend>대분류명</legend>
                    <div>
                      <input type="text" disabled class="inp-field">
                      <input type="text" disabled class="inp-field">
                      <input type="text" disabled class="inp-field">
                    </div>
                  </fieldset>
                </div>
                <div class="sj-form-field">
                  <fieldset>
                    <legend>비고</legend>
                    <div>
                      <textarea name="combox" rows="3" />
                    </div>
                  </fieldset>
                </div>
              </form>
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
      </section>
    </main>

    <footer class=" fixed-bottom d-flex justify-content-end align-items-center">
      <div class="ft-txt">
        <i class="fa-regular fa-circle-user" />
        <p>개발자님 안녕하세요.</p>
      </div>
      <div class="ft-btn">
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
    removeLast () {
      console.log('removeLast')
      this.cacheArray.pop()
    },
    addTab (menu) {
      if (this.tabs.findIndex(e => e.progPath === menu.progPath) < 0) {
        // 최초이면
        this.cacheArray.push(this.$route.name) // cache추가
        this.tabs.push(menu)
      }
      console.log(this.$refs.view.$children)
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
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

body {
  background: #E8ECF4;
}

</style>
