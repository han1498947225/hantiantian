
<template>
  <div>
    <div class="box">
      <p>
        <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="" /><span
          >梦学谷会员管理系统</span
        >
      </p>
      <!-- 下拉 -->
      <el-dropdown style="color: #fff">
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- 修改密码 -->
          <el-dropdown-item
            ><p><i class="el-icon-edit"></i>修改密码</p></el-dropdown-item
          >
          <!-- 退出登录 -->
          <el-dropdown-item
            ><p @click="logout">
              <i class="el-icon-s-fold"></i>退出登录
            </p></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
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
  methods: {
    // 退出登录
    logout() {
      console.log(1);
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
<style scoped lang='scss'>
.box {
  display: flex;
  justify-content: space-between;
  p {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      margin: 0 10px 0 0;
    }
  }
}
</style>
