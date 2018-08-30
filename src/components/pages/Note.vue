<template>
  <div>
    <transition name="el-zoom-in-top">
      <el-button v-if="multipleSelection.length>0" type="danger" class="batchDelete-note" @click="batchDeleteNode">批量删除</el-button>
    </transition>
    <el-button type="primary" class="add-note" @click="editNote(null,null)">添加笔记</el-button>
    <el-table :data="tableData" border style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">>
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center">
      </el-table-column>
      <el-table-column prop="Founder" label="创建人" width="180" align="center">
      </el-table-column>
      <el-table-column prop="contentDes" label="内容概览" align="center">
      </el-table-column>
      <el-table-column prop="foundTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column prop="lastModifyTime" label="最后修改时间" align="center" width="200">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editNote(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteNote(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState } from "vuex";
export default {
  name: "Note",
  data() {
    return {
      multipleSelection: [],
      selectedIDs: []
    };
  },
  computed: mapState({
    tableData: state => state.tableData
  }),
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let ids = [];
      this.multipleSelection.map(item => {
        ids.push(item.id);
      });
      this.selectedIDs = ids;
      console.log(this.selectedIDs);
    },
    batchDeleteNode() {
      this.$confirm("确认删除所有选中的便签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.tableData = this.tableData.filter(
            data => !this.selectedIDs.includes(data.id)
          );
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editNote(index, row) {
      if (index == null) {
        this.$router.push("/editNote/addNote");
      } else {
        this.$router.push(`/editNote/${row.id}`);
      }
    },
    deleteNote(index, row) {
      this.$confirm("确认删除此条便签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.tableData = this.tableData.filter(data => row.id != data.id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  store
};
</script>

<style scoped>
.batchDelete-note {
  margin-bottom: 1rem;
  float: left;
  font-size: 0.8rem;
}
.add-note {
  margin-bottom: 1rem;
  float: right;
  font-size: 0.8rem;
}
</style>