<template>
    <el-row slot="main" :gutter="20" type="flex" class="row-bg main" justify="center">
      <el-col :xs="20" :sm="18" :md="16" :lg="12">
        <el-card class="box-card">
          <el-col>
            <form id="register">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="医院" prop="hospital">
                  <el-input v-model="ruleForm.hospital"></el-input>
                </el-form-item>
                <el-form-item label="科室" prop="sections">
                  <el-input v-model="ruleForm.sections"></el-input>
                </el-form-item>
                <el-form-item label="病区" prop="ward">
                  <el-input v-model="ruleForm.ward"></el-input>
                </el-form-item>
                <el-form-item label="操作员" prop="user">
                  <el-input v-model="ruleForm.user"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="telephone">
                  <el-input v-model="ruleForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <a class="submit hvr-bounce-to-right" @click="registerForm('ruleForm')">注册</a>

                <!--<el-form-item>-->
                  <!--&lt;!&ndash;<el-button @click="resetForm('ruleForm')">重置</el-button>&ndash;&gt;-->
                <!--</el-form-item>-->
              </el-form>
            </form>

            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :close-on-click-modal="false">
              <el-row class="alert-content">恭喜您，注册成功，是否激活系统！</el-row>
              <el-row class="footer">
                <el-button type="primary" @click="dialogVisible = true">确 定</el-button>
                <el-button @click="resetForm('ruleForm'), dialogVisible = false">取 消</el-button>
              </el-row>
              <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
            </el-dialog>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'register',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        hospital: '',
        sections: '',
        ward: '',
        user: '',
        telephone: '',
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        hospital: [
          { required: true, message: '请输入医院名称', trigger: 'blur' }
        ],
        sections: [
          { required: true, message: '请输入科室名称', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入操作人员名称', trigger: 'blur' }
        ],
        telephone: [
          { type: 'string', required: true, message: '请输入联系电话', trigger: 'blur' },
          {pattern: '^1[3|4|5|8][0-9]\\d{8}$', message: '手机号格式错误', trigger: 'blur'}
        ],
        email: [
          { type: 'email', message: '请输入正确邮箱格式', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    registerForm (formName) {
      // let status
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('valid', this.$refs[formName])
          console.log('result', this.$refs[formName].model)
          // let result = this.$refs[formName].model
          this.$ajax.post('http://101.200.52.233:8080/api/v1.0/operators', {
            'operator_name': this.$refs[formName].model.user,
            'password': this.$refs[formName].model.pass,
            'hospital': this.$refs[formName].model.hospital,
            'office': this.$refs[formName].model.sections,
            'lesion': this.$refs[formName].model.ward,
            'tel': this.$refs[formName].model.telephone,
            'mail': this.$refs[formName].model.email
          })
            .then((response) => {
              console.log('resp', response)
              console.log('resp.statusText', response.data.status)
              if (response.data.status === 'success') {
                this.dialogVisible = true
              }
            })
            // .then(function (response) {
            //   // console.log('before: ' + this.dialogVisible)
            //   this.dialogVisible = true
            //   // console.log('after: ' + this.dialogVisible)
            // }.bind(this))
            .catch(function (error) {
              console.log('error', error)
              alert('网络连接有误！')
            })
          // console.log('status', status)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName, dialogVisible) {
      this.dialogVisible = false
      this.$refs[formName].resetFields()
      return dialogVisible
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    margin-top: 40px;
  }
  form{
    margin: 10px 8px;
  }
  .el-card{
    /*background-color: #eeeeee;*/
    border: solid 3px #9cd8d8;
  }
  .submit{
    cursor: pointer;
    transform: translateZ(0);
    padding: 10px 75px;
    margin-left: 65px;
    background: #066093;
    color: #fff;
    font-size: 22px;
    border-bottom: 3px solid #377ca1;
    /*border-bottom: 4px solid #9cd8d8;*/
    /*border-bottom: 3px solid #fb752d;*/
    text-decoration: none;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
  }
  /*-- //banner --*/
  /* Bounce To Right */
  .hvr-bounce-to-right {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
  }
  .hvr-bounce-to-right:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fb752d;
    /*background: rgba(255, 62, 28, 0.5);*/
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
  }
  .hvr-bounce-to-right:hover, .hvr-bounce-to-right:focus, .hvr-bounce-to-right:active {
    /*color: #fb752d;*/
  }
  .hvr-bounce-to-right:hover:before, .hvr-bounce-to-right:focus:before, .hvr-bounce-to-right:active:before {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
    transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
  }
  .alert-content{
    margin-bottom: 20px;
  }
</style>
