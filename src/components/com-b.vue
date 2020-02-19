<template>
   <div class='container-com-b'>
     B组件: <el-button @click="fn">点击传值</el-button>
   </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      str: 'b组件的值'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('a2b', this.str)
    }
  }

}
</script>

<style lang='less'>
</style>
