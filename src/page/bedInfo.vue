<template>
    <BasePage>
      <header></header>
      <el-row slot="main">
        <el-row class="cards" v-show="showCard">
          <el-col :span="6" v-for="(patient,$index) in patients" :key="$index">
            <card v-bind:patient="patient" v-on:more="getmore"></card>
          </el-col>
        </el-row>
        <el-row class="function" v-show="showCard">
          <router-link to="/search">历史信息查询</router-link>
          <el-button type="primary" icon="el-icon-arrow-left" @click="prePage" :disabled="pre_button">上一页</el-button>
          <el-button type="primary" @click="nextPage" :disabled="next_button">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
          <!--<el-button type="primary" @click="prePage" >上一页</el-button>-->
          <!--<a>下一页</a>-->
          <router-link to="/machine?sn=00000">备用机一</router-link>
          <router-link to="/machine?sn=11111">备用机二</router-link>
        </el-row>
        <!--<button @click="click">click</button>-->
        <!--<el-pagination-->
            <!--background-->
            <!--:current-page="currentPage"-->
            <!--layout="prev, pager, next"-->
            <!--:page-size="10"-->
            <!--:total="30">-->
        <!--</el-pagination>-->

        <moreInfo v-show="showMore" v-bind:showMore="showMore" v-bind:currentPatient="currentPatient" v-bind:unit="unit" v-on:getBack="getBack" v-bind:showCard="showCard"></moreInfo>
        <el-row class="backFunction" v-show="showMore" style="width: 50px">
          <a @click="returnBack" style="width: 50px">返回</a>
        </el-row>
        <!---------------连接血糖仪------------->
        <!--step1-->
        <!--<el-dialog-->
          <!--title="血糖仪连接"-->
          <!--:visible.sync="dialogVisible"-->
          <!--width="30%">-->
          <!--<img :src="imgUrl">-->
          <!--&lt;!&ndash;<el-form ref="netForm" :model="netForm" :rules="netrules" label-width="80px">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-form-item label="网络名称">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-input v-model="netForm.netName"></el-input>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-form-item label="网络密码">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-input type="password" v-model="netForm.password"></el-input>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
          <!--<el-row class="footer">-->
            <!--<el-button type="primary" @click="getNet('netForm')">确 定</el-button>-->
          <!--</el-row>-->
          <!--<el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>-->
        <!--</el-dialog>-->

        <el-dialog
          title="血糖仪连接(1)"
          :visible.sync="step1"
          width="30%"
          :close-on-click-modal="false">
          <!--<img :src="imgUrl">-->
          <img src="http://101.200.52.233:8080/api/v1.0/code/server" style="width: 100%">
          <!--<img src="data:image/png;base64,${imgUrl}">-->
          <!--<el-form ref="netForm" :model="netForm" :rules="netrules" label-width="80px">-->
            <!--<el-form-item label="网络名称">-->
              <!--<el-input v-model="netForm.netName"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="网络密码">-->
              <!--<el-input type="password" v-model="netForm.password"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <el-row class="footer">
            <el-button type="primary" @click="submitServer">确 定</el-button>
          </el-row>
          <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
        </el-dialog>
        <el-dialog
          title="血糖仪连接(2)"
          :visible.sync="step2"
          width="30%"
          :close-on-click-modal="false">
          <img src="http://101.200.52.233:8080/api/v1.0/code/route" style="width: 100%">
          <el-row class="footer">
            <el-button type="primary" @click="getWifi">确 定</el-button>
          </el-row>
          <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
        </el-dialog>
        <el-dialog
          title="血糖仪连接(3)"
          :visible.sync="step3"
          width="30%"
          :close-on-click-modal="false">
          <!--<img src="http://101.200.52.233:8080/api/v1.0/code/route" style="width: 100%">-->
          <el-form ref="snForm" :model="snForm" :rules="snRules" label-width="80px">
          <el-form-item label="血糖仪编号">
          <el-input v-model="snForm.sn"></el-input>
          </el-form-item>
          </el-form>
          <el-row class="footer">
            <el-button type="primary" @click="getWifi">确 定</el-button>
          </el-row>
          <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
        </el-dialog>
      </el-row>
    </BasePage>
</template>
<script>
import BasePage from '../components/BasePage'
import card from '../components/card'
import moreInfo from '../components/moreInfo'
export default {
  components: {BasePage, card, moreInfo},
  name: 'bedInfo',
  data () {
    return {
      currentPage: 1,
      patients: [],
      showMore: false,
      showCard: true,
      currentPatient: {},
      checked: false,
      unit: true,
      pre_button: true,
      next_button: false,
      mean: 0,
      sum: 0,
      chartData: [],
      date: [],
      bloodData: [],
      showChart: false,
      patient: [],
      step1: false,
      step2: false,
      step3: false,
      snForm: {
        sn: ''
      },
      snRules: {
        netName: [
          { sn: true, message: '请输入血糖仪编号', trigger: 'blur' }
        ]
      },
      imgUrl: ''
    }
  },
  mounted () {
    this.getAll()
    this.getServer()
    for (let i in this.patients) {
      console.log('i', this.patients[i])
    }
  },
  methods: {
    show (index) {
      console.log('aaa')
    },
    getBack (msg) {
      console.log('getBack', msg)
    },
    // click: function () {
    //   alert('aaa')
    // },
    inputInfo: function (msg) {
      console.log(msg)
    },
    getmore: function (msg) {
      this.showMore = true
      this.showCard = false
      // console.log('msg', msg[0])
      this.currentPatient = msg[0]
      this.unit = msg[1]
      if (this.currentPatient) {
        this.currentPatient.datas.forEach(val => {
          this.sum += val.glucose
        })
        this.mean = (this.sum / this.currentPatient.datas.length).toFixed(2)
        // console.log(this.currentPatient.datas)
      }
    },
    returnBack: function () {
      this.showMore = false
      this.showCard = true
    },
    prePage: function () {
      console.log('page:', this.currentPage)
      this.currentPage = this.currentPage - 1
      if (this.currentPage === 0) {
        this.pre_button = true
        this.next_button = false
        this.getAll()
      } else {
        // this.next_button = false
        this.getAll()
      }
    },
    nextPage: function () {
      console.log('page:', this.currentPage)
      this.currentPage = this.currentPage + 1
      if (this.currentPage === 2) {
        this.pre_button = false
        this.next_button = true
        this.getAll()
      } else {
        this.getAll()
      }
    },
    submitServer () {
      this.step1 = false
      this.step2 = true
    },
    getWifi () {
      this.step2 = false
      this.step3 = true
    },
    getNet: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('valid', this.$refs[formName])
          console.log('result', this.$refs[formName].model)
          // let result = this.$refs[formName].model
          // this.$ajax.post('http://101.200.52.233:8080/api/v1.0/api/v1.0/code/route', {
          //   'netName': this.$refs[formName].model.netName,
          //   'password': this.$refs[formName].model.password
          // })
          //   .then(function (response) {
          //     // console.log('before: ' + this.dialogVisible)
          //     this.dialogVisible = false
          //     // console.log('after: ' + this.dialogVisible)
          //   }.bind(this))
          //   .catch(function (error) {
          //     console.log('error', error)
          //     alert('网络连接有误！')
          //   })
          // console.log('status', status)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getAll: function () {
      this.$ajax.get('http://101.200.52.233:8080/api/v1.0/beds', {
        params: { 'page': this.currentPage }
      })
        .then((response) => {
          console.log('page = ', this.currentPage)
          console.log('resp.data', response.data.beds)
          this.patients = response.data.beds
          console.log('resp', this.patients)
        })
        .catch(function (error) {
          console.log('error', error)
          alert('网络连接有误！')
        })
    },
    getServer: function () {
      this.$ajax.get('http://101.200.52.233:8080/api/v1.0/code/server')
        .then((response) => {
          console.log('resp', response)
          this.step1 = true
        })
        .catch(function (error) {
          console.log('error', error)
          alert('网络连接有误！')
        })
    }
  }
}
</script>
<style>
  .card{
    float: left;
    margin: 2px;
  }
  .cards{
    margin-bottom: 100px;
  }
  .backFunction{
    position:fixed;
    bottom:0px;
    width:100%;
    height:100px;
    margin-bottom: 10px;
    z-index: 99;
    /*background-color: #f6724b;*/
  }
  .backFunction a{
    border-radius: 4px;
    float: left;
    cursor: pointer;
    padding: 10px 35px;
    /*margin-left: 130px;*/
    background: #9cd8d8;
    color: #fff;
    font-size: 22px;
    border-bottom: 3px solid #377ca1;
    text-decoration: none;
  }
  .el-main {
    overflow-x:hidden!important;
  }
  .footer{
    margin-top: 20px;
  }
  .function{
    position:fixed;
    bottom:0px;
    width:100%;
    height:100px;
    /*background-color: #f6724b;*/
  }
  .function a{
    cursor: pointer;
    padding: 10px 75px;
    /*margin-left: 130px;*/
    background: #9cd8d8;
    color: #fff;
    font-size: 22px;
    border-bottom: 3px solid #377ca1;
    text-decoration: none;
  }
</style>
