<template>
  <div class="flex-shrink-0">
    <ul v-for="m in value" :key="m.id" class="list-unstyled ps-1">
      <!-- start of set-->
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" :data-bs-target="'#'+m.name+'-collapse'" aria-expanded="false">
          {{ m.name }}
        </button>
        <div :id="m.name+'-collapse'" class="collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li v-for="sub in m.children" :key="sub.id">
              <nuxt-link :to="{path:sub.url?sub.url:'/',query:{title:sub.name}}" class="link-dark d-inline-flex text-decoration-none rounded">
                {{ sub.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </li>
      <!-- end of set -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SJSlideBar',
  props: {
    value: {
      type: Array,
      required: true
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
