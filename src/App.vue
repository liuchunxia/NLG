<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu ;
  /*font-family: "Lucida Grande", Lucida Sans Unicode, Hiragino Sans GB, WenQuanYi Micro Hei, Verdana, Aril, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body{
    margin: 0;
  }
  .el-form-item__error{
    top: 50%;
  }
  #idCard .el-form-item__label{
    width: 170px!important;
  }
  #idCard .el-form-item__content{
    margin-left: 170px!important;
  }
#register .el-form-item__label{
  font-size: 20px;
  width: 120px!important;
  margin-right: 20px!important;
}
#register .el-form-item__content{
  margin-left: 140px!important;
}
.el-table th>.cell{
  text-align: center!important;
}
@media screen and (min-width:600px) and (max-width:1400px) {
  #register .el-form-item__label{
    font-size: 14px!important;
  }
  .main{
    margin-top: 0px!important;
  }
  .el-form-item{
    margin-bottom: 4px;
  }
}
</style>
