
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/about' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全部商品</el-breadcrumb-item>
      <el-breadcrumb-item>分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- tab页 -->
    <div class="box">
      <ul>
        <span>分类</span>
        <li :class="{ active: i == null }" @click="all">全部</li>
        <li
          v-for="(item, index) in tabdata"
          :key="index"
          @click="totab(index, item.category_id)"
          :class="{ active: i == index }"
        >
          {{ item.category_name }}
        </li>
      </ul>
      <div class="right">
        <div class="item" v-for="(item, index) in arr.slice((page-1)*pagesize,page*pagesize)" 
        :key="index"
         @click="$router.push({name:'details',params:{id:item.product_id}})">
          <img :src="item.product_picture" alt="" />
          <p class="p-name">{{ item.product_name }}</p>
          <p class="p-title">{{ item.product_title }}</p>
          <p>
            <span class="present">{{ item.product_selling_price }}元</span
            >&emsp;
            <span class="primary"
              ><s>{{ item.product_price }}元</s></span
            >
          </p>
        </div>
      </div>
      <div class="fen">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="arr.length"
      >
      </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      // tab数据
      tabdata: [],
      // 全部
      arr: [],
      // 高亮
      i: null,
      page:1,
      pagesize:8
    };
  },
  created() {
    // 请求tab
    axios.post("product/getCategory").then((res) => {
      this.tabdata = res.data.category;
    });
    this.getdata();
  },
  mounted() {},
  methods: {
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize=val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val
    },
    // 全部
    all() {
      this.i = null;
      this.getdata();
    },
    getdata() {
      // 请求全部
      axios.post("product/getAllProduct").then((res) => {
        console.log(res.data.Product);
        this.arr = res.data.Product;
      });
    },
    // 高亮
    totab(index, id) {
      this.i = index;
      axios
        .post("product/getProductByCategory", { categoryID: id })
        .then((res) => {
          // console.log(res);
          this.arr = res.data.Product;
        });
    },
  },
};
</script>
<style scoped lang='scss'>
.fen{
  width: 100%;
  text-align: center;
}
.active {
  color: #409eff;
}
.box {
  ul {
    margin: 10px 0;
    display: flex;
    span {
      margin-top: 14px;
      font-weight: 600;
    }
    li {
      width: 60px;
      text-align: center;
      line-height: 50px;
    }
  }
}
.right {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  .item {
    width: 25%;
    padding: 10px;
    img {
      width: 100%;
    }
    h4 {
      margin: 100px 0;
    }
    p {
      margin: 15px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .p-title {
      font-size: 12px;
      color: #bbb;
    }
    .present {
      color: #ff6700;
    }
    .primary {
      color: #bbb;
    }
  }
}
</style>
