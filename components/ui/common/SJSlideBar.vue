<template>
  <aside id="sidebar" class="sidebar">
    <ul v-for="m in value" id="sidebar-nav" :key="m.menuId" class="sidebar-nav">
      <li class="nav-item">
        <a class="nav-link collapsed" :data-bs-target="'#'+m.menuId+'-collapse'" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide" /><span>  {{ m.menuName }}</span><i v-if="m._children" class="bi bi-chevron-down ms-auto" />
        </a>
      </li>
      <ul v-if="m._children" :id="m.menuId+'-collapse'" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li v-for="sub in m._children" :key="sub.menuId">
          <template v-if="sub._children">
            <ul id="sub-sidebar-nav" class="sidebar-nav">
              <li class="nav-item">
                <a class="nav-link collapsed" :data-bs-target="'#'+sub.menuId+'-collapse'" data-bs-toggle="collapse" href="#">
                  <i class="bi bi-menu-button-wide-fill" /><span>  {{ sub.menuName }}</span><i v-if="sub._children" class="bi bi-chevron-down ms-auto" />
                </a>
              </li>
              <ul v-if="sub._children" :id="sub.menuId+'-collapse'" class="nav-content collapse " data-bs-parent="#sub-sidebar-nav">
                <li v-for="sub2 in sub._children" :key="sub2.menuId">
                  <nuxt-link :to="sub2.progPath?sub2.progPath:'/'" :class="isActive(sub2.progPath)">
                    <i class="bi bi-circle" /> <span>{{ sub2.menuName }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </ul>
          </template>
          <template v-else>
            <nuxt-link :to="sub.progPath?sub.progPath:'/'" :class="isActive(sub.progPath)">
              <i class="bi bi-circle" /> <span>{{ sub.menuName }}</span>
            </nuxt-link>
          </template>
          <!--          <nuxt-link :to="sub.progPath?sub.progPath:'/'" :class="isActive(sub.progPath)">-->
          <!--            <i class="bi bi-circle" /> <span>{{ sub.menuName }}</span>-->
          <!--          </nuxt-link>-->
        </li>
      </ul>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'SJSlideBar',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  methods: {
    isActive (url) {
      return this.$route.path === url ? 'active' : ''
    }
  }
}
</script>

<style scoped>

.btn-toggle {
  padding: .25rem .5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, .65);
  background-color: transparent;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, .85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, .85);
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>
