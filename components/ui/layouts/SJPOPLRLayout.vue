<template>
  <div>
    <div v-if="!disabledStatusWrap" class="status-wrap">
      <slot name="status-bar" />
    </div>
    <div v-if="!disabledNavigatorWrap" class="header-wrap">
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
    <div class="contents row d-flex" style="flex-wrap: nowrap">
      <div ref="autoHeight" class="left-contents col-md-5" autoHeight>
        <slot name="leftTitle" />
        <slot name="left" />
      </div>
      <div v-if="!disabledGridWrap" ref="autoHeight" class="grid-wrap col-md-2" autoHeight>
        <slot name="grid-btn">
          <button class="btn-pop-none">
            <i class="fa-solid fa-angles-right" />
          </button>
          <button class="btn-pop-none">
            <i class="fa-solid fa-angles-left" />
          </button>
        </slot>
      </div>
      <div ref="rightAutoHeight" class="right-contents col-md-5" autoHeight>
        <slot name="rightTitle" />
        <slot name="right" />
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
  }
}
</script>

<style lang="scss" scoped>
.header-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: #e8ecf4;
}
.search{
  font-size: 15px;
}
.contents{
  width: 100%;
  display: flex;
  margin: 0;
  padding-left:20px;
  background: #fff;
}
.grid-wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button i{margin-right: 5px;}
:deep(.search) {
  margin: 5px;
  padding: 5px;
  .search-field {
    flex-basis: 25%;
  }

  label {
    min-width: 100px;
  }

  input, select {
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
