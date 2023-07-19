<template>
  <div ref="close" class="complete-wrap">
    <div v-for="option in selectedOptions" :key="option.value" class="complete-tag" @click="deselectOption(option)">
      {{ option.label }}
      <span><i class="fa-solid fa-xmark" /></span>
    </div>
    <input
      ref="text"
      v-model="searchText"
      class="complete-text"
      placeholder="검색하세요"
      @keydown.enter="handleEnter"
      @keydown.188="addTag"
      @input="handleSearch"
      @click="toggleOptions"
      @mousedown="onInputMouseDown"
    >
    <div v-if="showOptions" class="complete-options">
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedOptions: [],
      searchText: '',
      showOptions: false,
      focusOnInput: false
    }
  },

  mounted () {
    // 외부 클릭 시 complete-options 닫히는 이벤트 리스너 추가
    window.addEventListener('click', this.handleExternalClick)
  },
  methods: {
    deselectOption (option) {
      this.selectedOptions = this.selectedOptions.filter(selectedOption => selectedOption.value !== option.value)
    },
    handleSearch () {
      this.showOptions = true
    },
    selectOption (option) {
      this.selectedOptions.push(option)
      this.searchText = ''
      this.showOptions = false
    },
    handleEnter () {
      if (this.filteredOptions.length === 1) {
        this.selectOption(this.filteredOptions[0])
      }
    },
    toggleOptions (event) {
      if (!this.showOptions) {
        this.showOptions = true
      }
    },
    onInputMouseDown (event) {
      event.stopPropagation()
    },
    handleExternalClick (event) {
      if (!this.$el.contains(event.target)) {
        this.showOptions = false
      }
    },
    addTag (event) {
      event.preventDefault()
      const val = event.target.value.trim()
      if (this.filteredOptions.length === 1) {
        this.selectOption(this.filteredOptions[0])
      }
      if (val.length > 0) {
        if (this.length >= 1) {
          for (let i = 0; i < this.length; i++) {
            if (this.tags[i] === val) {
              return false
            }
          }
        }
        this.push(val)
        event.target.value = ''
        console.log(this)
      }
    }
  }
}
</script>

<style scoped>
.complete-wrap{
  position: relative;
  border: 1px solid #D9DFE7;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.complete-tag {
  display: flex;
  width: auto;
  height: 20px;
  background-color: #e5e5e5;
  padding: 0 10px;
  margin-right: 5px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-wrap: nowrap;
}
.complete-tag > span{
  cursor: pointer;
  opacity: 0.75;
  display: inline-block;
  margin-left: 8px;
}
.complete-text{
  width: auto;
  border: none;
}
.selected-option i{ padding-left: 5px;}
.complete-options {
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
.option {
  padding: 4px 8px;
  cursor: pointer;
}
.option:hover {
  background-color: #f0f0f0;
}

</style>
