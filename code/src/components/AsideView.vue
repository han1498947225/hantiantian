
<template>
  <div>
    <!-- 用户信息 -->
    <div class="top">
      <img
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
      />
      <span>imooc-admin</span>
    </div>
    <!-- 侧边栏 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/personal">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="/personal">
        <i class="el-icon-s-data"></i>
        <span slot="title">数据可视化</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">员工管理</el-menu-item>
          <el-menu-item index="1-2">角色列表</el-menu-item>
          <el-menu-item index="1-3">权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文章</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">文章排名</el-menu-item>
          <el-menu-item index="1-2">创建文章</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.top {
  padding: 10px;
  display: flex;
  height: 60px;
  align-items: center;
  img {
    width: 40px;
    margin-right: 10px;
  }
}
</style>
