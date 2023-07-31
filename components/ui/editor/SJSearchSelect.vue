<template>
  <div class="SJSearchSelect-wrap">
    <div v-for="option in selectedOptions" :key="option[itemValue]" class="SJSearchSelect-tag" @click="deselectOption(option)">
      <div style="min-width: 100%;">
        {{ option[itemText] }}
      </div>
      <span><i class="fa-solid fa-xmark" /></span>
    </div>
    <input
      ref="text"
      v-model="searchText"
      class="SJAutoComplete-text"
      placeholder="검색하세요"
      @input="handleSearch"
      @mousedown="onInputMouseDown"
    >
    <i class="search-bar-icon fa-solid fa-magnifying-glass" />
    <div v-if="showOptions" class="SJSearchSelect-options">
      <div
        v-for="option in options"
        :key="option[itemValue]"
        class="SJSearchSelect-option"
        @click="selectOption(option)"
      >
        {{ option[itemText] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    searchUrl: {
      type: String,
      required: true
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    param: {
      type: String,
      default: 'p'
    }
  },
  data () {
    return {
      options: [],
      selectedOptions: [],
      searchText: '',
      showOptions: false
    }
  },

  mounted () {
    // 외부 클릭 시 complete-options 닫히는 이벤트 리스너 추가
    window.addEventListener('click', this.handleExternalClick)
  },
  methods: {
    deselectOption (option) {
      this.selectedOptions = this.selectedOptions.filter(selectedOption => selectedOption[this.itemValue] !== option[this.itemValue])
    },
    async handleSearch () {
      const p = { [this.$props.param]: this.searchText }
      const result = await this.$axios.get(this.searchUrl, { params: p })
      this.options = result.data
      this.showOptions = true
    },
    selectOption (option) {
      // TODO:중복검사
      this.selectedOptions.push(option)
      this.searchText = ''
      this.showOptions = false
    },

    onInputMouseDown (event) {
      event.stopPropagation()
    },
    handleExternalClick (event) {
      if (!this.$el.contains(event.target)) {
        this.showOptions = false
      }
    }
  }
}
</script>

<style scoped>
.SJSearchSelect-wrap{
  position: relative;
  border: 1px solid #bcc1d0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.SJSearchSelect-wrap i{
  cursor: pointer;
  padding: 0 5px;
}
.SJSearchSelect-tag {
  display: flex;
  width: auto;
  height: 20px;
  background-color: #e5e5e5;
  padding: 0 15px;
  margin-right: 5px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-wrap: nowrap;
}
.SJSearchSelect-tag > span{
  cursor: pointer;
  opacity: 0.75;
  display: inline-block;
}
.SJAutoComplete-text{
  width: auto;
  border: none;
}
.SJSearchSelect-options {
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 100px;
  overflow-y: auto;
}
.SJSearchSelect-option {
  padding: 4px 8px;
  cursor: pointer;
}
.SJSearchSelect-option:hover {
  background-color: #f0f0f0;
}
</style>
