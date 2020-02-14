<template>
   <div class='container-image'>
     <el-card>
       <div slot="header">
         <my-bread>素材管理</my-bread>
       </div>
       <div class="btn-box">
          <el-radio-group @change="changeCollect()" v-model="reqParams.colect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button @click="openDialog()" style="float:right" type="success" size="small">添加素材</el-button>
       </div>
       <div class="img-list">
         <div class="img-item" v-for="item in images" :key="item">
           <img :src="item.url" alt="">
           <div class="option" v-if="!reqParams.colect">
             <span @click="toggleStatus(item)" class="el-icon-star-off" :class="{red: item.is_collected}"></span>
             <span @click="delImage(item.id)" class="el-icon-delete"></span>
           </div>
         </div>
       </div>
       <el-pagination :page-size="reqParams.per_page" @current-change="pager" :current-page="reqParams.page" background layout="prev,pager,next" :total="total"></el-pagination>
     </el-card>
     <el-dialog title="添加素材" :visible.sync="diaogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="uploadHeaders"
        :show-file-list="false"
        :on-success="handleSuccess"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
     </el-dialog>
   </div>
</template>

<script>
import auth from '@/utils/auth.js'
export default {
  name: 'app-image',
  data () {
    return {
      diaogVisible: false,
      reqParams: {
        colect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      imageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
    }
  },
  created () {
    this.getimages()
  },
  methods: {
    handleSuccess (res) {
      this.$message.success('上传成功')
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.diaogVisible = false
        this.getimages()
      }, 3000)
    },
    openDialog () {
      this.diaogVisible = true
      this.imageUrl = null
    },
    delImage (id) {
      this.$confirm('您是否删除该图片素材?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await this.$http.delete(`/user/images/${id}`)
          this.$message.success('删除成功!')
          this.getimages()
        } catch (e) {
          this.$message.error('删除失败')
        }
      }).catch(() => {})
    },
    async toggleStatus (item) {
      try {
        const res = await this.$http.put(`/user/images/${item.id}`, {
          collect: !item.is_collected
        })
        this.$message.success(res.data.data.collect ? '添加收藏成功' : '取消收藏成功')
        item.is_collected = res.data.data.collect
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getimages()
    },
    pager (newpager) {
      this.reqParams.page = newpager
      this.getimages()
    },
    async getimages () {
      const res = await this.$http.get('user/images', { params: this.reqParams })
      this.images = res.data.data.results
      this.total = res.data.data.total_count
    }
  }
}
</script>

<style lang='less'>
.img-list {
  margin-bottom: 15px;
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px solid #dddddd;
    position: relative;
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .option{
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0,0,0,3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        color: #ffffff;
        margin: 0 30px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
