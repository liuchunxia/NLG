<template>
  <BasePage>
    <header></header>
    <el-row slot="main">
      <el-row v-show="showData">
        <el-form :model="searchForm" :rules="rules" ref="searchForm" label-width="100px" class="searchForm">
          <el-row>
            <el-col :xs="8" :sm="7" :md="5" :lg="4">
              <el-form-item label="姓名" prop="patient_name" class="searchItem">
                <el-input v-model="searchForm.patient_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="7" :md="5" :lg="4">
              <el-form-item label="性别" prop="sex" class="searchItem">
                <el-radio-group v-model="searchForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="7" :md="5" :lg="4">
              <el-form-item label="年龄" prop="age" class="searchItem">
                            <!--:rules="[{ type: 'number', message: '年龄必须为数字值'}]"-->
                <el-input v-model.number="searchForm.age" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="7" :md="5" :lg="4">
              <el-form-item label="电话" prop="tel" class="searchItem">
                <el-input v-model="searchForm.tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="7" :md="6" :lg="5" id="idCard">
              <el-form-item class="searchItem" label="身份证/社保卡/就诊卡号">
              <!--<el-form-item class="searchItem">-->
                <!--<span float="left">身份证/社保卡/就诊卡号</span>-->
                <el-input v-model="searchForm.id_number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="7" :md="6" :lg="5">
              <el-form-item label="年龄阶段" class="searchItem">
                <el-col :span="11">
                  <el-form-item prop="min_age">
                    <el-input type="number" v-model.number="searchForm.min_age"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="max_age">
                    <el-input type="number" v-model.number="searchForm.max_age"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="就诊时间" prop="date" class="searchItem">
                <el-date-picker
                  v-model="searchForm.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="7" :md="6" :lg="5">
              <el-form-item label="血糖范围" prop="glucose" class="searchItem">
                <el-col :span="11">
                  <el-form-item prop="min_glucose">
                    <el-input v-model.number="searchForm.min_glucose" type="number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="max_glucose">
                    <el-input v-model.number="searchForm.max_glucose" type="number"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="7" :md="5" :lg="4">
              <el-form-item class="searchItem">
                <el-button type="primary" @click="submitForm('searchForm')">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <!--printStart-->
      <el-table
        ref="multipleTable"
        :data="patients"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-show="showData">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="日期"-->
          <!--width="120">-->
          <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="patient_name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          show-overflow-tooltip>
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
        <!--<el-table-column-->
          <!--prop="doctor"-->
          <!--label="主治医生"-->
          <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
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
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-table
        id="subOutputRank-print"
        :data="multipleSelection"
        tooltip-effect="dark"
        style="width: 100%; display: none"
        @selection-change="handleSelectionChange">
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="patient_name"
          label="姓名"
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
          prop="doctor"
          label="主治医生"
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
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block" v-bind:class="{all: isAll}">
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
      <div class="block" v-bind:class="{search: isSearch}">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="searchHandleCurrentChange"
                       :current-page="currentPages"
                       :page-size="20"
                       :page-sizes="[20]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="searchTotal"
                       v-show="showData">
        </el-pagination>
      </div>
      <el-row id="function" v-show="showData">
        <el-button type="primary"><router-link to="/bedInfo" style="color: #fff">首页</router-link></el-button>
        <el-button type="primary" @click="printContent">打印</el-button>
        <a id="downlink" style="display: none"></a>
        <el-button type="primary" class="button" @click="downloadFile(excelData)">导出</el-button>
        <el-button type="primary" @click="drawLine">数值/曲线</el-button>
        <el-button type="primary">平均值：{{mean}}</el-button>
      </el-row>
      <el-row v-show="showChart">
        <el-col id="myChart" :style="{width: '100%', height: '300px'}"></el-col>
        <el-button @click="returnData" type="warning">数据/曲线</el-button>
      </el-row>
    </el-row>
  </BasePage>
</template>
<script>
import BasePage from '../components/BasePage'
var XLSX = require('xlsx')
export default {
  components: {BasePage},
  data () {
    return {
      searchForm: {
        patient_name: '',
        sex: '',
        age: '',
        tel: '',
        id_number: '',
        min_age: '',
        max_age: '',
        date: '',
        max_glucose: '',
        min_glucose: ''
      },
      patients: [
        // { id: 1, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.5 },
        // { id: 2, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:30', blood: 6.2 },
        // { id: 3, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:40', blood: 6.3 },
        // { id: 4, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:50', blood: 6.9 },
        // { id: 5, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:20', blood: 6.5 },
        // { id: 6, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:10', blood: 6.5 }
      ],
      multipleSelection: [],
      rules: {
        // min_glucose: [
        //   { type: 'number', message: '必须为数字' }
        // ],
        // max_glucose: [
        //   { type: 'number', message: '必须为数字' }
        // ],
        // age: [
        //   { type: 'number', message: '年龄必须为数字值' }
        // ],
        tel: [
          {pattern: '^1[3|4|5|8][0-9]\\d{8}$', message: '手机号格式错误', trigger: 'blur'}
        ]
      },
      currentPage: 1,
      currentPages: 1,
      total: 0,
      searchTotal: 0,
      pageSize: 20,
      // 导出文件el
      outFile: '',
      mean: 0,
      sumBlood: 0,
      excelData: [],
      date: [],
      bloodData: [],
      chart: [],
      showChart: false,
      showData: true,
      start_date: '',
      end_date: '',
      totalNumber: '',
      isSearch: true,
      isAll: false
    }
  },
  mounted () {
    this.getAll()
    console.log('patients', this.patients)
    // this.total = this.patients.length
    this.outFile = document.getElementById('downlink')
    console.log('patients', this.patients)
    // this.patients.forEach(val => {
    //   this.sumBlood += val.glucose
    // })
    // console.log('blood', this.sumBlood)
    // this.mean = (this.sumBlood / this.total).toFixed(2)
  },
  methods: {
    getAll () {
      this.$ajax.get('http://101.200.52.233:8080/api/v1.0/patients/history?page=' + this.currentPage)
        .then((response) => {
          this.sumBlood = 0
          this.total = response.data.count
          this.patients = response.data.datas
          this.totalNumber = this.patients.length
          this.patients.forEach(val => {
            this.sumBlood += val.glucose
          })
          console.log('blood', this.sumBlood)
          this.mean = (this.sumBlood / this.totalNumber).toFixed(2)
          console.log('history', response)
          console.log('currentPage', this.currentPage)
        })
        .catch(function (error) {
          console.log('error', error)
          alert('网络连接有误！')
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('val', this.$refs[formName].model)
          if (this.$refs[formName].model.date.length === 0) {
            this.start_date = ''
            this.end_date = ''
          } else {
            this.start_date = this.$refs[formName].model.date[0]
            this.end_date = this.$refs[formName].model.date[1]
          }
          this.$ajax.get('http://101.200.52.233:8080/api/v1.0/patients/history?patient_name=' + this.$refs[formName].model.patient_name +
            '&sex=' + this.$refs[formName].model.sex + '&age=' + this.$refs[formName].model.age + '&tel=' + this.$refs[formName].model.tel +
            '&id_number=' + this.$refs[formName].model.id_number + '&max_age=' + this.$refs[formName].model.max_age +
            '&min_age=' + this.$refs[formName].model.min_age + '&max_glucose=' + this.$refs[formName].model.max_glucose +
            '&min_glucose=' + this.$refs[formName].model.min_glucose + '&begin_date=' + this.start_date +
            '&end_date=' + this.end_date + '&page=' + this.currentPages
          )
            .then((response) => {
              // console.log('date', this.$refs[formName].model.date[0])
              console.log('resp', response)
              this.patients = response.data.datas
              this.searchTotal = response.data.count
              this.isSearch = false
              this.isAll = true
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (vals) {
      this.multipleSelection = vals
      this.chart = vals
      this.excelData = vals
      if (vals) {
        this.sumBlood = 0
        vals.forEach(val => {
          this.sumBlood += val.glucose
        })
        console.log(this.sumBlood)
        this.mean = (this.sumBlood / vals.length).toFixed(2)
      }
      if (isNaN(this.mean)) {
        this.patients.forEach(val => {
          this.sumBlood += val.glucose
        })
        this.mean = (this.sumBlood / this.total).toFixed(2)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getAll()
      // this.submitForm()
    },
    searchHandleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      console.log('currentPage:', this.currentPage)
      this.currentPages = val
      this.submitForm('searchForm')
      // this.submitForm()
    },
    downloadFile: function (rs) {
      // 点击导出按钮
      let data = [{}]
      for (let k in rs[0]) {
        if (k === 'date') {
          data[0][k] = '日期'
        }
        if (k === 'time') {
          data[0][k] = '时间'
        }
        if (k === 'blood') {
          data[0][k] = '血糖值'
        }
      }
      rs.forEach(val => {
        let tempData = [{}]
        for (let k in val) {
          if (k === 'date' || k === 'time' || k === 'blood') {
            tempData[0][k] = val[k]
          }
        }
        data = data.concat(tempData)
      })
      console.log('data', data)
      this.downloadExl(data, '血糖值')
    },
    downloadExl: function (json, downName, type) {
      // 导出到excel
      let keyMap = []
      // 获取键
      for (let k in json[0]) {
        keyMap.push(k)
      }
      console.info('keyMap', keyMap, json)
      let tmpdata = []
      // 用来保存转换好的json
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })
      let outputPos = Object.keys(tmpdata)
      // 设置区域,比如表格从A1到D10
      let tmpWB = {
        SheetNames: ['mySheet'],
        // 保存的表标题
        Sheets: {
          'mySheet': Object.assign({},
            tmpdata,
            // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            })
        }
      }
      let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
      ))], {
        type: ''
      })
      // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown)
      // 创建对象超链接
      this.outFile.download = downName + '.xlsx'
      // 下载名称
      this.outFile.href = href
      // 绑定a标签
      this.outFile.click()
      // 模拟点击实现下载
      setTimeout(function () {
        // 延时释放
        URL.revokeObjectURL(tmpDown)
        // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    getCharCol: function (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    s2ab: function (s) { // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
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
    notice () {
      this.$message({
        showClose: true,
        message: '请选择数据',
        type: 'error'
      })
    },
    drawLine: function () {
      this.showChart = !this.showChart
      // this.showMore = !this.showMore
      // console.log('chart')
      // console.log(this.chart)
      // console.log('chartend')
      console.log('chart', this.chart.length)
      this.bloodData = []
      this.date = []
      if (this.chart.length === 0) {
        this.notice()
      } else {
        this.showChart = true
        this.showData = false
        this.bloodData = []
        this.date = []
        this.chart.forEach(val => {
          this.bloodData.push(val.glucose)
          this.date.push(val.time)
          // console.log(val.blood)
        })
        document.getElementById('myChart').style.width = document.documentElement.clientWidth - 10 + 'px'
        console.log(document.documentElement.clientWidth)
        console.log('chartend')
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
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
      // document.getElementById('myChart').style.width  = document.getElementById('myChart').width()
    },
    returnData () {
      this.showChart = false
      this.showData = true
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
  .search, .all {
    display: none;
  }
</style>
