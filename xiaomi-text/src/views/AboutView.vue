
<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel indicator-position="outside" height="450px">
      <el-carousel-item v-for="item in bannerdata" :key="item">
        <img :src="item.imgPath" style="width: 100%;height:100%" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 手机 -->
    <p class="title"><span class="title-p">手机</span></p>
    <div class="homebox">
      <div class="left">
        <img
          src="http://101.132.181.9:3000/public/imgs/phone/phone.png"
          alt=""
        />
      </div>
      <div class="right">
        <div class="item" v-for="(item, index) in handsetdata" :key="index" 
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
        <div class="item">
          <h4>浏览更多 »</h4>
        </div>
      </div>
    </div>
    <!-- 家电 -->
    <div class="title">
      <p class="title-p">家电</p>
      <p class="cut">
        <span
          v-for="(item, index) in homelist"
          :key="index"
          @mouseenter="homehover(index)"
          :class="{ active: homeid == index }"
          >{{ item }}</span
        >
      </p>
    </div>
    <div class="homebox">
      <div class="left">
        <img
          src="	http://101.132.181.9:3000/public/imgs/appliance/appliance-promo1.png"
          alt=""
          class="img"
        />
        <img
          src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo2.png"
          alt=""
          class="img"
        />
      </div>
      <div class="right">
        <div
          class="item"
          v-for="(item, index) in homeid == 0 ? homedata : homesdata"
          :key="index"
           @click="$router.push({name:'details',params:{id:item.product_id}})"
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
        <div class="item">
          <h4>浏览更多 »</h4>
        </div>
      </div>
    </div>
    <!-- 配件 -->
    <div class="title">
      <p class="title-p">配件</p>
      <p class="cut">
        <span
          v-for="(item, index) in partslist"
          :key="index"
          @mouseenter="partshover(index)"
          :class="{ active: partsid == index }"
          >{{ item }}</span
        >
      </p>
    </div>
    <div class="homebox">
      <div class="left">
        <img
          src="	http://101.132.181.9:3000/public/imgs/accessory/accessory-promo1.png"
          alt=""
          class="img"
        />
        <img
          src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo2.png"
          alt=""
          class="img"
        />
      </div>
      <div class="right">
        <div
          class="item"
          v-for="(item, index) in partsid == 0
            ? partsdata
            : partsid == '1'
            ? parttdata
            : partcdata"
          :key="index"
           @click="$router.push({name:'details',params:{id:item.product_id}})"
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
        <div class="item">
          <h4>浏览更多 »</h4>
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
      // 轮播图
      bannerdata: [],
      // 手机
      handsetdata: [],
      // 家电
      homedata: [],
      homesdata: [],
      homelist: ["热门", "电视"],
      // 配件
      partsdata: [],
      parttdata: [],
      partcdata: [],
      partslist: ["热门", "保护套", "充电器"],
      // 滑过
      partsid: 0,
      homeid: 0,
    };
  },
  created() {
    // 手机
    axios
      .post("product/getPromoProduct", {
        categoryName: "手机",
      })
      .then((res) => {
        // console.log(res.data.Product);
        this.handsetdata = res.data.Product;
      });
    // 家电
    axios
      .post("product/getHotProduct", {
        categoryName: ["电视机", "空调", "洗衣机"],
      })
      .then((res) => {
        // console.log(res);
        this.homedata = res.data.Product;
      });
    // 配件
    axios
      .post("product/getHotProduct", {
        categoryName: ["保护套", "保护膜", "充电器", "充电宝"],
      })
      .then((res) => {
        // console.log(res);
        this.partsdata = res.data.Product;
      });
    // 轮播图
    axios.post("/resources/carousel").then((res) => {
      // console.log(res.data.carousel);
      this.bannerdata = res.data.carousel;
    });
  },
  mounted() {},
  methods: {
    // 滑过
    partshover(index) {
      this.partsid = index;
      // 保护套
      if (index == 1) {
        axios
          .post("product/getPromoProduct", {
            categoryName: "保护套",
          })
          .then((res) => {
            // console.log(res);
            this.parttdata = res.data.Product;
          });
      }
      // 充电器
      if (index == 2) {
        axios
          .post("product/getPromoProduct", {
            categoryName: "充电器",
          })
          .then((res) => {
            // console.log(res);
            this.partcdata = res.data.Product;
          });
      }
    },
    homehover(index) {
      this.homeid = index;
      // 电视
      if (index == 1) {
        axios
          .post("product/getPromoProduct", {
            categoryName: "电视机",
          })
          .then((res) => {
            // console.log(res);
            this.homesdata = res.data.Product;
          });
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.title {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .title-p {
    font-size: 26px;
  }
  .cut {
    span {
      margin: 0 10px;
    }
    .active {
      border-bottom: 2px solid rgb(255, 103, 0);
    }
  }
}
.homebox {
  margin: 10px 0;
  display: flex;
  .left {
    width: 680px;
    img {
      width: 100%;
    }
    .img {
      height: 50%;
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
}
</style>
