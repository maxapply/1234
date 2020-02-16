<template>
   <div class='aaa'>
     数值: {{value}} <el-button @click="jia">自增1</el-button>
   </div>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-inserter',
  // data () {
  //   return {
  //     count: 0
  //   }
  // },
  methods: {
    jia () {
      // this.count++
      this.$emit('input', this.value + 1)
    }
  }
}
</script>

<style lang='less'>
</style>
