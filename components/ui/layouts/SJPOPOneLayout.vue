<template>
  <div style="background:#fff;">
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
    <div class="contents row">
      <slot name="title" />
      <slot name="body" />
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
  padding: 5px;
  background: #e8ecf4;
}
.search{
  font-size: 15px;
}
button i{margin-right: 5px;}
:deep(.search) {
    margin: 5px;
    padding: 5px;
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
  padding: 0;
  div{padding: 0}
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
