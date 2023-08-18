<template>
  <div>
    <div v-if="!disabledStatusWrap" class="status-wrap">
      <slot name="status-bar" />
    </div>
    <div v-if="!disabledNavigatorWrap" class="header-wrap">
      <slot name="title" />
      <div class="left-wrap">
        <slot name="left-button" />
      </div>
      <div class="right-wrap">
        <slot name="right-button" />
      </div>
    </div>
    <SJSearch v-if="!disabledSearch">
      <slot />
    </SJSearch>
    <div ref="autoHeight" class="contents row" style="display: flex;" autoHeight>
      <div class="col-md-12 p-0" style="display: flex;">
        <div style="width: 100%;">
          <slot name="title" />
          <slot name="body" />
        </div>
        <div v-if="!disabledGridWrap" class="grid-wrap" style="display:flex;flex-direction: column;height: 100%; align-items: center;margin: 0 10px;">
          <slot name="grid-btn">
            <button class="btn-pop-none">
              <i class="fa-solid fa-caret-up" />
            </button>
            <button class="btn-pop-none">
              <i class="fa-solid fa-caret-down" />
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    disabledSearch: {
      type: Boolean,
      required: false,
      default: false
    },
    disabledNavigatorWrap: {
      type: Boolean,
      required: false,
      default: false
    },
    disabledStatusWrap: {
      type: Boolean,
      required: false,
      default: false
    },
    disabledGridWrap: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  activated () {
    window.addEventListener('resize', this.refresh)
  },
  deactivated () {
    window.removeEventListener('resize', this.refresh)
  },
  mounted () {
    this.refresh()
    window.dispatchEvent(new Event('resize'))
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.refresh)
  },
  methods: {
    refresh () {
      const height = window.innerHeight
      if (this.$refs.autoHeight.closest('.modal-dialog')) {
        // height = window.innerHeight / 2
        return
      }
      const absoluteTop = this.$refs.autoHeight.getBoundingClientRect().top
      // const absoluteBottom = this.$refs.autoHeight.getBoundingClientRect().bottom

      this.$refs.autoHeight.style.height = (height - absoluteTop - 5) + 'px'
    }
  }
}
</script>

<style>
.status-wrap{
  height: 35px;
  margin: 10px 0;
  background: #000;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex; justify-content: center;align-items: center;
}
.left-wrap{
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: repeat(2,1fr);
}
.right-wrap{
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(5,1fr);
  grid-template-rows: repeat(2,1fr);
}
</style>

<style lang="scss" scoped>
.contents{
  width: 100%;
  display: flex;
  margin: 0;
  padding-left:20px;
  background: #fff;
}
.header-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #fff;
}
.search{
  font-size: 18px;
}
button i{margin-right: 5px;}
:deep(.search) {
    border: 0;
    margin-bottom: 10px;
    .search-field{
      flex-basis: 25%;
    }
    label{
      min-width:100px;
    }
    input,select{
      height: 35px;
    }
  }
:deep(.contents){
  .tui-grid-header-area{
    font-size: 15px;
  }
  .txt-wrap{
    h3{font-size: 20px;}
  }
}
:deep(*){
  .btn-white-bg{
    border: solid 1px #bcc1d0;
    border-radius: 3px;
    width: 100px;
    height: 50px;
    margin-right: 2px;
    font-size: 15px;
  }
  .btn-blue-bg{
    border: solid 1px #bcc1d0;
    border-radius: 3px;
    width: 130px;
    height: 50px;
    margin-right: 2px;
    font-size: 15px;
  }
}

</style>
