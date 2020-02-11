<template>
   <div class='container-article'>
     <el-card >
       <div slot="header">
          <my-bread>内容管理</my-bread>
      </div>
          <el-form label-width="80px" size="small">
            <el-form-item label="状态:">
                <el-radio-group v-model="filterData.status">
                  <el-radio :label="null">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">待通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
                  <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道:">
              <el-select v-model="filterData.channer_id" placeholder="请选择">
                <el-option
                v-for="item in channelOptions"
                :key= "item.id"
                :label="item.name"
                :value="item.id"
                ></el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="日期:">
              <el-date-picker
                  v-model="dateArr"
                 type="daterange"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item >
              <el-button type="primary">筛选</el-button>
            </el-form-item>
          </el-form>
     </el-card>

     <el-card style="margin-top:20px">
       <div slot="header">根据筛选条件查询到 0 条结果</div>
      <el-table :data="articles" style="width: 100%">
      <el-table-column prop="date" label="封面"></el-table-column>

      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column prop="address" label="状态"></el-table-column>

      <el-table-column prop="pubdate" label="发布时间"></el-table-column>

      <el-table-column prop="address" label="操作">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>

    </el-table>

    <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>

     </el-card>
   </div>
</template>

<script>
export default {
  name: 'app-article',
  data () {
    return {
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
    this.getChannelOptions()
    this.getArticle()
  },
  methods: {
    async getChannelOptions () {
      const res = await this.$http.get('channels')
      this.channelOptions = res.data.data.channels
    },
    async getArticle () {
      const res = await this.$http.get('articles', { Prams: this.filterData })
      this.articles = res.data.data.results
      console.log(res)
    }
  }
}
</script>

<style lang='less'>
</style>
