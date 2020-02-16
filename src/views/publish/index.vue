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
         <el-form-item label="内容 :">
          <quill-Editor v-model="articleFrom.content" :options="editorOption"></quill-Editor>
         </el-form-item>
         <el-form-item label="封面 :">

            <el-radio-group v-model="articleFrom.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="- 1">自动</el-radio>
            </el-radio-group>
            <div>
              <my-image></my-image>
              <my-image></my-image>
              <my-image></my-image>
            </div>
         </el-form-item>
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import MyImage from '@/components/my-image'
export default {
  components: { quillEditor, MyImage },
  name: 'app-publish',
  data () {
    return {
      articleFrom: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}
</script>

<style lang='less'>
</style>
