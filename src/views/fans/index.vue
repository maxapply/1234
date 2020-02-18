<template>
   <div class='container-fans'>
     <el-card class="box-card">
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- <template> -->
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="粉丝列表" name="list">
            <div class="fans-list">
              <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
                <el-avatar :size="80" :src="item.photo"></el-avatar>
                <p>{{item.name}}</p>
                <el-button type="primary" plain size="small">+关注</el-button>
              </div>
            </div>
            <el-pagination
             :page-size="reqParms.per_page"
             :current-page="reqParms.page"
             @current-change="pager"
              background
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="粉丝画像" name="pictrue">2</el-tab-pane>
        </el-tabs>
      <!-- </template> -->
     </el-card>
   </div>
</template>

<script>
export default {
  name: 'app-fans',
  data () {
    return {
      activeName: 'list',
      fansList: [],
      total: 0,
      reqParms: {
        page: 1,
        per_page: 24
      }
    }
  },
  created () {
    this.getfans()
  },
  methods: {
    pager (newpager) {
      this.reqParms.page = newpager
      this.getfans()
    },
    async getfans () {
      const res = await this.$http.get('followers', { params: this.reqParms })
      this.fansList = res.data.data.results
      this.total = res.data.data.total_count
    }
  }
}
</script>

<style lang='less'>
.fans-list {
  .fans-item {
    padding-top: 10px;
    display: inline-block;
    width: 100px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    margin-right: 50px;
    margin-bottom: 20px;
    p {
      font-size: 12px;
      padding: 0;
    }

  }

}
</style>
