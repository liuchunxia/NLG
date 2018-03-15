<template>
    <BasePage v-bind:headerMsg="headerMsg" v-bind:msgfromfa="show">
        <el-row slot="main">
            <el-row :is="who" v-on:headerInfo="headerInfo"></el-row>
            <transition name="fold" class="login">
                <a class="login" @click="changeComponent" >
                  {{show ? '登录' : '注册'}}
                  <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>
            </transition>
            <a class="forget" @click="changeforgetComponent" >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>&nbsp;&nbsp;
              {{forgeted ? '忘记密码' : '注册'}}
            </a>
        </el-row>
    </BasePage>
</template>
<script>
import BasePage from '../components/BasePage'
import Login from '../components/Login'
import register from '../components/register'
import forget from '../components/forget'
export default {
  components: {BasePage, Login, register, forget},
  name: 'index',
  data () {
    return {
      who: 'register',
      show: true,
      forgeted: true,
      isEditing: 'save',
      headerMsg: []
    }
  },
  methods: {
    changeComponent: function () {
      console.log('loginwho', this.show, this.forgeted)
      if (this.who === 'Login') {
        this.who = 'register'
        this.show = true
        this.forgeted = true
      } else {
        this.who = 'Login'
        this.show = false
        this.forgeted = true
      }
    },
    changeforgetComponent: function () {
      console.log('forgetwho', this.show, this.forgeted)
      if (this.who === 'forget') {
        this.who = 'Login'
        this.show = false
        this.forgeted = true
      } else {
        this.who = 'forget'
        this.show = true
        this.forgeted = false
      }
    },
    headerInfo: function (msg) {
      this.headerMsg = msg
      console.log('header', this.headerMsg)
    }
  }
}
</script>
<style scoped>
.login, .forget{
  cursor: pointer;
  color: #377ca1;
  padding: 10px 30px;
  font-size: 18px;
}
.login{
  float: right;
}
.login:hover{
  color: #fb752d;
}
.forget{
  float: left;
}
.forget, .login{
  margin-bottom: 60px;
}
.box{ animation: change 1s  ease-in  infinite ; font-size: 18px; color:#f00; font-weight: bold}
@keyframes change {
  0%{ opacity: 0}
  50%{ opacity: 1; color: #ff0000; font-size: 18px;}
  100%{ opacity: 0 }
}
</style>
