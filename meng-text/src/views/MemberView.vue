
<template>
  <div>
    <p class="title">会员管理</p>
    <p style="margin: 20px 0">
      <el-input
        v-model="cardNuminput"
        placeholder="会员卡号"
        class="input"
      ></el-input>
      <el-input
        v-model="nameinput"
        placeholder="会员名称"
        class="input"
      ></el-input>
      <!-- 下拉 -->
      <el-select
        v-model="payTypevalue"
        placeholder="支付类型"
        style="width: 100px; margin-right: 10px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 日期 -->
      <el-date-picker
        v-model="birthdayvalue"
        type="date"
        placeholder="选择日期"
        class="input"
      >
      </el-date-picker>
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
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名" width="100">
      </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="cardNum" label="手机号码"> </el-table-column>
      <el-table-column prop="integral" label="可用积分" width="80">
      </el-table-column>
      <el-table-column prop="money" label="开卡金额" width="80">
      </el-table-column>
      <el-table-column prop="payType" label="支付类型" width="80">
      </el-table-column>
      <el-table-column prop="address" label="会员地址"> </el-table-column>
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
        <el-form-item label="会员卡号" :label-width="formLabelWidth">
          <el-input v-model="form.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="会员生日"
            class="input"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" :label-width="formLabelWidth">
          <el-input v-model="form.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" :label-width="formLabelWidth">
          <el-input v-model="form.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" :label-width="formLabelWidth">
          <el-select v-model="form.payType" placeholder="支付类型">
            <el-option label="现金支付" value="1"></el-option>
            <el-option label="微信支付" value="2"></el-option>
            <el-option label="支付宝支付" value="3"></el-option>
            <el-option label="银行卡支付" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" :label-width="formLabelWidth">
          <el-input
            v-model="form.address"
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
      options: [
        {
          value: "1",
          label: "现金支付",
        },
        {
          value: "2",
          label: "微信支付",
        },
        {
          value: "3",
          label: "支付宝支付",
        },
        {
          value: "4",
          label: "银行卡支付",
        },
      ],
      cardNuminput: "",
      payTypevalue: "",
      nameinput: "",
      birthdayvalue: "",
      dialogFormVisible: false,
      form: {
        address: "", // 地址
        birthday: "", // 会员生日 必填
        cardNum: "", // 会员卡号 必填
        integral: "", // 可用积分
        money: "", // 开卡金额
        name: "", // 会员姓名
        payType: "", // 支付类型	必填
        phone: "", // 电话
      },
      formLabelWidth: "80px",
      id:''
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
        http
          .post("/member", this.form)
          .then((res) => {
            console.log(res);
            this.getdata();
          });
      } else {
        http
          .put(`/member/${this.id}`,this.form)
          .then((res) => {
            console.log(res);
            this.getdata();
          });
      }
    },
    // 重置
    clear() {
      this.cardNuminput = "";
      this.payTypevalue = "";
      this.nameinput = "";
      this.birthdayvalue = "";
      this.getdata();
    },
    // 搜索
    search() {
      console.log(
        this.cardNuminput,
        this.payTypevalue,
        this.nameinput,
        this.birthdayvalue
      );
      http
        .post("/member/list/search/1/20", {
          cardNum: this.cardNuminput,
          name: this.nameinput,
          payType: this.payTypevalue,
          birthday: this.birthdayvalue,
        })
        .then((res) => {
          // console.log(res.data.rows);
          this.tableData = res.data.rows;
        });
    },
    // 获取数据
    getdata() {
      http
        .post("/member/list/search/1/20", {
          cardNum: "",
          name: "",
          payType: "",
          birthday: "",
        })
        .then((res) => {
          // console.log(res.data.rows);
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
      this.id=row.id
      console.log(this.id);
      this.dialogFormVisible = true;
      if (this.emit == true) {
        this.form.address = row.address;
        this.form.birthday = row.birthday;
        this.form.cardNum = row.cardNum;
        this.form.integral = row.integral;
        this.form.money = row.money;
        this.form.name = row.name;
        this.form.payType = row.payType;
        this.form.phone = row.phone;
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
          http.delete(`/member/${row.id}`).then((res) => {
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
