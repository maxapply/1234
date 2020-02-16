<template>
   <div class='container-image'>
     <div class="img_btn" @click="openDialog()">
       <img src="../assets/default.png" alt="">
     </div>
     <el-dialog
      :visible.sync="dialogVisible"
      width="750px">
      <span>一个组件</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
   </div>
</template>

<script>
export default {
  name: 'app-image',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='less'>
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
