
<template>
  <div>
    <!-- 头部 -->
    <p class="title">
      <span class="el-icon-s-order"></span>
      我的订单
    </p>
    <!-- 订单 -->
    <div class="box" v-for="(item, index) in arr" :key="index" v-show="arr.length!=0">
      <div class="top">
        <span style="color: #ff6700">订单编号：{{ item[0].order_id }}</span>
        <span
          >订单时间：{{ new Date(item[0].order_time).toLocaleString() }}</span
        >
      </div>
      <ul class="title-ul">
        <li>商品名称</li>
        <li>单价</li>
        <li>数量</li>
        <li>小计</li>
      </ul>
      <ul class="cart-box" v-for="(obj, i) in item" :key="i">
        <li><img :src="obj.product_picture" alt="" />{{ obj.product_name }}</li>
        <li>{{ obj.product_price }}元</li>
        <li>{{ obj.product_num }}</li>
        <li style="color: #ff6700">
          {{ obj.product_price * obj.product_num }}元
        </li>
      </ul>
      <div class="footer">
        <p>
          共<span>{{ arr[index].length }}</span
          >件商品
        </p>
        <p style="color: #ff6700">
          合计：<span style="font-size: 26px">{{ total(index) }}元</span>
        </p>
      </div>
    </div>
    <!-- 为空 -->
    <div class="content" v-show="arr.length == 0">
      <div class="collect-empty">
        <img src="http://101.132.181.9/img/cart-empty.8b316431.png" alt="" />
        <div class="empty">
          <h1>您的订单还是空的！</h1>
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
      arr: "",
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : { user_id: "" };
    console.log(user);
    axios
      .post("user/order/getOrder", {
        user_id: user.user_id,
      })
      .then((res) => {
        console.log(res);
        this.arr = res.data.orders;
      });
  },
  mounted() {},
  methods: {
    // 总价
    total(index) {
      let num=0
      this.arr[index].forEach((item) => {
        num+=item.product_price * item.product_num 
      });
      return num
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
.box {
  background-color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 2px solid #ff6700;
  }
  .title-ul,
  .cart-box {
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ccc;
    li {
      position: relative;
      img {
        position: absolute;
        width: 60px;
        top: 10px;
        left: -80px;
      }
    }
  }
  .footer {
    border-top: 2px solid #ff6700;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
}
.title {
  font-size: 26px;
  .el-icon-s-order {
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
