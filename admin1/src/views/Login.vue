<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      class="container"
      :rules="rules"
    >
      <el-form-item>
        <div class="avatar">
          <img
            src="../assets/0.jpg"
            alt=""
          >
        </div>
      </el-form-item>

      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="账户"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          prefix-icon="el-icon-search"
          type="password"
          @keydown.native.enter="submitForm('form')"
        ></el-input>
          <!-- enter绑定在登录按钮不会生效 -->
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click="submitForm('form')"
        >登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { checkUser } from "@/api";
export default {
  data: () => ({
    form: {
      username: "",
      password: ""
    },
    rules: {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 12, message: "", trigger: "blur" }
      ]
    }
  }),
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          checkUser(this.form).then(res => {
            if (res.meta.status === 200) {
              //跳转首页
              this.$router.push({ name: "Home" });
              //保存token
              localStorage.setItem('mytoken',res.data.token)
              // 将username保存到Vuex的state中
              this.$store.commit('setUsername',res.data.username)
            } else {
              this.$Message({
                type:'error',
                message:res.meta.msg
              })
            }
          });
        } else {
          // this.$Message.error("登陆验证失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%; // background: linear-gradient(#e6dad9  10%,rgb(245,212,217) 40%,skyblue 100%);
  background: #2f4050;
  .ivu-form-inline .ivu-form-item {
    display: block;
    text-align: center;
    button {
      width: 6rem;
    }
  }
  .ivu-icon {
    font-size: 20px;
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto; // background: rgba(255,255,255,.5);
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
