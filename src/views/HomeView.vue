
<template>
  <div>
    <el-container>
      <el-header>
        <!-- 头部组件 -->
        <nav-view></nav-view>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <el-menu
            default-active="/student"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item index="/student">
              <span slot="title">学员管理</span>
            </el-menu-item>
            <el-menu-item index="/lecturer">
              <span slot="title">讲师管理</span>
            </el-menu-item>
            <el-menu-item index="/assistant">
              <span slot="title">助教管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navView from "../components/NavView.vue";
export default {
  name: "",
  components: {
    navView,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.el-header,
.el-footer {
  background-color: #2c4ac8;
  color: #fff;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: calc(100vh - 60px);
  border-right: 1px solid #ccc;
}

.el-main {
  background-color: #fff;
  color: #333;
}
</style>
