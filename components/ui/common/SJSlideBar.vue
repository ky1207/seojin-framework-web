<template>
  <div id="menu-area" class="menu-area collapse-in collapse show">
    <ul id="menuAccordion" class="main-menu accordion">
      <li v-for="m in value" :key="m.menuId" class="main-menu-item">
        <div class="main-menu-link">
          <a
            class="main-menu-link btn collapsed accordion-button-one"
            href="#"
            data-bs-toggle="collapse"
            :data-bs-target="'#m'+m.menuId+'-collapse'"
          >
            {{ m.menuName }}
          </a>
        </div>
        <ul
          v-if="m._children"
          :id="'m'+m.menuId+'-collapse'"
          class="sub-menu accordion-collapse collapse"
          data-bs-parent="#menuAccordion"
        >
          <li v-for="sub in m._children" :key="sub.menuId" class="accordion-item accordion-header" data-bs-parent="#menuAccordion">
            <a
              class="btn sub-menu-item accordion-button collapsed"
              href="#"
              :data-bs-target="'#m'+sub.menuId+'-collapse'"
              data-bs-toggle="collapse"
            >
              {{ sub.menuName }}
            </a>
            <ul
              v-if="sub._children"
              :id="'m'+sub.menuId+'-collapse'"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <li v-for="sub2 in sub._children" :key="sub2.menuId" class="sub-menu-list accordion-body">
                <nuxt-link :to="sub2.progPath?sub2.progPath:'/'" :class="isActive(sub2.progPath)">
                  {{ sub2.menuName }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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

/*.btn-toggle {*/
/*  padding: .25rem .5rem;*/
/*  font-weight: 600;*/
/*  color: rgba(0, 0, 0, .65);*/
/*  background-color: transparent;*/
/*}*/
/*.btn-toggle:hover,*/
/*.btn-toggle:focus {*/
/*  color: rgba(0, 0, 0, .85);*/
/*  background-color: #d2f4ea;*/
/*}*/

/*.btn-toggle::before {*/
/*  width: 1.25em;*/
/*  line-height: 0;*/
/*  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");*/
/*  transition: transform .35s ease;*/
/*  transform-origin: .5em 50%;*/
/*}*/

/*.btn-toggle[aria-expanded="true"] {*/
/*  color: rgba(0, 0, 0, .85);*/
/*}*/
/*.btn-toggle[aria-expanded="true"]::before {*/
/*  transform: rotate(90deg);*/
/*}*/

/*.btn-toggle-nav a {*/
/*  padding: .1875rem .5rem;*/
/*  margin-top: .125rem;*/
/*  margin-left: 1.25rem;*/
/*}*/
/*.btn-toggle-nav a:hover,*/
/*.btn-toggle-nav a:focus {*/
/*  background-color: #d2f4ea;*/
/*}*/

/*.bi {*/
/*  vertical-align: -.125em;*/
/*  fill: currentColor;*/
/*}*/

/*.nav-scroller .nav {*/
/*  display: flex;*/
/*  flex-wrap: nowrap;*/
/*  padding-bottom: 1rem;*/
/*  margin-top: -1px;*/
/*  overflow-x: auto;*/
/*  text-align: center;*/
/*  white-space: nowrap;*/
/*  -webkit-overflow-scrolling: touch;*/
/*}*/
</style>
