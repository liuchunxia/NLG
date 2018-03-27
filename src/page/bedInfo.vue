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
          <router-link to="/search" class="history">历史信息查询</router-link>
          <el-button type="primary" icon="el-icon-arrow-left" @click="prePage" :disabled="pre_button">上一页</el-button>
          <el-button type="primary" @click="nextPage" :disabled="next_button">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
          <!--<el-button type="primary" @click="prePage" >上一页</el-button>-->
          <!--<a>下一页</a>-->
          <router-link to="/machine?sn=00000" v-bind:class="{ activeMachine: isActive1 }" class="machine machine1">备用机一</router-link>
          <router-link to="/machine?sn=11111" v-bind:class="{ activeMachine: isActive2 }" class="machine">备用机二</router-link>
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
        <el-row class="backFunction" v-show="showMore" style="width: 90px;">
          <el-button  @click="returnBack" style="width: 90px" icon="el-icon-arrow-left">返回</el-button>
        </el-row>
        <!---------------连接血糖仪------------->
        <el-dialog
          title="请连接血糖仪"
          :visible.sync="step"
          width="30%"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false">
          <!--<img :src="imgUrl" style="width: 100%">-->
          <el-button type="primary" @click="getLink">确 定</el-button>
          <el-row class="footer">
            <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
          </el-row>
        </el-dialog>

        <el-dialog
          title="血糖仪连接(1)"
          :visible.sync="step1"
          width="30%"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false">
          <!--<img :src="imgUrl" style="width: 100%">-->
          <img src="http://101.200.52.233:8080/api/v1.0/code/server" style="width: 100%">
          <el-button type="primary" @click="submitServer">确 定</el-button>
          <el-row class="footer">
            <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
          </el-row>
        </el-dialog>
        <el-dialog
          title="血糖仪连接(2)"
          :visible.sync="step2"
          width="30%"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false">
          <img src="http://101.200.52.233:8080/api/v1.0/code/route" style="width: 100%">
          <el-button type="primary" @click="getWifi">确 定</el-button>
          <el-row class="footer">
            <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
          </el-row>
        </el-dialog>
        <el-dialog
          title="血糖仪连接(3)"
          :visible.sync="step3"
          width="30%"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false">
          <!--<img src="http://101.200.52.233:8080/api/v1.0/code/route/" style="width: 100%">-->
          <!--<img :src="snUrl" style="width: 100%">-->
          <el-form ref="snForm" :model="snForm" :rules="snRules" label-width="100px">
            <el-form-item label="血糖仪编号" prop="sn">
              <el-input v-model="snForm.sn"></el-input>
            </el-form-item>
            <el-button style="margin: 10px 0" type="primary" @click="getSn('snForm')">确 定</el-button>
          </el-form>
          <el-row class="footer">
            <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
          </el-row>
        </el-dialog>
        <el-dialog
          title="血糖仪连接(3)"
          :visible.sync="step4"
          width="30%"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false">
          <img src="http://101.200.52.233:8080/api/v1.0/code/sn?sn=' + sn '" style="width: 100%">
          <!--<img :src="snUrl" style="width: 100%">-->
          <el-row>
            <span>血糖仪编号：{{sn}}</span>
          </el-row>
          <el-button type="primary" @click="linkSubmit">确 定</el-button>
          <el-row class="footer">
            <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
          </el-row>
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
      step: true,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      snForm: {
        sn: ''
      },
      snRules: {
        sn: [
          { required: true, message: '请输入血糖仪编号', trigger: 'blur' },
          { min: 8, max: 8, message: '必须8个字符', trigger: 'blur' }
        ]
      },
      imgUrl: '',
      snUrl: '',
      isActive1: false,
      isActive2: false,
      sn: '',
      linkNumber: 0
    }
  },
  mounted () {
    this.getAll()
    // this.getServer()
    if (localStorage.isActive1) {
      this.isActive1 = true
      this.step = false
    } else {
      this.step = true
    }
    if (localStorage.isActive2) {
      this.isActive2 = true
      this.step = false
    }
    for (let i in this.patients) {
      console.log('i', this.patients[i])
    }
  },
  watch: {
    isActive1: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
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
        this.getAll()
        this.pre_button = false
        this.next_button = false
      }
    },
    nextPage: function () {
      console.log('page:', this.currentPage)
      this.currentPage = this.currentPage + 1
      if (this.currentPage === 4) {
        this.pre_button = false
        this.next_button = true
        this.getAll()
      } else {
        this.getAll()
        this.pre_button = false
        this.next_button = false
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
    getLink () {
      this.step = false
      this.step1 = true
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
    // getServer: function () {
    //   this.$ajax.get('http://101.200.52.233:8080/api/v1.0/code/server')
    //     .then((response) => {
    //       console.log('resp', response)
    //       this.step1 = true
    //     })
    //     .catch(function (error) {
    //       console.log('error', error)
    //       alert('网络连接有误！')
    //     })
    // },
    getSn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('val', this.$refs[formName].model)
          this.$ajax.get('http://101.200.52.233:8080/api/v1.0/code/sn', {
            params: { 'sn': this.snForm.sn }
          })
            .then((response) => {
              this.sn = this.snForm.sn
              console.log('resp', response)
              this.snUrl = 'http://101.200.52.233:8080/api/v1.0/code/sn?sn=' + this.snForm.sn
              this.step3 = false
              this.step4 = true
            })
            .catch(function (error) {
              console.log('error', error)
              alert('网络连接有误！')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    linkSubmit () {
      this.linkNumber = this.linkNumber + 1
      if (this.linkNumber === 1) {
        this.step4 = false
        this.isActive1 = true
        localStorage.setItem('isActive1', true)
        this.step = true
      } else if (this.linkNumber === 2) {
        this.step4 = false
        this.isActive2 = true
        localStorage.setItem('isActive2', true)
      }
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
  .backFunction .el-button{
    /*background: #9cd8d8;*/
    background: #409EFF;
    color: #fff;
    border-bottom: 3px solid #377ca1;
    margin-top: 10px;
  }
  .backFunction a{
    border-radius: 4px;
    float: left;
    cursor: pointer;
    padding: 10px 15px;
    /*margin-left: 130px;*/
    background: #409EFF;
    /*background: #9cd8d8;*/
    color: #fff;
    font-size: 18px;
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
  .function .history{
    margin-right: 15%;
    cursor: pointer;
    padding: 10px 35px;
    border-radius: 5px;
    /*margin-left: 130px;*/
    background: #409EFF;
    /*background: #9cd8d8;*/
    /*background: #c1c1c1;*/
    color: #fff;
    font-size: 18px;
    border-bottom: 3px solid #377ca1;
    text-decoration: none;
  }
  .machine1{
    margin-left: 15%;
  }
  .function .machine{
    cursor: pointer;
    padding: 10px 35px;
    /*margin-left: 130px;*/
    /*background: #9cd8d8;*/
    border-radius: 5px;
    background: #c1c1c1;
    color: #fff;
    font-size: 18px;
    border-bottom: 3px solid #377ca1;
    text-decoration: none;
  }
  .activeMachine {
    background: #409EFF!important;
  }
  .active {
    background: #9cd8d8!important;
  }
</style>
