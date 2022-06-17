<template>
  <div class="nav" :class="{ activeNav: title }">
    <img src="../assets/return.png" alt="" class="nav-img" @click="goBack" />
    <div class="nav-title">{{ title }}</div>
  </div>
</template>

<script>
import router from "../router/index";
export default {
  name: "Nav",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    goBack() {
      router.go(-1);
    },
  },
};
</script>

<style lang='scss' scoped>
.nav {
  //   background: #fff;
  padding: 15px;
  .nav-img {
    width: 15px;
  }
  .nav-title {
    color: #333;
  }
}
.activeNav {
  display: flex;
  justify-content: center;
  align-items: center;
  .nav-img {
    position: absolute;
    left: 15px;
    width: 15px;
  }
  .nav-title {
    position: relative;
    color: #333;
  }
}
</style>