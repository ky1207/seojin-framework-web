<template>
  <ValidationProvider
    v-slot="{ errors,classes }"
    ref="provider"
    :rules="rules"
    :name="name"
    tag="div"
    :disabled="disabledValidation"
  >
    <div class="SJSearchSelect-wrap">
      <div v-for="option in selectedOptions" :key="option[itemValue]" class="SJSearchSelect-tag" @click="deselectOption(option)">
        <div class="d-flex align-items-center" style="width:100%;">
          <p>{{ option[itemText] }}</p>
        </div>
        <span class="d-flex"><i class="fa-solid fa-xmark" /></span>
      </div>
      <input
        ref="searchText"
        type="text"
        :class="disabledValidation?'':classes"
        :aria-describedby="id+'-feedback'"
        class="SJAutoComplete-text"
        :placeholder="placeholder"
        @input="handleSearch"
        @mousedown="onInputMouseDown"
      >
      <i v-if="enablePopup" class="search-bar-icon fa-solid fa-magnifying-glass" @click="searchClick" />
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
    <span :id="id+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabledValidation: {
      type: Boolean,
      default: false
    },
    enablePopup: {
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
    },
    searchClick: {
      type: Function
    }
  },
  data () {
    return {
      options: [],
      selectedOptions: this.value === null ? [] : (Array.isArray(this.value) ? [...this.value] : [this.value]),
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
      this.validate()
    },
    async handleSearch (e) {
      const p = { [this.$props.param]: e.value }
      const result = await this.$axios.get(this.searchUrl, { params: p })
      this.options = result.data
      this.showOptions = true
    },
    selectOption (option) {
      if (!this.multiple) {
        if (this.selectedOptions.length >= 1) {
          this.selectedOptions = []
        }
      }
      const i = this.selectedOptions.findIndex(p => p[this.itemValue] === option[this.itemValue])
      if (i < 0) {
        this.selectedOptions.push(option)
      } else {
        this.$notify.warning('중복입니다.') // TODO:다국어 처리
      }
      this.$refs.searchText.value = ''
      this.showOptions = false
      this.validate()
    },

    onInputMouseDown (event) {
      event.stopPropagation()
      this.validate()
    },
    handleExternalClick (event) {
      if (!this.$el.contains(event.target)) {
        this.showOptions = false
      }
    },
    validate () {
      this.$refs.provider.value = this.selectedOptions
      if (this.multiple) {
        this.$emit('input', this.selectedOptions)
      } else {
        this.$emit('input', this.selectedOptions.length > 0 ? this.selectedOptions[0] : {})
      }
      this.$refs.provider.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
.SJSearchSelect-wrap{
  position: relative;
  background: #fff;
  border: 1px solid #bcc1d0;
  display: flex;
  align-items: center;
  flex-direction: row!important;
  i{
    cursor: pointer;
    padding: 0 5px;
  }
}
.SJSearchSelect-tag {
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  height: 20px;
  background-color: #e5e5e5;
  cursor: pointer;
  border-radius: 10px;
  span{
    cursor: pointer;
    opacity: 0.75;
    display: inline-block;
    width: auto;
  }
  p{
    width: 100%;
    min-width: 60px;
    height: 100%;
    margin: 0;
    padding-left:5px;
  }
}
.SJAutoComplete-text{
  width: 100%;
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
