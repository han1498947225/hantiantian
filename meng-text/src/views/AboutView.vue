
<template>
  <div>
    <el-container>
      <el-header>
        <!-- 头部组件 -->
        <top></top>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <left :page="page"></left>
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
import left from '../components/LeftView.vue'
import top from '../components/TopView.vue'
export default {
  name: "",
  components: {
    top,
    left
  },
  data() {
    return {
      page: this.$route.fullPath,
    };
  },
  created() {},
  mounted() {},
  methods: {
  },
};
</script>
<style scoped lang='scss'>
.el-header,
.el-footer {
  background-color: #2d3a4b;
  color: #fff;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #fff;
  height: calc(100vh - 60px);
}

.el-main {
  background-color: #fff;
  color: #333;
  height: calc(100vh - 60px);
}
</style>
