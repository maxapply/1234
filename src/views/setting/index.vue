<template>
   <div class='container-setting'>
    <el-card >
      <div slot="header" >
           <my-bread >个人设置</my-bread>
      </div>

      <el-row>
        <el-col :span="12">

          <el-form  label-width="120px">
            <el-form-item label="编号 :">{{user.id}}</el-form-item>
            <el-form-item label="手机号 :">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称 :">
              <el-input v-model="user.name" ></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍 :">
              <el-input type="textarea" v-model="user.intro" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱 :">
              <el-input v-model="user.email" ></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="saveSetting()" size="small">保存设置</el-button>
            </el-form-item>
          </el-form>

        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false">
            <img v-if="user.photo" :src="user.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center; font-size:12px">修改头像</p>

        </el-col>
      </el-row>

   </el-card>
   </div>
</template>

<script>
import eventBus from '@/eventBus'
import auth from '@/utils/auth'
export default {
  name: 'app-setting',
  data () {
    return {
      user: {
        name: '',
        intro: '',
        email: '',
        photo: '',
        mobile: '',
        id: ''
      }
    }
  },
  created () {
    this.getuserinfo()
  },
  methods: {
    async saveSetting () {
      try {
        const { name, intro, email } = this.user
        await this.$http.patch('/user/profile', { name, intro, email })
        this.$message.success('修改用户信息成功')
        const user = auth.getUser()
        user.name = name
        auth.serUser(user)
        eventBus.$emit('updateUserName', name)
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    async getuserinfo () {
      const res = await this.$http.get('/user/profile')
      this.user = res.data.data
    }
  }
}
</script>

<style lang='less'>
</style>
