
<template>
  <div class="box">
    <div class="left">
      <el-card class="box-card" style="margin: 0 10px">
        <div class="logo">
          <p>介绍(已升级element-plus正式版)</p>
          <img
            src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
            alt=""
          />
          <p>super-admin</p>
          <p>超级管理员</p>
        </div>
        <div>
          <p>项目介绍</p>
          <span
            >《vue3 改写
            vue-element-admin，实现后台前端综合解决方案》项目演示</span
          >
        </div>
        <div>
          <p>项目功能</p>
          <p>
            vue3+全家福
            <el-progress :percentage="100" status="success"></el-progress>
          </p>
          <p>
            element-plus
            <el-progress :percentage="100" status="success"></el-progress>
          </p>
          <p>
            vue-element-admin
            <el-progress :percentage="100" status="success"></el-progress>
          </p>
          <p>
            ESLint + Git Hooks
            <el-progress :percentage="100" status="success"></el-progress>
          </p>
          <p>
            架构设计
            <el-progress :percentage="100" status="success"></el-progress>
          </p>
          <p>
            权限验证（页面权限、功能权限、动态权限、权限配置）
            <el-progress :percentage="100" status="success"></el-progress>
          </p>
        </div>
      </el-card>
    </div>
    <div class="right">
      <template>
        <!-- 卡片 -->
        <el-tabs type="border-card">
          <el-tab-pane label="功能">
            <p>Vue3 + 全家桶</p>
            <p>Element-Plus</p>
            <p>vue-element-admin</p>
            <p>ESLint + Git Hooks</p>
            <p>架构设计</p>
            <p>权限验证（页面权限、功能权限、动态权限、权限配置）</p>
            <p>功能引导</p>
            <p>可配置 + 收缩侧边栏</p>
            <p>动态面包屑</p>
            <p>Tags View</p>
            <p>svg sprite 图标</p>
            <p>国际化</p>
            <p>动态换肤</p>
            <p>页面搜索</p>
          </el-tab-pane>
          <el-tab-pane label="章节">
            <el-timeline>
              <el-timeline-item timestamp="第一章" placement="top">
                <el-card>
                  <h4>课程导读</h4>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第二章" placement="top">
                <el-card>
                  <h4>标准化大厂编程规范解决方案之ESLint + Git Hooks</h4>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第三章" placement="top">
                <el-card>
                  <h4>项目架构解决方案之搭建登录基础架构</h4>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第四章" placement="top">
                <el-card>
                  <h4>项目架构解决方案之搭建Layout基础架构</h4>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-tab-pane>
          <el-tab-pane label="作者">
            <div class="user">
              <img
                src="https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg"
                alt=""
              />
              <div>
                <p>Sunday</p>
                <p>一个前端开发程序猿</p>
              </div>
            </div>
            <p>
              高级技术专家，曾就职于国内一线互联网公司，统筹过的多个大型项目用户数已过千万级。致力于研究大前端技术，多次受邀参加国内前端技术分享会，如：2018
              年 Google 中国技术分享会。
            </p>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import http from "../utils/requery";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    // this.getdata()
  },
  methods: {
    // getdata(){
    //   http.get('/user/feature').then(res=>{
    //     console.log(res);
    //   })
    // }
  },
};
</script>
<style scoped lang='scss'>
.user {
  display: flex;
  align-items: center;
}
.box {
  display: flex;
  .left {
    width: 25%;
    p {
      margin: 10px 0;
    }
    .logo {
      text-align: center;
      img {
        width: 50px;
        margin: 10px 0;
      }
    }
  }
  .right {
    width: 75%;
    background-color: #fff;
    p {
      margin: 20px 0;
    }
  }
}
</style>
