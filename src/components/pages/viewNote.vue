<template>
  <div>
    <transition name="el-zoom-in-top">
      <el-button v-if="selectedIDs.length>1" type="danger" class="batchDelete-note" @click="isBatchDeleteNode">批量删除</el-button>
    </transition>
    <el-button type="primary" class="add-note" @click="editNote(null,null)">添加笔记</el-button>
    <el-table :data="tableData" border style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">>
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="200" align="center">
      </el-table-column>
      <el-table-column prop="content" label="内容概览" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="modifyTime" label="最后修改时间" align="center" width="150">
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="editNote(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="isDeleteNote(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePreChange" @next-click="handleNextChange" :current-page="currentPage" :page-sizes="pageSizeList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import axios from "Axios";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Note",
  data() {
    return {
      selectedIDs: [],
      currentPage: 1,
      pageSize: 10,
      pageSizeList: [10, 20, 30, 40, 50, 60],
      totalCount: 0
    };
  },
  created() {
    this.listTableData();
  },
  computed: mapState({
    tableData: state => state.tableData
  }),
  methods: {
    ...mapMutations(["changeTable"]),
    listTableData() {
      axios({
        method: "post",
        url: "/note/getNote",
        data: {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .then(response => {
          if (Object.is(response.data.statu, "success")) {
            this.totalCount = response.data.data.totalCount;
            let tableData = response.data.data.data;
            this.changeTable(tableData);
          } else {
            this.$message({
              message: response.data.msg,
              type: "error",
              center: true
            });
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "查询错误",
            type: "error",
            center: true
          });
          return false;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.listTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listTableData();
    },
    handlePreChange(val) {
      this.currentPage = val;
      this.listTableData();
    },
    handleNextChange(val) {
      this.currentPage = val;
      this.listTableData();
    },
    handleSelectionChange(val) {
      let ids = [];
      val.map(item => {
        ids.push(item);
      });
      this.selectedIDs = ids;
    },
    isBatchDeleteNode() {
      this.$confirm("确认删除所有选中的便签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.batchDeleteNode();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true
          });
        });
    },
    batchDeleteNode() {
      let noteIds = [];
      this.selectedIDs.map(item => {
        let id = {
          noteId: item.noteId,
          userName: item.userName,
          title: item.title,
          content: item.content,
          createTime: item.createTime,
          modifyTime: item.modifyTime,
          important: item.important
        };
        noteIds.push(id);
      });
      axios({
        method: "post",
        url: "/note/batchDeleteNote",
        data: noteIds
      })
        .then(response => {
          if (Object.is(response.data.statu, "success")) {
            this.$message({
              message: response.data.msg,
              type: "success",
              center: true
            });
            this.listTableData();
          } else {
            this.$message({
              message: response.data.msg,
              type: "error",
              center: true
            });
            this.listTableData();
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "删除错误",
            type: "error",
            center: true
          });
          this.listTableData();
          return false;
        });
    },
    editNote(index, row) {
      if (index == null) {
        this.$router.push("/note/editNote/addNote");
      } else {
        this.$router.push(`/note/editNote/${row.noteId}`);
      }
    },
    isDeleteNote(index, row) {
      this.$confirm("确认删除此条便签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.deleteNote(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true
          });
        });
    },
    deleteNote(row) {
      axios({
        method: "post",
        url: "/note/deleteNote",
        data: {
          noteId: row.noteId
        }
      })
        .then(response => {
          if (Object.is(response.data.statu, "success")) {
            this.$message({
              message: response.data.msg,
              type: "success",
              center: true
            });
            this.listTableData();
          } else {
            this.$message({
              message: response.data.msg,
              type: "error",
              center: true
            });
            this.listTableData();
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "删除错误",
            type: "error",
            center: true
          });
          this.listTableData();
          return false;
        });
    }
  }
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
.el-pagination {
  float: right;
  margin-top: 1rem;
}
</style>