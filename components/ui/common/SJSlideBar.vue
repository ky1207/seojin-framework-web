<template>
  <aside id="sidebar" class="sidebar">
    <ul v-for="m in value" id="sidebar-nav" :key="m.id" class="sidebar-nav">
      <li class="nav-item">
        <a class="nav-link collapsed" :data-bs-target="'#'+m.name+'-collapse'" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide" /><span>  {{ m.name }}</span><i v-if="m.children" class="bi bi-chevron-down ms-auto" />
        </a>
        <ul v-if="m.children" :id="m.name+'-collapse'" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li v-for="sub in m.children" :key="sub.id">
            <nuxt-link :to="sub.url?sub.url:'/'" :class="isActive(sub.url)">
              <i class="bi bi-circle" /> <span>{{ sub.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </li><!-- End Components Nav -->
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
