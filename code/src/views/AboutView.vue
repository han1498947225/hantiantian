
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边组件 -->
        <aside-view></aside-view
      ></el-aside>
      <el-container>
        <el-header>
          <p>
            <span class="el-icon-s-fold" style="margin-right: 10px"></span
            ><span>个人中心</span>
          </p>
          <p>
            <span class="el-icon-collection-tag"></span>
            <span class="el-icon-search"></span>
            <span class="el-icon-full-screen"></span>
            <img
              src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
              alt=""
            />
          </p>
        </el-header>
        <el-main>
          <!-- 路由容器 -->
          <router-view></router-view
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideView from "../components/AsideView.vue";
export default {
  name: "",
  components: {
    asideView,
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
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  p {
    display: flex;
    align-items: center;
    span {
      margin: 0 8px;
    }
    img {
      width: 30px;
      margin: 0 8px;
    }
  }
}
.el-aside {
  background-color: #304156;
  color: #fff;
  line-height: 200px;
  height: 100vh;
}

.el-main {
  height: calc(100vh - 60px);
  background-color: #eee;
  color: #333;
}
</style>
