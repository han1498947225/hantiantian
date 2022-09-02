
<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <ul>
        <li>
          <!-- 登录 -->
          <p v-if="!token">
            <span @click="loginbox">登录</span> |
            <span @click="postdialogVisible = true">注册</span>
          </p>
          <p v-else>
            欢迎
            <el-popover placement="top" width="160" v-model="visible">
              <p>确定退出登录吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false"
                  >取消</el-button
                >
                <el-button type="primary" size="mini" @click="tologin"
                  >确定</el-button
                >
              </div>
              <span slot="reference">{{ user.userName }}</span>
            </el-popover>
          </p>
        </li>
        <li @click="token ? $router.push('/order') : (dialogVisible = true)">
          我的订单
        </li>
        <li @click="token ? $router.push('/collect') : (dialogVisible = true)">
          我的收藏
        </li>
        <li
          :class="{ actives: $store.getters.num != 0 }"
          @click="token ? $router.push('/shopping') : (dialogVisible = true)"
        >
          <span class="el-icon-shopping-cart-2"></span>购物车({{
            $store.getters.num
          }})
        </li>
      </ul>
    </div>
    <!-- 主体 -->
    <div class="box">
      <!-- 照片 -->
      <img
        src="http://101.132.181.9/img/logo.c8999c02.png"
        alt=""
        class="box-img"
      />
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入搜索内容"
        v-model="search"
        class="input-with-select box-input"
        style="width: 250px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- tab切换 -->
      <ul class="router-ui">
        <li
          v-for="(item, index) in routerlist"
          :key="index"
          @click="totab(index)"
          :class="{ active: i == index }"
        >
          {{ item }}
        </li>
      </ul>
      <!-- 路由容器 -->
      <router-view></router-view>
    </div>
    <!-- 注册对话框 -->
    <el-dialog
      title="注册"
      :visible.sync="postdialogVisible"
      width="20%"
      center
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="ruleForm.userName"
            placeholder="请输入账号"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            prefix-icon="el-icon-view"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords">
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-view"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="submitForm('ruleForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 登录对话框 -->
    <el-dialog title="登录" :visible.sync="dialogVisible" width="20%" center>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入账号"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-view"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 底部组件 -->
    <Footer-View></Footer-View>
  </div>
</template>

<script>
import FooterView from "../components/FooterView.vue";
import axios from "axios";
export default {
  name: "",
  components: {
    FooterView,
  },
  data() {
    // 判断正则
    var checkAge = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          let RegName = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
          if (RegName.test(value) == false) {
            callback(new Error("字母开头,允许5-16字节,允许字母数字下划线"));
          }
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // token
      token: localStorage.getItem("user"),
      // 注册
      ruleForm: {
        userName: "",
        password: "",
        passwords: "",
      },
      rules: {
        userName: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwords: [{ validator: validatePass2, trigger: "blur" }],
      },
      // 登录
      form: {
        userName: "",
        password: "",
      },
      // 登录对话框
      dialogVisible: false,
      postdialogVisible: false,
      // 搜索
      search: "",
      // 退出登录状态
      visible: false,
      // tab列表
      routerlist: ["首页", "全部商品", "关于我们"],
      i: 0,
      user: {},
    };
  },
  created() {
    this.getUser();
  },
  mounted() {},
  methods: {
    // 切换路由
    totab(index) {
      this.i = index;
      if (index == 0) {
        this.$router.push("/about");
      } else if (index == 1) {
        this.$router.push("/whole");
      } else {
        this.$router.push("/me");
      }
    },
    // 退出登录
    tologin() {
      localStorage.clear();
      this.getUser();
      this.visible = false;
      this.token = localStorage.getItem("token");
      this.$notify({
        title: "成功",
        message: "成功退出登录",
        type: "success",
      });
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : { userName: "", user_id: "" };
    },
    // 注册
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("users/register", this.ruleForm).then((res) => {
            console.log(res);
            if (res.data.code == "001") {
              this.getUser();
              this.$notify({
                title: "成功",
                message: "注册成功",
                type: "success",
              });
              this.postdialogVisible = false;
            } else {
              this.$notify.error({
                title: "错误",
                message: "注册失败",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 弹出登录框
    loginbox() {
      this.dialogVisible = true;
    },
    // 登录对话框
    onSubmit() {
      axios.post("users/login", this.form).then((res) => {
        console.log(res);
        if (res.data.code == "001") {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          this.getUser();
          this.$notify({
            title: "成功",
            message: "登录成功",
            type: "success",
          });
          // 获取购物车所有的数据
          const user = JSON.parse(localStorage.getItem("user"));
          axios
            .post("user/shoppingCart/getShoppingCart", {
              user_id: user.user_id,
            })
            .then((res) => {
              // console.log(res.data.shoppingCartData);
              this.$store.commit("addshopping", res.data.shoppingCartData);
            });
        } else {
          this.$notify.error({
            title: "错误",
            message: "用户名或密码不正确",
          });
        }
        this.dialogVisible = false;
      });
    },
  },
};
</script>
<style scoped lang='scss'>
.actives {
  background-color: #ff6700;
  color: white;
}
.active {
  color: #51a4ff;
  border-bottom: 2px solid #51a4ff;
}
.router-ui {
  height: 80px;
  margin: 10px 0;
  li {
    text-align: center;
    float: left;
    width: 150px;
    height: 80px;
    line-height: 80px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.box {
  position: relative;
  width: 1100px;
  margin: 0 auto;
  .box-img {
    width: 150px;
    position: absolute;
    top: 20px;
    left: -170px;
  }
  .box-input {
    position: absolute;
    top: 30px;
    right: -100px;
  }
}
.top {
  height: 50px;
  line-height: 50px;
  background-color: #3d3d3d;
  color: white;
  ul {
    float: right;
    padding-right: 100px;
    li {
      float: left;
      padding: 0 10px;
    }
  }
}
</style>
