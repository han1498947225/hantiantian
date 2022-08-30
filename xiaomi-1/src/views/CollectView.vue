
<template>
  <div>
    <!-- 头部 -->
    <p class="title">
      <span class="el-icon-collection-tag"></span>
      我的收藏
    </p>
    <!-- 我的收藏 -->
    <div class="right">
      <div class="item" v-for="(item, index) in arr" :key="index">
        <div
          @click="
            $router.push({ name: 'details', params: { id: item.product_id } })
          "
        >
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
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @confirm="del(item.product_id)"
        >
          <div class="del" slot="reference">×</div>
        </el-popconfirm>
      </div>
    </div>
    <!-- 为空 -->
    <div class="content" v-show="arr.length==0">
      <div class="collect-empty">
        <img src="http://101.132.181.9/img/cart-empty.8b316431.png" alt="">
        <div class="empty">
          <h1>您的收藏还是空的！</h1>
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
      arr: [],
      visible: false,
    };
  },
  created() {
    this.getdata();
  },
  mounted() {},
  methods: {
    getdata() {
      // 请求收藏数据
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post("user/collect/getCollect", {
          user_id: user.user_id,
        })
        .then((res) => {
          // console.log(res.data.collectList);
          this.arr = res.data.collectList;
        });
    },
    // 删除
    del(product_id) {
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post("user/collect/deleteCollect", {
          user_id: user.user_id,
          product_id: product_id,
        })
        .then((res) => {
          console.log(res);
          this.getdata();
          this.$notify({
            title: "成功",
            message: "删除收藏成功",
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
    img{
      margin: 80px 10px 140px 100px;
    }
    .empty {
    height: 300px;
    margin: 200px 0 0 200px;
    color: #b0b0b0;
    overflow: hidden;
    p{
      margin: 10px 0;
    }
  }
  }
}
.title {
  font-size: 26px;
  .el-icon-collection-tag {
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
.right {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  .item {
    position: relative;
    width: 25%;
    padding: 10px;
    .del {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 18px;
    }
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
