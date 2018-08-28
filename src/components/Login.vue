<template>
  <el-row :gutter="20">
    <el-col :span="6" :offset="9" class="LoginPage">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        account: "admin",
        checkPass: "123456"
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  mounted(){
     
  },
  methods: {
    handleSubmit(ev) {
      // this.$http.defaults.baseURL = "http://localhost:8090";
      //this.$router.push({path: "/home"});
      this.$router.push({
        path: this.$route.query.redirect || "/home"
      });

    }
  }
};
</script>

<style>
.LoginPage{
  margin-top: 10%;
  border: 1px solid #cccccc;
}
</style>
