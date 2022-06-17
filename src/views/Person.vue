<template>
  <div class="person-box">
    <div class="person-head">
      <div class="person-nav">
        <Nav :title="'我的'" :color="true"></Nav>
      </div>
      <div class="person-detail">
        <div class="person-img">
          <img src="../assets/head.png" alt="" />
        </div>
        <div class="person-tel">
          {{
            phone.substr(0, 3) +
            "****" +
            phone.substr(7, phone.split("").length)
          }}
        </div>
      </div>
    </div>
    <div class="person-list">
      <div
        class="list-item"
        v-for="(item, idx) in list"
        :key="idx"
        @click="goPath(item.path)"
      >
        <div class="list-title">{{ item.title }}</div>
        <img src="../assets/arrow.svg" alt="" class="arrow-img" />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
export default {
  name: "Person",
  components: { Nav },
  data() {
    return {
      phone: "13009772012",
      list: [
        {
          path: "/OrderList",
          title: "我的订单",
        },
        { path: "/Discount", title: "优惠券" },
        { path: "/Setting", title: "设置" },
      ],
    };
  },
  methods: {
    goPath(item) {
      this.$router.push(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.person-box {
  .person-head {
    height: 200px;
    background: #d0d0d0;
    .person-nav {
      height: 50px;
      //   margin-bottom: ;
    }
    .person-detail {
      display: flex;
      align-items: center;
      padding: 30px;
      .person-img {
        margin-right: 20px;
        img {
          width: 64px;
        }
      }
      .person-tel {
        color: #333;
        font-size: 20px;
      }
    }
  }
  .person-list {
    .list-item {
      background: #fff;
      height: 30px;
      color: #2c2b30;
      padding: 10px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      &:first-child {
        border-top: none;
      }
      .arrow-img {
        width: 8px;
      }
    }
  }
}
</style>