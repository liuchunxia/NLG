<template>
  <div>
    <a @click.stop="inputInfo">
      <el-card class="box-card info-card" v-bind:class="{ active: patient.currentState }">
        <!--<button @click="click">click</button>-->
        <el-row :span="24">
          <el-col :span="10">
            <p>床位号：{{patient.bed_id}}</p>
            <p>血糖仪SN：{{patient.sn}}</p>
            <p>姓名：{{patient.patient_name}}</p>
            <p>电话：{{patient.tel}}</p>
            <p>性别：{{patient.sex}}</p>
            <p>年龄：{{patient.age}}</p>
            <p>身份证/社保卡/就诊卡号：{{patient.id_number}}</p>
            <p>主治医生：{{patient.doctor}}</p>
            <p>2017年</p>
          </el-col>
          <!--<el-col :span="10">-->
          <!--<el-table :data="patient.record" class="cardTable">-->
          <!--<el-table-column prop="date" label="日期">-->
          <!--<template slot-scope="scope">{{ scope.row.dates }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="name" label="姓名">-->
          <!--<template slot-scope="scope">{{ scope.row.blood }}</template>-->
          <!--</el-table-column>-->
          <!--</el-table>-->
          <!--</el-col>-->
          <!--<el-table :data="patient.record">-->
          <!--<el-table-column prop="" label="时间" width="120" :span="5">-->
          <!--&lt;!&ndash;<template slot-scope="scope">{{ scope.row.dates }}</template>&ndash;&gt;-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="" label="血糖值" show-overflow-tooltip :span="4">-->
          <!--&lt;!&ndash;<template slot-scope="scope">{{ scope.row.blood }}</template>&ndash;&gt;-->
          <!--</el-table-column>-->
          <!--</el-table>-->
          <el-col :span="5">
            <span>时间</span>
            <el-col  v-for="(item,index) in patient.datas" :key="index">{{ item.time }}
            </el-col>
          </el-col>
          <el-col :span="4">
            <span>血糖值</span>
            <el-col  class="blood">
              <el-col  v-for="(item,index) in patient.datas" :key="index" >
                <span v-if="unit===true && item.glucose > 11.1 || item.glucose < 4.4" v-bind:class="{ box: true }">{{ item.glucose }}</span>
                <span v-else-if="unit===false && (item.glucose > 200 || item.glucose < 79)" v-bind:class="{ box: true }">{{ item.glucose }}</span>
                <span v-else v-bind:class="{ box: false }"> {{ item.glucose }} </span>
              </el-col>
            </el-col>

          </el-col>
          <el-col :span="5">
            <p :key="unit">{{unit ? '(mmol/L)' : '(mg/dL)'}}</p>
            <p class="change" @click.stop="changUnit(patient.datas, unit), unit=!unit">单位换算</p>
            <p class="more" @click.stop="more(patient)">更多</p>
          </el-col>
        </el-row>
      </el-card>
    </a>

    <el-dialog
      title="填写患者信息"
      :visible.sync="dialogVisible"
      @click.stop
      width="60%">
      <el-row class="alert-content">
        <el-card class="box-card info-card">
          <!--<button @click="click">click</button>-->
          <el-row :span="24">
            <el-form :model="patientForm" :rules="rules" ref="patientForm" label-width="100px" class="demo-ruleForm">
              <!--<el-form-item label="床位" prop="bed_id">-->
                <!--<el-input v-model="patientForm.bed"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="姓名" prop="name">
                <el-input v-model="patientForm.name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="patientForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="联系电话" prop="telephone">
                <el-input v-model="patientForm.telephone"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input type="age" v-model.number="patientForm.age" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证/社保卡/就诊卡号" prop="ID_card">
                <el-input type="age" v-model="patientForm.ID_card" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="主治医生" prop="doctor">
                <el-input v-model="patientForm.doctor"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.stop="submitForm('patientForm'), dialogVisible">确定</el-button>
                <el-button @click.stop="dialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
            <!--<el-col :span="10">-->
              <!--<p>床位号：{{patient.number}}</p>-->
              <!--<p>血糖仪SN：{{patient.SN}}</p>-->
              <!--<p>姓名：{{patient.name}}</p>-->
              <!--<p>电话：{{patient.telephone}}</p>-->
              <!--<p>性别：{{patient.sex}}</p>-->
              <!--<p>年龄：{{patient.age}}</p>-->
              <!--<p>身份证/社保卡/就诊卡号：{{patient.id}}</p>-->
              <!--<p>主治医生：{{patient.doctor}}</p>-->
              <!--<p>2017年</p>-->
            <!--</el-col>-->
          </el-row>
        </el-card>
      </el-row>
      <el-alert class="alert-content" title="">提示：激活系统前确保本机已经连接到网络！</el-alert>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'card',
  data () {
    return {
      unit: true,
      dialogVisible: false,
      patientForm: {
        name: '',
        sex: '',
        telephone: '',
        age: '',
        ID_card: '',
        doctor: ''
      },
      rules: {
        name: [
          {required: true, message: '请填写患者名称', trigger: 'blur'}
          // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        sex: [
          { required: true, message: '请选择患者性别', trigger: 'change' }
        ],
        telephone: [
          { type: 'string', required: true, message: '请填写患者联系电话', trigger: 'blur' },
          { pattern: '^1[3|4|5|8][0-9]\\d{8}$', message: '手机号格式错误' }
        ],
        ID_card: [
          { type: 'string', required: true, message: '请填写患者身份证/社保卡/就诊卡号', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请填写患者年龄' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        doctor: [
          { required: true, message: '请填写主治医生姓名', trigger: 'blur' }
          // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  props: ['patient'],
  watch: {
    unit: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  methods: {
    click: function () {
      alert('aaa')
      console.log(this.patient.record)
    },
    changUnit: function (records, unit) {
      if (unit) {
        records.forEach(record => {
          record.glucose = (record.glucose * 18).toFixed(2)
          record.glucose = parseFloat(record.glucose)
          // console.log('type', typeof(record.glucose))
        })
      } else {
        records.forEach(record => {
          record.glucose = (record.glucose / 18).toFixed(2)
        })
      }
    },
    more: function (patient) {
      console.log('more', this.patient)
      this.$emit('more', [this.patient, this.unit])
    },
    inputInfo: function (patient) {
      console.log('aaa', this.patient)
      this.dialogVisible = true
      if (this.patient.name === '') {
        this.dialogVisible = true
      }
      this.$emit('inputInfo', this.patient)
    },
    submitForm (formName, dialogVisible) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.patient.bed_id)
          this.$ajax.post('http://101.200.52.233:8080/api/v1.0/patients', {
            'patient_name': this.$refs[formName].model.name,
            'sex': this.$refs[formName].model.sex,
            'tel': this.$refs[formName].model.telephone,
            'age': this.$refs[formName].model.age,
            'doctor_name': this.$refs[formName].model.doctor,
            'id_number': this.$refs[formName].model.ID_card,
            'bed_id': this.patient.bed_id
          })
            .then((response) => {
              console.log('resp', response)
              console.log('resp.statusText', response.data.status)
              if (response.data.status === 'success') {
                console.log('result', this.$refs[formName].model)
                this.patient.patient_name = this.$refs[formName].model.name
                this.patient.age = this.$refs[formName].model.age
                this.patient.sex = this.$refs[formName].model.sex
                this.patient.tel = this.$refs[formName].model.telephone
                this.patient.doctor_name = this.$refs[formName].model.doctor
                this.patient.id_number = this.$refs[formName].model.ID_card
                this.patient.datas = []
                this.dialogVisible = false
                return dialogVisible
              }
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
    }
  }
}
</script>
<style scoped>
  .el-card__body{
    padding: 0!important;
  }
  .el-card{
    margin: 0 3px 3px 3px;
    cursor: pointer;
    position: relative;
  }
  .info-card{
    /*height: 195px;*/
  }
  .active{
    background: #9cd8d8;
  }
  p{
    margin: 0!important;
    text-align: left;
    font-size: 14px;
  }
  span{
    font-size: 14px;
  }
  .change:hover, .more:hover{
    cursor: pointer;
    background: #fff;
    color: #fb752d;
    border: 1px solid #fb752d;
  }
  .change, .more{
    font-size: 14px;
    text-align: center;
  }
  .change{
    padding: 6px 6px;
    border-radius: 4pc;
    background: #fb752d;
    color: #fff;
    margin-top: 5px!important;
  }
  .more{
    /*position: fixed;*/
    /*bottom: 5px;*/
    padding: 6px 6px;
    margin-top: 65px!important;
    border-radius: 4pc;
    background: #fb752d;
    color: #fff;
  }
  .cardTable td, .cardTable th{
    padding: 0!important;
  }
  .cardTable th{
    padding: 0!important;
  }
  .box{ animation: change 1s  ease-in  infinite ; font-size: 14px; color:#f00; font-weight: bold}
  @keyframes change {
    0%{ opacity: 0}
    50%{ opacity: 1; color: #ff0000; font-size: 14px;}
    100%{ opacity: 0 }
  }
  @-webkit-keyframes change {
    0%{ opacity: 0}
    50%{ opacity: 1; color: #ff0000; font-size: 18px;}
    100%{ opacity: 0 }
  }
</style>
