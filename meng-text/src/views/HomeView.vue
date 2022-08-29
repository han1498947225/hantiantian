
<template>
  <div class="box">
    <div class="login-box">
      <h2>梦学谷会员管理系统</h2>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"  style="float: left;"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from "../utils/requery"
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
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
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
          http.post("/user/login",{
            username: this.username, password: this.password
          }).then(res=>{
            // console.log(res);
            if(res.code==2000){
              localStorage.setItem('token',this.username)
              this.$router.push('/about')
            }
          })
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
.box {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-image: url(http://vue.mengxuegu.com/img/login.b665435f.jpg);
  background-size: 135% 140%;
}
.login-box {
  width: 420px;
  margin: 160px auto;
  background-color: hsla(0, 0%, 100%, 0.8);
  padding: 28px;
  border-radius: 20px;
  text-align: center;
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
}
</style>
