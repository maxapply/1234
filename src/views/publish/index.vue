<template>
   <div class='container-publish'>
     <el-card class="box-card">
      <div slot="header" >
           <my-bread >  {{$route.query.id ? '修改' : '发布'}}文章</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题 :">
          <el-input v-model="articleFrom.title" style="width:400px"></el-input>
        </el-form-item>
         <el-form-item label="内容 :">
          <quill-Editor v-model="articleFrom.content" :options="editorOption"></quill-Editor>
         </el-form-item>
         <el-form-item label="封面 :">

            <el-radio-group v-model="articleFrom.cover.type" @change="articleFrom.cover.images=[]">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="- 1">自动</el-radio>
            </el-radio-group>
            <div v-if="articleFrom.cover.type===1">
              <my-image v-model="articleFrom.cover.images[0]"></my-image>
            </div>
            <div v-if="articleFrom.cover.type===3">
              <my-image v-for="i in 3" :key="i" v-model="articleFrom.cover.images[i-1]"></my-image>
            </div>
         </el-form-item>
         <el-form-item label="频道 :">
           <my-channel v-model="articleFrom.channel_id"></my-channel>
         </el-form-item>
         <el-form-item v-if="$route.query.id">
           <el-button @click="updata()" type="success">修改文章</el-button>
         </el-form-item>
         <el-form-item v-else>
           <el-button  @click="submit(false)" type="primary">发布文章</el-button>
           <el-button @click="submit(true)" >存入草稿</el-button>
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
  created () {
    this.getarticle()
  },
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
  },
  watch: {
    '$route.query.id': function () {
      this.toggleFormInfo()
    }
  },
  methods: {
    toggleFormInfo () {
      if (this.$route.query.id) {
        this.getarticle()
      } else {
        this.articleFrom = {
          title: null,
          channel_id: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    },
    async updata () {
      try {
        await this.$http.put(`/articles/${this.articleFrom.id}?draft=false`, this.articleFrom)
        this.$message.success('修改文章成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    async submit (draft) {
      try {
        await this.$http.post(`articles?draft=${draft}`, this.articleFrom)
        this.$message.success(draft ? '存入草稿成功' : '发布文章成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    async getarticle () {
      const res = await this.$http.get(`/articles/${this.$route.query.id}`)
      this.articleFrom = res.data.data
    }

  }
}
</script>

<style lang='less'>
</style>
