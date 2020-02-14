<template>
   <div class='container-publish'>
     <el-card class="box-card">
      <div slot="header" class="clearfix">
           <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题 :">
          <el-input v-model="articleFrom.title" style="width:400px"></el-input>
        </el-form-item>
         <el-form-item label="内容 :">富文本</el-form-item>
         <el-form-item label="封面 :">封面组件</el-form-item>
         <el-form-item label="频道 :">
           <my-channel v-model="articleFrom.channel_id"></my-channel>
         </el-form-item>
         <el-form-item >
           <el-button type="primary">发布文章</el-button>
           <el-button>存入草稿</el-button>
         </el-form-item>
      </el-form>
    </el-card>
   </div>
</template>

<script>
export default {
  name: 'app-publish',
  data () {
    return {
      articleFrom: {
        title: null,
        channel_id: null
      }
    }
  }
}
</script>

<style lang='less'>
</style>
