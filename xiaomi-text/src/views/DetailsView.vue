
<template>
  <div>
    <div class="content" v-for="(item, index) in codedata" :key="index">
      <div class="top">
        <p>{{ item.product_name }}</p>
        <p>
          <span>概述</span>
          <span>参数</span>
          <span>用户评价</span>
        </p>
      </div>
      <div class="box">
        <div class="img-box">
          <img :src="item.product_picture" alt="" />
        </div>
        <div class="item">
          <div class="item-top">
            <p>{{ item.product_name }}</p>
            <p>{{ item.product_title }}</p>
            <p>小米自营</p>
            <p>{{ item.product_selling_price }}元</p>
          </div>
          <div class="shopping">
            <p>
              <span>{{ item.product_name }}</span
              ><span>{{ item.product_selling_price }}元</span>
            </p>
            <p>总计:{{ item.product_selling_price }}元</p>
            <p>
              <el-button
                type="warning"
                style="width: 330px"
                @click="addcart(item)"
                >加入购物车</el-button
              >
              <el-button type="info" style="width: 280px" @click="love(item)"
                >喜欢</el-button
              >
            </p>
            <p>
              <span><i class="el-icon-circle-check">小米自营</i></span>
              <span><i class="el-icon-circle-check">小米发货</i></span>
              <span><i class="el-icon-circle-check">7天无理由退货</i></span>
              <span><i class="el-icon-circle-check">7天价格保护</i></span>
            </p>
          </div>
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
      // 详情列表
      codedata: [],
    };
  },
  created() {
    //   请求详情数据
    axios
      .post("product/getDetails", {
        productID: this.$route.params.id,
      })
      .then((res) => {
        // console.log(res.data.Product);
        this.codedata = res.data.Product;
      });
  },
  mounted() {},
  methods: {
    // 喜欢
    love(val) {
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
      axios
        .post("user/collect/addCollect", {
          product_id: val.product_id,
          user_id: user.user_id,
        })
        .then((res) => {
          if (res.data.code == "001") {
            this.$notify({
              title: "成功",
              message: "添加收藏成功",
              type: "success",
            });
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning",
            });
          }
        });
    },
    // 添加购物车
    addcart(val) {
      const user = JSON.parse(localStorage.getItem("user"));
      axios
        .post("user/shoppingCart/addShoppingCart", {
          product_id: val.product_id,
          user_id: user.user_id,
        })
        .then((res) => {
          // 获取购物车所有的数据
          axios
            .post("user/shoppingCart/getShoppingCart", {
              user_id: user.user_id,
            })
            .then((res) => {
              // console.log(res.data.shoppingCartData);
              this.$store.commit("addshopping", res.data.shoppingCartData);
            });
          if (res.data.code == "001") {
            this.$notify({
              title: "成功",
              message: "添加购物车成功",
              type: "success",
            });
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning",
            });
          }
        });
    },
  },
};
</script>
<style scoped lang='scss'>
.content {
  .top {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    border-bottom: 3px solid #ddd;
    span {
      margin: 0 10px;
    }
  }
  .box {
    display: flex;
    .img-box {
      width: 40%;
      padding: 20px;
      img {
        width: 100%;
      }
    }
    .item {
      width: 60%;
      .item-top {
        border-bottom: 2px solid #ccc;
        p {
          margin: 10px 0;
        }
        p:nth-child(1) {
          font-size: 25px;
        }
        p:nth-child(2) {
          color: #999;
        }
        p:nth-child(3) {
          color: #ff6700;
        }
        p:nth-child(4) {
          color: #ff6700;
        }
      }
      .shopping {
        padding: 20px;
        p {
          margin: 20px 0;
          span {
            margin: 0 10px;
          }
        }
        p:nth-child(1) {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
