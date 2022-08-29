
<template>
  <div>
    <!-- 标题 -->
    <p class="title">
      <span class="el-icon-shopping-cart-full"></span>
      我的购物车
      <span class="title-span"
        >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span
      >
    </p>
    <div class="box" v-show="tableData.length != 0">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="productTmg">
          <template slot-scope="scope">
            <img :src="scope.row.productImg" alt="" style="width: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称"> </el-table-column>
        <el-table-column prop="price" label="单价" width="55">
        </el-table-column>
        <el-table-column prop="num" label="数量">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.num"
              @change="handleChange(scope.row)"
              :min="1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计" align="center">
          <template slot-scope="scope">
            <span style="color: #ff6700"
              >{{ scope.row.num * scope.row.price }}元</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="55">
          <template slot-scope="scope">
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <div class="del" slot="reference">×</div>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 尾部 -->
      <div class="footer">
        <p>继续购物</p>
        <p>
          共<span>{{tablenum}}</span
          >件商品，已选择<span>{{ num }}</span
          >件
        </p>
        <p>合计：<span style="font-size: 26px">{{ pricenum }}元</span></p>
        <p
          class="settlement"
          :style="
            multipleSelection != 0
              ? 'background-color: #f25807;color:#fff;'
              : ''
          "
          @click="addorder"
        >
          去结算
        </p>
      </div>
    </div>
    <!-- 为空 -->
    <div class="content" v-show="tableData.length == 0">
      <div class="collect-empty">
        <img src="http://101.132.181.9/img/cart-empty.8b316431.png" alt="" />
        <div class="empty">
          <h1>您的购物车还是空的！</h1>
          <p>快去购物吧！</p>
        </div>
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
      multipleSelection: [],
      tableData: [],
    };
  },
  computed: {
    // 总件
    tablenum() {
      let tablenum = 0;
      this.tableData.forEach((item) => (tablenum += item.num));
      return tablenum;
    },
    // 选中的件
    num() {
      let num = 0;
      this.multipleSelection.forEach((item) => (num += item.num));
      return num;
    },
    // 总价
    pricenum() {
      let pricenum = 0;
      this.multipleSelection.forEach((item) => (pricenum += item.num * item.price));
      return pricenum;
    },
  },
  created() {
    this.getdata();
  },
  mounted() {},
  methods: {
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 生成订单
    addorder() {
      this.$router.push("/addOrder");
    },
    getdata() {
      // 获取购物车数据
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post("user/shoppingCart/getShoppingCart", {
          user_id: user.user_id,
        })
        .then((res) => {
          console.log(res.data.shoppingCartData);
          this.tableData = res.data.shoppingCartData;
        });
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post("user/shoppingCart/deleteShoppingCart", {
          user_id: user.user_id,
          product_id: row.productID,
        })
        .then((res) => {
          this.getdata();
          // console.log(res);
          this.$notify({
            title: "成功",
            message: "删除购物车成功",
            type: "success",
          });
        });
    },
    // 计时器
    handleChange(row) {
      console.log(row);
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post("user/shoppingCart/updateShoppingCart", {
          product_id: row.productID,
          user_id: user.user_id,
          num: row.num,
        })
        .then((res) => {
          this.$notify({
            title: "成功",
            message: "修改数量成功",
            type: "success",
          });
        });
    },
  },
};
</script>
<style scoped lang='scss'>
.content {
  border: 0;
  list-style: none;
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
  .collect-empty {
    width: 1225px;
    margin: 0 auto;
    display: flex;
    img {
      margin: 80px 10px 140px 100px;
    }
    .empty {
      height: 300px;
      margin: 200px 0 0 200px;
      color: #b0b0b0;
      overflow: hidden;
      p {
        margin: 10px 0;
      }
    }
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  span {
    color: #ff6700;
  }
  .settlement {
    width: 250px;
    background-color: #e0e0e0;
    color: #888;
    text-align: center;
  }
}
.del {
  width: 16px;
  height: 16px;
  background-color: #333;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 15px;
  font-size: 12px;
}
.title {
  font-size: 26px;
  .el-icon-shopping-cart-full {
    color: #ff6700;
  }
  border-bottom: 3px solid #ff6700;
  .title-span {
    font-size: 12px;
    color: #999;
  }
  margin: 10px 0;
  padding: 10px 0;
}
</style>
