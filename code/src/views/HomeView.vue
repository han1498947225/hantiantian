
<template>
  <div class="context">
    <div class="box">
      <h2>用户登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 名称 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            style="background-color: #283443"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-opportunity"
            style="background-color: #283443"
            v-model="ruleForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from "../utils/requery";
export default {
  name: "",
  components: {},
  data() {
    return {
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
      },
      // 正则验证
      rules: {
        username: [
          { required: true, message: "用户名为必填项", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // 登录接口
          // http.post('/sys/login',{
          //   username:this.username,
          //   password:this.password
          // }).then(res=>{
          //   console.log(res);
          // })
          this.$router.push("/about")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang='scss'>
.context {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #313848;
}
.box {
  text-align: center;
  h2 {
    color: white;
    margin: 40px 0;
  }
  width: 500px;
  margin: 100px auto;
}
</style>
