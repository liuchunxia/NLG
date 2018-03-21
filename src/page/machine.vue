<template>
  <BasePage>
    <header></header>
    <el-row slot="main">
      <!--printStart-->
      <el-table
        v-show="showData"
        ref="multipleTable"
        :data="patients"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="patient_name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="doctor"
          label="主治医生"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="id_number"
          label="身份证/社保卡/就诊卡"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="glucose"
          label="血糖值（mmol/L）"
          show-overflow-tooltip
          v-if="unit">
        </el-table-column>
        <el-table-column
          prop="glucose"
          label="血糖值（mg/dL）"
          show-overflow-tooltip
          v-else>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        id="subOutputRank-print"
        :data="multipleSelection"
        tooltip-effect="dark"
        style="width: 100%; display: none"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="patient_name"
          label="姓名"
          width="55"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="40"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="40"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="doctor"
          label="主治医生"
          width="70"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="id_number"
          label="身份证/社保卡/就诊卡"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="glucose"
          label="血糖值(mmol/L)"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="20"
                       :page-sizes="[20]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
                       v-show="showData">
      </el-pagination>
      </div>
      <el-row id="function" v-show="showData">
        <el-button><router-link to="/bedInfo">首页</router-link></el-button>
        <el-button @click="printContent">打印</el-button>
        <el-button @click="drawLine">数值/曲线</el-button>
        <el-button @click="changUnit">单位转换</el-button>
      </el-row>
      <!--<div>-->
      <!--<a id="downlink"></a>-->
      <!--<el-button class="button" @click="downloadFile(patients)">导出</el-button>-->
      <!--</div>-->
      <!--编辑界面-->
      <el-dialog title="填写病人信息" :close-on-click-modal="false" :visible.sync="dialogVisible" width="484px">
        <el-form :model="editForm" label-width="180px" ref="editForm" >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="editForm.sex" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="editForm.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="editForm.telephone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="主治医生" prop="doctor">
            <el-input v-model="editForm.doctor" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证/社保卡/就诊卡" prop="idCard">
            <el-input v-model="editForm.idCard" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="日期" prop="dates">-->
            <!--&lt;!&ndash;<el-input v-model="editForm.date" auto-complete="off"></el-input>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-time-picker type="date" placeholder="选择时间" v-model="editForm.date" style="width: 100%;"  format="yyyy:MM:DD"></el-time-picker>&ndash;&gt;-->
            <!--<el-date-picker type="date" placeholder="选择日期" v-model="editForm.dates" value-format="yyyy-MM-dd"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="时间" prop="date2">-->
            <!--&lt;!&ndash;<el-input v-model="editForm.date" auto-complete="off"></el-input>&ndash;&gt;-->
            <!--<el-time-picker type="time" placeholder="选择时间" v-model="editForm.time" value-format="HH:mm" format="HH:mm"></el-time-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="血糖值" prop="blood" :rules="[-->
       <!--// { required: true, message: '血糖值不能为空'},-->
      <!--{ type: 'number', message: '血糖值必须为数字值'}-->
    <!--]">-->
            <!--&lt;!&ndash;<el-input v-model="editForm.date" auto-complete="off"></el-input>&ndash;&gt;-->
            <!--<el-input type="blood" placeholder="填写血糖值"  style="width: 220px" v-model.number="editForm.blood"></el-input>-->
          <!--</el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit('editForm')" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

      <!--图表显示-->
      <el-row v-show="showChart">
        <el-col id="myChart" :style="{width: '100%', height: '300px'}"></el-col>
        <el-button @click="returnData" type="warning">数据/曲线</el-button>
      </el-row>
    </el-row>
  </BasePage>
</template>
<script>
import BasePage from '../components/BasePage'
export default {
  components: {BasePage},
  data () {
    return {
      patients: [
        // { id: 1, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.5 },
        // { id: 2, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.2 },
        // { id: 3, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.3 },
        // { id: 4, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.9 },
        // { id: 5, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.5 },
        // { id: 6, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.5 }
      ],
      multipleSelection: [],
      rules: {
        blood1: [
          { type: 'number', message: '必须为数字' }
        ],
        blood2: [
          { type: 'number', message: '必须为数字' }
        ],
        age: [
          { type: 'number', message: '年龄必须为数字值' }
        ]
      },
      currentPage: 1,
      total: 0,
      pageSize: 20,
      editLoading: false,
      dialogVisible: false,
      editForm: {
        id: 0,
        name: '',
        sex: '',
        age: '',
        telephone: '',
        idCard: ''
      },
      index: '',
      chart: [],
      showChart: false,
      showData: true,
      bloodData: [],
      date: [],
      unit: true,
      sn: '',
      data_id: 0
    }
  },
  mounted () {
    this.getInfo()
    console.log('rul', location.href)
    this.UrlSearch()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (vals) {
      this.multipleSelection = vals
      this.excelData = vals
      this.chart = vals
    },
    handleEdit (index, row) {
      // console.log(typeof (this.currentPatient.record[0].blood))
      this.index = index
      console.log(row)
      this.data_id = row.data_id
      this.dialogVisible = true
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      // console.log('aaa')
    },
    editSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.put('http://101.200.52.233:8080/datas/guard/' + this.data_id, {
            'sn': this.sn,
            'id_number': this.$refs[formName].model.idCard,
            'sex': this.$refs[formName].model.sex,
            'age': this.$refs[formName].model.age,
            'tel': this.$refs[formName].model.tel,
            'doctor': this.$refs[formName].model.doctor
            // 'date': this.$refs[formName].model.date,
            // 'time': this.$refs[formName].model.time
            // 'glucose': this.$refs[formName].model.blood
          })
            .then((response) => {
              this.patients[this.index].name = this.editForm.name
              this.patients[this.index].sex = this.editForm.sex
              this.patients[this.index].age = this.editForm.age
              this.patients[this.index].telephone = this.editForm.telephone
              this.patients[this.index].doctor = this.editForm.doctor
              this.patients[this.index].idCard = this.editForm.idCard
              console.log('resp', response)
              this.editFormVisible = false
              this.dialogVisible = false
            })
            .catch(function (error) {
              console.log('error', error)
              alert('网络连接有误！')
            })
          // this.currentPatient.record[this.index].time = this.editForm.time
          // this.currentPatient.record[this.index].blood = this.editForm.blood
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // console.info(this.currentPatient.record.dates)
      // console.info(this.currentPatient.record)
      // console.info(this.editForm)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getInfo()
      console.log(`currentPage`, this.currentPage)
    },
    printContent (e) {
      let subOutputRankPrint = document.getElementById('subOutputRank-print')
      console.log(subOutputRankPrint.innerHTML)
      let newContent = subOutputRankPrint.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    },
    getInfo () {
      this.$ajax.get('http://101.200.52.233:8080/api/v1.0/datas/guard?sn=' + this.sn + '&page=' + this.currentPage)
        .then((response) => {
          // console.log('date', this.$refs[formName].model.date[0])
          this.patients = response.data.datas
          this.total = response.data.count
          console.log('guard', response)
        })
        .catch(function (error) {
          console.log('error', error)
          alert('网络连接有误！')
        })
    },
    notice () {
      this.$message({
        showClose: true,
        message: '请选择数据',
        type: 'error'
      })
    },
    drawLine: function () {
      console.log('chart', this.chart)
      if (this.chart.length === 0) {
        this.notice()
      } else {
        this.showChart = true
        this.showData = false
        this.bloodData = []
        this.bloodData = []
        this.chart.forEach(val => {
          this.bloodData.push(val.glucose)
          this.date.push(val.time)
          // console.log(val.blood)
        })
        // document.getElementById('myChart').style.width  = document.getElementById('myChart').width()
        document.getElementById('myChart').style.width = document.documentElement.clientWidth - 10 + 'px'
        console.log(document.documentElement.clientWidth)
        console.log('chartend')
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: this.date
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.bloodData,
            type: 'line'
          }]
        })
      }
    },
    returnData () {
      this.showChart = false
      this.showData = true
    },
    changUnit () {
      this.unit = !this.unit
      console.log('red', this.patients)
      if (!this.unit) {
        this.patients.forEach(record => {
          record.glucose = (record.glucose * 18).toFixed(2)
          record.glucose = parseFloat(record.glucose)
          // console.log('type', typeof(record.glucose))
        })
      } else {
        this.patients.forEach(record => {
          record.glucose = (record.glucose / 18).toFixed(2)
        })
      }
    },
    UrlSearch () {
      let name, value
      let str = location.href
      let num = str.indexOf('?')
      str = str.substr(num + 1)
      let arr = str.split('&')
      for (let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=')
        if (num > 0) {
          name = arr[i].substring(0, num)
          value = arr[i].substr(num + 1)
          this[name] = value
        }
        this.sn = this[name]
      }
    }
  }
}
</script>
<style scoped>
  .searchItem{
    margin-top: 20px;
  }
  .el-pagination{
    margin-bottom: 50px;
  }
  #function{
    margin: 20px 0 60px 0;
  }
  #function a{
    text-decoration: none;
  }
</style>
