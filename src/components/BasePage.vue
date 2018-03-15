<template>
    <el-container>
        <el-header>
            <!--<img src="../assets/img/logo.png">-->
            <slot name="header">
                <el-col class="top-left" :xs="24" :sm="6" :md="5" :lg="5" :xl="3"><img src="../assets/img/logo.png"></el-col>
                <el-col class="top-right" :xs="24" :sm="18" :md="19" :lg="19" :xl="21"><h1>耐利血糖工作站</h1></el-col>
            </slot>
        </el-header>
        <el-main><slot name="main"></slot></el-main>
        <el-footer  class="dialog-footer"><p>北京康达百年生物科技有限公司 &nbsp; 服务热线：4006-100-312 010-68666077</p></el-footer>
    </el-container>
</template>
<script>
export default {
  name: 'BasePage',
  props: ['headerMsg', 'msgfromfa'],
  mounted () {
    console.log('headerMsg', this.headerMsg)
    console.log('msgfromfa', this.msgfromfa)
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
        border-bottom: 3px solid #f5724b
    }
    .top-left img{
        margin-top: 10px;
    }
    .top-right{
        height: 88px;
        float: left;
        /*background-color: #53a1a6;*/
        background: url("../assets/img/header_bg.jpg");
    }
    .top-right h1{
        padding-top: 4px;
    }
    .el-footer{
        position:fixed;
        bottom:0;
        width:100%;
        height:100px;
        background-color: #f6724b;
        z-index: 9;
    }
</style>
