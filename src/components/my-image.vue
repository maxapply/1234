<template>
   <div class='container-image'>
     <div class="img_btn" @click="openDialog()">
       <img :src="value||imageBtnUrl" alt="">
     </div>
     <el-dialog
      :visible.sync="dialogVisible"
      width="750px">
      <!-- <span>一个组件</span> -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="list">

        <div v-loading="loading">
         <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small  ">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
          <div class="img_list" >
           <div @click="selectedImage(item.url)" :class="{selected:selectedImageurl===item.url}" class="img_item" v-for="item in images" :key="item.id">
              <img :src="item.url" alt="">
           </div>
          </div>

          <el-pagination
            @current-change="pager"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            background
            hide-on-single-page
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
       </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
             <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              name="image"
              :headers="uploadHeaders"
              :show-file-list="false"
              :on-success="handleSuccess"
              >
              <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
   </div>
</template>

<script>
import auth from '@/utils/auth'
import defaultImage from '@/assets/default.png'
export default {
  props: ['value'],
  name: 'app-image',
  data () {
    return {
      loading: false,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      selectedImageurl: null,
      images: [],
      total: 0,
      dialogVisible: false,
      activeName: 'list',
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      uploadImageUrl: null,
      imageBtnUrl: defaultImage
    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'list') {
        if (!this.selectedImageurl) return this.$message.success('请选择一张素材图片')
        // this.imageBtnUrl = this.selectedImageurl
        this.$emit('input', this.selectedImageurl)
      } else {
        if (!this.uploadImageUrl) return this.$message.warning('请上传一张素材图片')
        // this.imageBtnUrl = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    handleSuccess (res) {
      this.$message.success('上传成功')
      this.uploadImageUrl = res.data.url
    },
    selectedImage (url) {
      this.selectedImageurl = url
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getimages()
    },
    pager (newpager) {
      this.reqParams.page = newpager
      this.getimages()
    },
    openDialog () {
      this.dialogVisible = true
      this.getimages()
    },
    async getimages () {
      this.loading = true
      const res = await this.$http.get('user/images', { params: this.reqParams })
      this.loading = false
      this.images = res.data.data.results
      this.total = res.data.data.total_count
      this.activeName = 'list'
      this.selectedImageurl = null
      this.uploadImageUrl = null
    }
  }
}
</script>

<style lang='less'>
.img_list {
  padding-top: 20px;
  .img_item{
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    &.selected::after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.3)url(../assets/selected.png)no-repeat center / 50px auto;
    }
  }
}

.container-image {
  display: inline-block;
  margin-right: 20px
}
.img_btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
