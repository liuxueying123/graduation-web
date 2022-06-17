<template>
  <div class="admin-box">
    <div class="admin-title">远程租车管理系统</div>
    <div class="admin-content">
      <el-menu
        default-active="2"
        class="el-menu"
        background-color="#333333"
        text-color="#fff"
      >
        <el-menu-item index="1" @click="goToPage('/place')">
          <i class="el-icon-location"></i>
          <span slot="title">服务点管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goToPage('/car')">
          <i class="el-icon-menu"></i>
          <span slot="title">车辆管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goToPage('/adminOrder')">
          <i class="el-icon-tickets"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="goToPage('/adminDiscount')">
          <i class="el-icon-present"></i>
          <span slot="title">优惠券管理</span>
        </el-menu-item>
      </el-menu>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  methods: {
    goToPage(item) {
      this.$router.push(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-box {
  height: 100vh;
  .admin-title {
    width: 100%;
    height: 10%;
    background: #000;
    color: #fff;
    font-size: 40px;
    text-align: center;
  }
  .admin-content {
    display: flex;
    height: 90%;
    width: 10%;
  }
}
</style>
