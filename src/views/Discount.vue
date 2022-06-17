<template>
  <div class="discount-box">
    <div class="discount-nav">
      <Nav :title="'优惠券'"></Nav>
    </div>
    <div class="discount-content" v-if="discountList">
      <div class="discount-item" @click="chooseItem">
        <div class="discount-price">{{ discountList.price }}</div>
        <div class="discount-detail">
          <div class="discount-title">{{ discountList.title }}</div>
          <div class="discount-date">{{ discountList.content }}</div>
        </div>
        <div class="select-img" v-show="fromOrder">
          <img :src="isSelect ? selected : unSelected" alt="" />
        </div>
      </div>
      <div class="discount-btn" v-show="fromOrder">
        <el-button @click="goBack('no')">不使用优惠券</el-button>
        <el-button type="primary" @click="goBack('yes')"
          >确认使用此优惠券</el-button
        >
      </div>
    </div>
    <el-empty description="暂时没有优惠券" v-else></el-empty>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
export default {
  name: "Discount",
  components: {
    Nav,
  },
  data() {
    return {
      // discountList: [
      //   {
      //     price: "120",
      //     title: "新人专享券",
      //     date: `有效期${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}-${new Date(
      //       new Date().setDate(new Date().getDate() + 30)
      //     ).getFullYear()}.${new Date(
      //       new Date().setDate(new Date().getDate() + 30)
      //     ).getMonth()}.${new Date(
      //       new Date().setDate(new Date().getDate() + 30)
      //     ).getDate()}`,
      //   },
      // ],
      isSelect: false,
      unSelected: require("../assets/unselected.png"),
      selected: require("../assets/selected.png"),
    };
  },
  computed: {
    discountList() {
      if (window.localStorage.getItem("discount")) {
        return JSON.parse(window.localStorage.getItem("discount"));
      }
    },
    fromOrder() {
      if (location.hash.slice(16) === "choose") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    chooseItem() {
      this.isSelect = !this.isSelect;
    },
    goBack(params) {
      if (params === "yes") {
        window.localStorage.setItem("useDiscount", "yes");
      } else {
        window.localStorage.setItem("useDiscount", "false");
      }
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.discount-box {
  .discount-nav {
    height: 50px;
    background: #fff;
  }
  .discount-content {
    padding: 10px;
    .discount-item {
      background: #fff;
      padding: 20px;
      display: flex;
      border-radius: 10px;
      position: relative;
      .discount-price {
        color: #ffd306;
        font-size: 36px;
        margin-right: 20px;
        &::before {
          content: "¥";
          font-size: 20px;
        }
      }
      .discount-detail {
        .discount-title {
          color: #333;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .discount-date {
          color: #666;
        }
      }
      .select-img {
        img {
          width: 20px;
          position: absolute;
          right: 10px;
          top: 10px;
        }
      }
    }
    .discount-btn {
      // margin-top: 50px;
      margin: 50px 30px;
    }
  }
}
</style>