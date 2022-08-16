
<template>
  <div>
    <div class="box">
      <img src="/logo.png" alt="" />
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#2b4ac7"
        text-color="#ccc"
        active-text-color="#fff"
        style="width:100%;"
      >
        <el-menu-item index="1" style="margin-left: 20px"
          ><i class="el-icon-user-solid" />用户</el-menu-item
        >
        <el-menu-item index="2"
          ><i class="el-icon-s-opportunity" />教学</el-menu-item
        >
        <el-menu-item index="3"
          ><i class="el-icon-s-order" />题库</el-menu-item
        >
        <el-menu-item index="4"
          ><i class="el-icon-s-marketing" />运营</el-menu-item
        >
        <el-menu-item index="10"
          ><i class="el-icon-menu" />营销</el-menu-item
        >
        <el-menu-item index="5"
          ><i class="el-icon-s-shop" />商品</el-menu-item
        >
        <el-menu-item index="6"
          ><i class="el-icon-user-solid" />财务</el-menu-item
        >
        <el-menu-item index="7"
          ><i class="el-icon-s-data" />统计</el-menu-item
        >
        <el-menu-item index="8"
          ><i class="el-icon-s-tools" />系统</el-menu-item
        >
        <el-submenu index="9" class="to">
          <template slot="title"><img src="/to.png" alt="" /></template>
        </el-submenu>
      </el-menu>
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
.box {
  position: relative;
  display: flex;
  .to {
    position: absolute;
    top: 0;
    right: 100px;
  }
}
</style>
