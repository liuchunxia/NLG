<template>
  <el-row>
    <el-card class="" v-show="showData">
      <el-row :span="24">
        <el-col :span="5">
          <p>床位号：{{currentPatient.bed_id}}</p>
        </el-col>
        <el-col :span="5">
          <p>姓名：{{currentPatient.patient_name}}</p>
        </el-col>
        <el-col :span="3">
          <p>性别：{{currentPatient.sex}}</p>
        </el-col>
        <el-col :span="5">
          <p>年龄：{{currentPatient.age}}</p>
        </el-col>
        <el-col :span="5">
          <p>主治医生：{{currentPatient.doctor_name}}</p>
        </el-col>
      </el-row>
      <el-table ref="multipleTable"  style="width: 100%" v-bind:data="currentPatient.datas" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :span="2">
        </el-table-column>
        <el-table-column label="日期" width="120" :span="4">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="" label="时间" width="120" :span="4">
          <template slot-scope="scope">{{ scope.row.time }}</template>
        </el-table-column>
        <el-table-column prop="" v-if="unit" label="血糖值(mmol/L)"  show-overflow-tooltip :span="6">
          <template slot-scope="scope">{{ scope.row.glucose }}</template>
        </el-table-column>
        <el-table-column prop="" v-if="!unit" label="血糖值(mg/dL)"  show-overflow-tooltip :span="6">
          <template slot-scope="scope">{{ scope.row.glucose }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">隐藏</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="function">
        <a>平均值：{{meanValue}}</a>
        <a @click="drawLine">数值/曲线</a>
        <a @click="printContent">打印</a>
        <a id="downlink" style="display: none"></a>
      </el-row>

      <!--<el-row class="function">-->
        <!--<a @click="returnBack">返回</a>-->
        <!--<a>平均值：{{meanValue}}</a>-->
        <!--<a @click="drawLine">数值/曲线</a>-->
        <!--<el-button @click="printContent">打印</el-button>-->
        <!--<a id="downlink" style="display: none"></a>-->
      <!--</el-row>-->

      <!--编辑界面-->
      <el-dialog title="编辑" :close-on-click-modal="false" :visible.sync="dialogVisible" width="484px">
        <el-form :model="editForm" label-width="80px" ref="editForm" >
          <el-form-item label="日期" prop="dates">
            <!--<el-input v-model="editForm.date" auto-complete="off"></el-input>-->
            <!--<el-time-picker type="date" placeholder="选择时间" v-model="editForm.date" style="width: 100%;"  format="yyyy:MM:DD"></el-time-picker>-->
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dates" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="时间" prop="date2">
            <!--<el-input v-model="editForm.date" auto-complete="off"></el-input>-->
            <el-time-picker type="time" placeholder="选择时间" v-model="editForm.time" value-format="HH:mm" format="HH:mm"></el-time-picker>
          </el-form-item>
          <el-form-item label="血糖值" prop="blood" :rules="[
       // { required: true, message: '血糖值不能为空'},
      { type: 'number', message: '血糖值必须为数字值'}
    ]">
            <!--<el-input v-model="editForm.date" auto-complete="off"></el-input>-->
            <el-input type="blood" placeholder="填写血糖值"  style="width: 220px" v-model.number="editForm.blood"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit('editForm')" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
    </el-card>
    <!--图表显示-->
    <el-row v-show="showChart">
      <el-col id="myChart" :style="{width: '100%', height: '300px'}"></el-col>
      <el-button @click="returnData" type="warning">数据/曲线</el-button>
    </el-row>

    <!--打印-->
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
  </el-row>
</template>
<script>
export default {
  name: 'moreInfo',
  data () {
    return {
      sumBlood: 0,
      initMean: 0,
      editFormVisible: false,
      editLoading: false,
      dialogVisible: false,
      editForm: {
        id: 0,
        dates: '',
        time: '',
        blood: 0
      },
      index: '',
      multipleSelection: [],
      meanValue: 0,
      date: [],
      bloodData: [],
      showChart: false,
      chart: [],
      showData: true,
      getBack: false
    }
  },
  props: ['currentPatient', 'unit', 'showMore'],
  mounted () {
    console.log('unit', this.unit)
  },
  watch: {
    showMore: function (val, oldVal) {
      if (this.showMore) {
        this.getMean()
      }
      console.log('showMore: %s, old: %s', val, oldVal)
    }
  },
  methods: {
    handleSelectionChange (vals) {
      this.multipleSelection = vals
      this.chart = vals
      this.$emit('chart', this.chart)
      console.log('vals', vals)
      console.log(this.chart)
      if (vals) {
        this.sumBlood = 0
        vals.forEach(val => {
          this.sumBlood += val.glucose
        })
        console.log(this.sumBlood)
        this.meanValue = (this.sumBlood / vals.length).toFixed(2)
        // this.meanValue.toFixed(2)
        // this.meanValue = (this.sumBlood / this.currentPatient.datas.length).toFixed(2)
        // this.$emit('meanValue', this.meanValue)
        console.log('sumBlood', this.sumBlood)
        console.log('meanValue', this.meanValue)
      }
      // if (isNaN(this.meanValue) || vals.length === 0) {
      //   this.currentPatient.datas.forEach(val => {
      //     this.sumBlood += val.glucose
      //     // console.log(val.blood)
      //   })
      //   this.meanValue = (this.sumBlood / this.currentPatient.datas.length).toFixed(2)
      //   // this.meanValue = this.meanValue.toFixed(2)
      //   this.$emit('meanValue', this.meanValue)
      // }
    },
    getMean () {
      this.currentPatient.datas.forEach(val => {
        this.sumBlood += val.glucose
        // console.log(val.blood)
      })
      this.meanValue = (this.sumBlood / this.currentPatient.datas.length).toFixed(2)
    },
    handleEdit (index, row) {
      // console.log(typeof (this.currentPatient.record[0].blood))
      this.index = index
      // console.log(row)
      this.dialogVisible = true
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      // console.log('aaa')
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    editSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.currentPatient.record[this.index].dates = this.editForm.dates
          this.currentPatient.record[this.index].time = this.editForm.time
          this.currentPatient.record[this.index].blood = this.editForm.blood
          this.editFormVisible = false
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
      console.log('chart', this.chart)
      if (this.chart.length === 0) {
        this.notice()
      } else {
        this.showChart = true
        this.showData = false
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
    font-size: 20px;
    padding-bottom: 10px;
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
  .el-card{
    margin-bottom: 80px;
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
  .el-main {
    overflow-x:hidden!important;
  }
  .footer{
    margin-top: 20px;
  }
</style>
