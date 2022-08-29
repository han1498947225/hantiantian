
<template>
  <div>
    <p class="title">供应商管理</p>
    <p style="margin: 20px 0">
      <el-input
        v-model="name"
        placeholder="供应商名称"
        class="input"
      ></el-input>
      <el-input v-model="linkman" placeholder="联系人" class="input"></el-input>
      <el-input
        v-model="mobile"
        placeholder="联系电话"
        class="input"
      ></el-input>
      <!-- 按钮 -->
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="dialogFormVisible = trueemit = true"
        >新增</el-button
      >
      <el-button @click="clear">重置</el-button>
    </p>
    <!-- 表格 -->
    <el-table
      :data="tableData.slice((page - 1) * pagesize, page * pagesize)"
      border
      style="width: 100%"
      height="520"
    >
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="100">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog title="会员添加" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form">
        <el-form-item label="供应商名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.linkman" autocomplete="off"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="form.remark"
            autocomplete="off"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "../utils/requery";
export default {
  name: "",
  components: {},
  data() {
    return {
      emit: false,
      tableData: [],
      page: 1,
      pagesize: 10,
      name: "",
      linkman: "",
      mobile: "",
      dialogFormVisible: false,
      form: {
        id: null,
        linkman: "", // 供应商名称 必填
        mobile: "", // 联系人 必填
        name: "", // 联系电话
        remark: "", // 备注
      },
      formLabelWidth: "80px",
      id: "",
    };
  },
  created() {
    this.getdata();
  },
  mounted() {},
  methods: {
    // 添加
    add() {
      this.dialogFormVisible = false;
      if (this.emit == false) {
        http.post("/supplier", this.form).then((res) => {
          console.log(res);
          this.getdata();
        });
      } else {
        http.put(`/supplier/${this.id}`, this.form).then((res) => {
          console.log(res);
          this.getdata();
        });
      }
    },
    // 重置
    clear() {
      this.name = "";
      this.linkman = "";
      this.mobile = "";
      this.getdata();
    },
    // 搜索
    search() {
      http
        .post("/supplier/list/search/1/10", {
          name: this.name,
          linkman: this.linkman,
          mobile: this.mobile,
        })
        .then((res) => {
          // console.log(res.data.rows);
          this.tableData = res.data.rows;
        });
    },
    // 获取数据
    getdata() {
      http
        .post("/supplier/list/search/1/10", {
          name: this.name,
          linkman: this.linkman,
          mobile: this.mobile,
        })
        .then((res) => {
          console.log(res.data.rows);
          this.tableData = res.data.rows;
        });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
    },
    // 编辑回填
    handleEdit(index, row) {
      console.log(index, row);
      this.emit = true;
      this.id = row.id;
      console.log(this.id);
      this.dialogFormVisible = true;
      if (this.emit == true) {
        this.form.name = row.name;
        this.form.linkman = row.linkman;
        this.form.mobile = row.mobile;
        this.form.remark = row.remark;
      }
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http.delete(`/supplier/${row.id}`).then((res) => {
            // console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getdata();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped lang='scss'>
.title {
  border-left: 3px solid #31c17b;
  padding: 0 0 0 10px;
}
.input {
  width: 200px;
  margin-right: 10px;
}
</style>
