<template>
  <div :id="accordionId" class="SJAccordion">
    <div v-for="(section, index) in sections" :key="index" class="SJAccordion-item">
      <h2 :id="'heading' + (index + 1)" class="SJAccordion-header">
        <button
          class="SJAccordion-button"
          type="button"
          @click="toggleSection(index)"
        >
          {{ section.title }}
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        :class="{ 'show': section.expanded }"
      >
        <div class="SJAccordion-body">
          <slot name="section" :section="section" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accordionId: {
      type: String,
      required: true
    },
    sections: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleSection (index) {
      this.sections.forEach((section, i) => {
        if (i === index) {
          section.expanded = !section.expanded
        } else {
          section.expanded = false
        }
      })
    }
  }
}
</script>

<style scoped>
.SJAccordion{padding: 0 10px;}
.SJAccordion-header{
  margin: 0;}
.SJAccordion-button{
  width: 100%;
  color: #333; border: none;
  font-size: 12px;
  padding: 10px;
  border-radius: 0;
  background: #F7F7F7;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
}
.SJAccordion-button:focus{
  background: #e5f2f8;
  border-radius: 0;
}
.SJAccordion-item:first-of-type .SJAccordion-button{
  border-radius: 0;
}
.SJAccordion-body{
  padding: 10px 5px;
}
</style>
