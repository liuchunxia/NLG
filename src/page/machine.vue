<template>
  <BasePage>
    <header></header>
    <el-row slot="main">
      <!--printStart-->
      <el-table
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
          prop="name"
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
          prop="telephone"
          label="联系电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="doctor"
          label="主治医生"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="idCard"
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
          prop="blood"
          label="血糖值（mmol/L）"
          show-overflow-tooltip>
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
          prop="name"
          label="姓名"
          show-overflow-tooltip>
          <el-input placeholder="请输入内容"></el-input>
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
          prop="telephone"
          label="联系电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="doctor"
          label="主治医生"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="idCard"
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
          prop="blood"
          label="血糖值（mmol/L）"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!--<div class="block">-->
      <!--<el-pagination @size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage"-->
      <!--:page-sizes="[3, 6, 9, 40]"-->
      <!--:page-size="10"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="total">-->
      <!--</el-pagination>-->
      <!--</div>-->
      <el-row id="function">
        <el-button><router-link to="/bedInfo">首页</router-link></el-button>
        <el-button @click="printContent">打印</el-button>
        <el-button>数值/曲线</el-button>
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
        { id: 1, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.5 },
        { id: 2, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.2 },
        { id: 3, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.3 },
        { id: 4, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.9 },
        { id: 5, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.5 },
        { id: 6, SN: '123', name: 'Tom', telephone: '1235', sex: '男', age: 70, idCard: '34214', doctor: 'Sam', date: '2017-12-21', time: '6:00', blood: 6.5 }
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
      currentPage: 4,
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
      index: ''
    }
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
    },
    handleEdit (index, row) {
      // console.log(typeof (this.currentPatient.record[0].blood))
      this.index = index
      console.log(row)
      this.dialogVisible = true
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      // console.log('aaa')
    },
    editSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.patients[this.index].name = this.editForm.name
          this.patients[this.index].sex = this.editForm.sex
          this.patients[this.index].age = this.editForm.age
          this.patients[this.index].telephone = this.editForm.telephone
          this.patients[this.index].doctor = this.editForm.doctor
          this.patients[this.index].name = this.editForm.name
          // this.currentPatient.record[this.index].time = this.editForm.time
          // this.currentPatient.record[this.index].blood = this.editForm.blood
          this.editFormVisible = false
          this.dialogVisible = false
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
