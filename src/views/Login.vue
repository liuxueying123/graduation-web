<template>
  <div class="login">
    <div class="login-nav">
      <Nav></Nav>
    </div>
    <div class="login-inner">
      <div class="login-text">登录注册</div>

      <div class="login-phone">
        <img src="../assets/call.png" alt="" class="icon-style" />
        <input
          type="tel"
          placeholder="请输入手机号"
          :value="phoneNum"
          @input="handleInputPhone"
          maxlength="11"
          class="phone"
        />
        <img
          src="../assets/close.png"
          alt=""
          class="close-img"
          @click="clearPhone"
          v-show="isPhone"
        />
      </div>

      <div class="login-code">
        <img src="../assets/safe.png" alt="" class="icon-style" />
        <input
          type="tel"
          placeholder="请输入短信验证码"
          @input="handleInputCode"
          maxlength="6"
        />
        <input
          type="button"
          :value="codeText"
          class="getCode"
          @click="sendCode()"
          :disabled="isDisable"
        />
      </div>

      <div class="login-type">
        <el-radio-group v-model="type">
          <el-radio v-model="type" :label="0">管理员</el-radio>
          <el-radio v-model="type" :label="1">普通用户</el-radio>
        </el-radio-group>
      </div>

      <div class="login-agree">
        <input type="checkbox" @click="agreeItem" />
        <span>我已阅读并同意</span>
        <a href="https://m.zuche.com/help.do#/useragreement" class="a-style"
          >《服务协议》</a
        >
        <a href="https://m.zuche.com/help.do#/privacystatement" class="a-style"
          >《隐私条款》</a
        >
      </div>

      <div class="tips" v-show="showTips">请确认手机号或验证码是否正确</div>
      <div
        class="login-btn"
        :class="{ active: isPhone && isCode && isAgree }"
        @click="goHome"
      >
        登 录
      </div>
    </div>
  </div>
</template>
 

 <script>
import Nav from "../components/Nav.vue";
import { mapMutations, mapState } from "vuex";
import { get, post, host } from "../tools/request";
export default {
  name: "Login",
  components: {
    Nav,
  },
  data() {
    return {
      isPhone: false, //是否填写电话号码
      isCode: false, //是否填写验证码 默认为123456
      isAgree: false, // 是否同意协议
      phoneNum: "", //存储电话号码
      code: "", // 存储验证码
      showTips: false,
      codeText: "发送验证码",
      waitTime: 10, //验证码等待秒数
      isDisable: false,
      timer: null,
      type: 0, //登录类型  0为管理员  1为普通用户
      userList: [],
    };
  },
  computed: {
    ...mapState(["userId"]),
  },
  methods: {
    ...mapMutations(["setState"]),
    handleInputPhone(e) {
      if (e.target.value) {
        this.isPhone = true;
        this.phoneNum = e.target.value.replace(/[^\d]/g, "");
      } else {
        this.phoneNum = "";
        this.isPhone = false;
      }
    },
    handleInputCode(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      if (e.target.value) {
        this.code = e.target.value;
        this.isCode = true;
      } else {
        this.isCode = false;
      }
    },
    agreeItem() {
      if (this.isAgree) {
        this.isAgree = false;
      } else {
        this.isAgree = true;
      }
    },
    clearPhone() {
      this.phoneNum = "";
      this.isPhone = false;
    },
    goHome() {
      if (
        this.isPhone &&
        this.isCode &&
        this.isAgree &&
        this.code &&
        this.phoneNum.length === 11
      ) {
        let params = {
          phone: this.phoneNum,
          code: this.code,
          type: this.type,
        };
        get(`${host}/lxy/main/login`, params).then((res) => {
          if (res === true)
            if (this.type === 1) {
              window.localStorage.setItem("isLogin", "true");
              window.localStorage.setItem("phone", this.phoneNum);
              this.$router.replace("/");
              this.getUserId();
            } else {
              this.$router.replace("/place");
            }
        });
      } else {
        this.showTips = true;
      }
    },
    sendCode() {
      this.isDisable = true;
      if ((this.isDisable = true && this.phoneNum)) {
        get(`${host}/lxy/main/dysms`, { phone: this.phoneNum }).then((res) => {
          console.log(res);
        });
      }
      this.timer = setInterval(() => {
        this.waitTime--;
        this.codeText = `${this.waitTime}秒后重新发送`;
        if (this.waitTime < 0) {
          this.isDisable = false;
          clearInterval(this.timer);
          this.waitTime = 10;
          this.codeText = "发送验证码";
        }
      }, 1000);
    },

    getUserId() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get(`${host}/lxy/user`, params).then((res) => {
        const records = res.records;
        records.map((item) => {
          if (item.userPhone === this.phoneNum) {
            this.setState({
              userId: item.id,
            });

            console.log("user", this.userId);
          }
        });
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.login {
  height: 100vh;
  background: #fff;
  .login-nav {
    height: 50px;
    margin-bottom: 50px;
  }
  .login-inner {
    padding: 0 20px;
    .login-text {
      font-size: 28px;
      color: #5b5b5b;
      font-weight: 400;
      margin-bottom: 50px;
    }
    .login-phone {
      padding-bottom: 10px;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
      .phone {
        margin-right: 50px;
      }
      // .close-img {
      //   position: absolute;
      //   right: 30px;
      // }
    }
    .login-code {
      margin-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
    }
    .login-type {
      margin-top: 20px;
    }
    .icon-style {
      width: 20px;
      margin-right: 5px;
    }
    input {
      border: none;
      padding: 3px;
      &:focus {
        outline: none;
      }
    }

    .login-agree {
      margin-top: 50px;
      font-size: 14px;
      display: flex;
      justify-items: center;
      margin-bottom: 50px;
      span {
        color: #999;
        margin-left: 5px;
      }
      .a-style {
        text-decoration: none;
        color: #ffd306;
      }
    }
    input[type="checkbox"] {
      cursor: pointer;
      position: relative;
      width: 15px;
      height: 15px;
      font-size: 14px;
    }
    input[type="checkbox"]::after {
      position: absolute;
      top: 0;
      border: none;
      /* background-color: #ff670c; */
      color: #fff;
      width: 15px;
      height: 15px;
      display: inline-block;
      visibility: visible;
      padding-left: 0px;
      text-align: center;
      content: " ";
      border-radius: 1px;
    }
    input[type="checkbox"]:checked::after {
      background-color: #ffd306;
      border-color: #ffd306;
      content: "✓";
      font-size: 12px;
      font-weight: bold;
    }

    .login-btn {
      background-color: #e1e1e1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      border-radius: 5px;
      color: #fff;
    }
    .active {
      background-color: #ffd306;
    }
    .tips {
      color: #ff2d2d;
      display: flex;
      justify-content: center;
      margin-bottom: 3px;
    }
  }
  .getCode {
    margin-left: 10px;
    background: #ffd306;
    border-radius: 5px;
  }
}
</style>