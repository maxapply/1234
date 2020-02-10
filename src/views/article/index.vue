<template>
   <div class='container'>Article</div>
</template>

<script>
export default {
  name: 'app-article',
  created () {
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang='less'>
</style>
