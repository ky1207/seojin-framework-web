<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'

export default {
  name: 'Menu',
  mixins: [MENU, ACTION],
  data () {
    return {

    }
  },
  methods: {
    ACTION_REGISTRY () {
      return {

      }
    }
  }
}
</script>

<style scoped>

</style>
