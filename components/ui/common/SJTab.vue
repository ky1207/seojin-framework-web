<template>
  <div class="">
    <ul class="nav SJTab-tabs">
      <li v-for="item in list" :key="item.id" class="SJTab-item active">
        <span
          :class="['SJTab-link', { active: currentTab === item.id }]"
          style="cursor: pointer;"
          @click="onTabClick(item.id)"
        >
          {{ item.title }}
        </span>
      </li>
    </ul>
    <transition-group name="tab-transition">
      <div
        v-for="item in list"
        :key="item.id"
        class="SJTab-pane"
        :class="{ active: currentTab === item.id }"
      >
        <template v-if="currentTab === item.id">
          <slot :name="`tab-${item.id}`" />
        </template>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
    // value: {
    //   type: Number,
    //   required: true
    // }
  },
  data () {
    return {
      currentTab: 1
    }
  },
  // watch: {
  //   // value (newVal) {
  //   //   this.currentTab = newVal
  //   // },
  //   currentTab (newTab) {
  //     this.$emit('input', newTab)
  //   }
  // },
  methods: {
    onTabClick (tabId) {
      this.currentTab = tabId
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 10)
    }
  }
}
</script>

<style scoped>
.SJTab-tabs {
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: bold;
}
.SJTab-item {
  background: #F7F7F7;
}
.SJTab-item .SJTab-link {
  border: 1px solid #dee2e6;
  border-bottom: none;
  padding: 5px 50px;
  border-radius: 0;
  margin-right: 1px;
  color: #333;
}
.SJTab-item .SJTab-link.active {
  background: #007db6;
  color: #fff;
}
</style>
