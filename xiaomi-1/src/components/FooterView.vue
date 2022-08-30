
<template>
  <div>
    <div class="footer-box">
      <img src="/footer.png" alt="" />
      <p>
        <span>首页</span>
        &emsp;|&emsp;
        <span>全部商品</span>
        &emsp;|&emsp;
        <span>关于我们</span>
      </p>
      <p>商城版权所有 @ 2012-2021</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.footer-box {
  padding: 0 0 20px 0;
  background-color: #2f2f2f;
  img {
    width: 100%;
  }
  p {
    text-align: center;
    margin: 10px 0;
    color: #999;
  }
}
</style>
