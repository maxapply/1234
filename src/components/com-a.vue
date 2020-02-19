<template>
   <div class='container-com-a'>
     A组件:接收B组件传来的值: {{msg}}
   </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created () {
    eventBus.$on('a2b', (data) => {
      this.msg = data
    })
  }
}
</script>

<style lang='less'>
</style>
