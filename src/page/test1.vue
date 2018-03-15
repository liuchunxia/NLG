<template>
  <el-table
    :data="tableData"
    border
    @cell-mouse-enter="handleMouseEnter"
    @cell-mouse-leave="handleMouseOut"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template scope="scope">
        <span v-if="scope.row.editeFlage">{{ scope.row.name }}</span>
        <span v-if="!scope.row.editeFlage" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
        <span v-if="scope.row.editeFlage" style="margin-left:10px;" class="cell-icon"  @click="handleEdit(scope.row)">  <i class="el-icon-edit"></i> </span>
        <span v-if="!scope.row.editeFlage"  style="margin-left:10px;"  class="cell-icon"  @click="handleSave(scope.row)">  <i class="el-icon-document"></i> </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default{
  data(){
    return {
      tableData:[
        {
          name:"test",
          editeFlage:true
        },
        {
          name:"test",
          editeFlage:true
        },
        {
          name:"false",
          editeFlage:false
        },
        {
          name:"false",
          editeFlage:false
        },
      ],
      inputColumn1:""//第一列的输入框
    }
  },
  methods:{
    handleEdit:function(row){
      //遍历数组改变editeFlag
      row.editeFlage = false
      console.log('click', row)
    },
    handleSave:function(row){
      row.editeFlage = true
    },
    handleMouseEnter:function(row, column, cell, event){
      cell.children[0].children[1].style.color="black";
    },
    handleMouseOut:function(row, column, cell, event){
      cell.children[0].children[1].style.color="#ffffff";
    }
  }
}
</script>
<style>
  .cell-edit-input .el-input, .el-input__inner {
    width:100px;
  }
  .cell-icon{
    cursor:pointer;
    color:#fff;
  }
</style>
