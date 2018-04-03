<template>
    <el-container>
        <el-header>
            <!--<img src="../assets/img/logo.png">-->
            <slot name="header">
                <el-col class="top-left" :xs="24" :sm="6" :md="5" :lg="5" :xl="3"><img src="../assets/img/logo_blue.png"></el-col>
                <el-col class="top-right" :xs="24" :sm="18" :md="19" :lg="19" :xl="21"><h1>{{hospital}}{{office}}{{lesion}}耐利血糖工作站</h1></el-col>
            </slot>
        </el-header>
        <el-main><slot name="main"></slot></el-main>
        <el-footer  class="dialog-footer"><p>北京康达百年生物科技有限公司 &nbsp; 服务热线：4006-100-312 010-68666077</p></el-footer>
    </el-container>
</template>
<script>
export default {
  name: 'BasePage',
  data () {
    return {
      hospital: '',
      office: '',
      lesion: ''
    }
  },
  mounted () {
    // console.log('globleBasePage', global.HEADER[0].hospital)
    this.hospital = localStorage.hospital
    this.office = localStorage.office
    this.lesion = localStorage.lesion
    if (!global.cookie) {
      // console.log('a')
      // alert('请重新登录！')
      this.$router.push({path: '/'})
      localStorage.setItem('hospital', '')
      localStorage.setItem('office', '')
      localStorage.setItem('lesion', '')
    }
  }
}
</script>
<style scoped>
    .el-header, .el-footer {
        color: #ffffff;
        text-align: center;
        padding: 0!important;
    }
    .el-header{
        height: 88px!important;
        letter-spacing: 14px;
    }
    .top-left{
        float: left;
        height: 88px;
        border-bottom: 3px solid #066093
    }
    .top-left img{
        margin-top: 10px;
    }
    .top-right{
        height: 88px;
        float: left;
        background-color: #066093;
        /*background: url("../assets/img/header_bg.jpg");*/
    }
    .top-right h1{
        padding-top: 4px;
    }
    .el-footer{
        position:fixed;
        bottom:0;
        width:100%;
        height:100px;
        background-color: #066093;
        z-index: 9;
    }
</style>
