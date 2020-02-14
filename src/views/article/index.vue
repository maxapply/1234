<template>
   <div class='container-article'>
     <el-card class="box-card">
       <div slot="header">
          <my-bread>内容管理</my-bread>
      </div>
          <el-form label-width="80px" style="margin-top:20px" size="small">
            <el-form-item label="状态:">
                <el-radio-group v-model="filterData.status">
                  <el-radio :label="null">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
                  <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道:">
         <!-- my-channel频道组件 -->
         <my-channel v-model="filterData.channel_id"></my-channel>
          <!-- <my-channel :value="filterData.channer_id" @input="filterData.channer_id=$event"></my-channel> -->
            </el-form-item>
            <el-form-item label="日期:">
              <el-date-picker
                 v-model="dateArr"
                 type="daterange"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 value-format="yyyy-MM-dd"
                 @change="changeDate"
                 >
                </el-date-picker>
            </el-form-item>
            <el-form-item >
              <el-button @click="search()" type="primary">筛选</el-button>
            </el-form-item>
          </el-form>
     </el-card>

     <el-card style="margin-top:20px">
       <div slot="header">根据筛选条件查询到 {{total}} 条结果</div>

      <el-table :data="articles">
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-image :src="scope.row.cover.images[0]" style="width:150px; height:100px">
            <div slot="error">
              <img src="../../assets/error.gif" style="width:150px; height:100px" />
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
          <el-tag v-if="scope.row.status===1">待审核</el-tag>
          <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
          <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="pubdate" label="发布时间"></el-table-column>

      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button plain @click="toEditArticle(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="delArticle(scope.row.id)" plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
    style="margin-top:20px"
    :current-page="filterData.page"
    @current-change="pager"
    background
    layout="prev, pager, next"
    :page-size="filterData.per_page"
    :total="total"> </el-pagination>
     </el-card>
   </div>
</template>

<script>
export default {
  name: 'app-article',
  data () {
    return {
      total: 0,
      filterData: {
        status: null,
        channer_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [],
      dateArr: [],
      articles: []
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticle()
  },
  methods: {
    delArticle (id) {
      this.$confirm('您是否删除该片文章?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除成功!')
          this.getArticle()
        } catch (e) {
          this.$message.error('删除失败')
        }
      }).catch(() => {})
    },
    // delArticle (id) {
    //   // 确认框
    //   this.$confirm('亲，您是否要删除该篇文章?', '温馨提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(async () => {
    //     // 删除请求
    //     try {
    //       // 13911111111 账号是测试账号，无法删除数据。
    //       await this.$http.delete(`articles/${id}`)
    //       this.$message.success('删除成功')
    //       this.getArticles()
    //     } catch (e) {
    //       this.$message.error('删除失败')
    //     }
    //   }).catch(() => {})
    // },
    toEditArticle (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    pager (newPage) {
      this.filterData.page = newPage
      this.getArticle()
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.filterData.begin_pubdate = dateArr[0]
        this.filterData.end_pubdate = dateArr[1]
      } else {
        this.filterData.begin_pubdate = null
        this.filterData.end_pubdate = null
      }
    },
    // changeChannel () {
    //   if (this.filterData.channer_id === '') {
    //   // console.log(this.filterData.channer_id)
    //     this.filterData.channer_id = null
    //   }
    // },
    search () {
      this.filterData.page = 1
      this.getArticle()
    },
    // async getChannelOptions () {
    //   const res = await this.$http.get('channels')
    //   this.channelOptions = res.data.data.channels
    // },
    async getArticle () {
      const res = await this.$http.get('articles', { params: this.filterData })
      this.articles = res.data.data.results
      this.total = res.data.data.total_count
    }
  }
}
</script>

<style lang='less'>
</style>
