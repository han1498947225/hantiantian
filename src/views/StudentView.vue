
<template>
  <div>
    学员管理
    <p class="search-box">
      学员状态
      <el-select
        v-model="flagvalue"
        placeholder="请选择"
        clearable
        @change="flagchange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      学生名称
      <el-input
        v-model="nameinput"
        placeholder="请输入学生关键字"
        style="width: 220px"
        @input="namechange"
      ></el-input>
      手机号
      <el-input
        v-model="telinput"
        placeholder="请输入手机号"
        style="width: 220px"
        @input="telchange"
      ></el-input>
      <el-button style="margin-left: 10px" @click="search" class="el-icon-search">搜索</el-button>
      <el-button @click="clear" class="el-icon-refresh">重置</el-button>
    </p>
    <p class="search-box">
      <el-button type="primary">新增学员</el-button>
      <el-button type="primary">批量导入</el-button>
      <el-button type="primary">批量导出</el-button>
      <el-button type="primary">查看报表</el-button>
    </p>
    <!-- 表格 -->
    <el-table
      :data="tableData.slice((page - 1) * pagesize, page * pagesize)"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="nickname" label="学生名称">
        <template slot-scope="scope">
          <p class="img-box">
            <img :src="scope.row.avatar" alt="" />
            <span>{{ scope.row.nickname }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status == 1 ? "启用" : "禁用" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创造时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | timer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="text">详情</el-button>
          <el-button size="mini" type="text">编辑</el-button>
          <el-button size="mini" type="text">禁用</el-button>
          <el-button size="mini" type="text">删除</el-button>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      flag: null,
      options: [
        {
          value: "1",
          label: "启用",
        },
        {
          value: "0",
          label: "禁用",
        },
      ],
      flagvalue: "",
      nameinput: "",
      telinput: "",
      page: 1,
      pagesize: 5,
      tableData: [],
      arr: [],
    };
  },
  created() {
    this.getdata();
  },
  mounted() {},
  filters: {
    // 过滤时间
    timer(val) {
      return new Date(parseInt(val) * 1000).toLocaleString();
    },
  },
  methods: {
    // 搜索全部
    search() {
      console.log(this.flag);
      this.tableData = this.arr.filter(
        (item) =>
          item.nickname.includes(this.nameinput) &&
          item.mobile.includes(this.telinput) &&
          item.status == this.flag
      );
    },
    // 重置
    clear() {
      this.nameinput = "";
      this.telinput = "";
      this.flagvalue = "";
      this.getdata();
    },
    // 姓名搜索
    namechange() {
      this.tableData = this.arr.filter((item) =>
        item.nickname.includes(this.nameinput)
      );
    },
    // 手机号搜索
    telchange() {
      this.tableData = this.arr.filter((item) =>
        item.mobile.includes(this.telinput)
      );
    },
    // 状态搜索
    flagchange(e) {
      console.log(e);
      this.flag = e;
      this.tableData = this.arr.filter((item) => item.status == e);
    },
    // 获取数据
    getdata() {
      axios.get("/list.json").then((res) => {
        console.log(res.data);
        this.tableData = res.data;
        this.arr = res.data;
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
  },
};
</script>
<style scoped lang='scss'>
.search-box {
  margin: 10px 0;
}
.input {
  width: 220px;
}
.img-box {
  display: flex;
  align-items: center;
  img {
    width: 40px;
    margin-right: 5px;
  }
}
</style>
