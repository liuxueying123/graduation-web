<template>
  <div class="setting-box">
    <div class="setting-nav">
      <Nav :title="'设置'"></Nav>
    </div>
    <div class="setting-content" @click="goSet">
      <div class="setting-code">设置支付密码</div>
      <img src="../assets/arrow.svg" alt="" class="arrow-img" />
    </div>
    <div class="setting-btn" @click="logout">退出登录</div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
export default {
  name: "Setting",
  components: { Nav },
  methods: {
    goSet() {
      this.$router.push("/setPassword");
    },
    logout() {
      window.localStorage.setItem("isLogin", "false");
      this.$router.replace("/");
      window.localStorage.setItem("province", "");
      window.localStorage.setItem("city", "");
      window.localStorage.setItem("place", "");
      window.localStorage.setItem("returnPlace", "");
      window.localStorage.setItem("sDate", "");
      window.localStorage.setItem("lDate", "");
      window.localStorage.setItem("timeList", "");
    },
  },
};
</script>


<style lang='scss'scoped>
.setting-box {
  .setting-nav {
    background: #fff;
    box-shadow: 0 5px 35px rgba(14, 86, 127, 0.07);
  }
  .setting-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    margin-top: 2px;
    padding: 20px 10px;
    font-size: 16px;
    color: #666;
    img {
      height: 15px;
    }
  }
  .setting-btn {
    position: fixed;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffd306;
    height: 50px;
    border-radius: 5px;
    width: 80%;
    margin: 0 40px;
  }
}
</style>