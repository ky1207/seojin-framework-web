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
