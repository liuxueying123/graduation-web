<template>
  <div class="home" v-if="!showTimePicker">
    <div class="home-base">
      <div class="home-top">
        <div class="el-icon-user icon-size" @click="goLogin"></div>
        <div class="head-title">闪电租车</div>
        <div class="el-icon-help icon-size"></div>
      </div>
      <div class="select-box">
        <div class="select-address">
          <div class="select-city" @click="goCity">
            <div class="select-city-title title-style">取车城市</div>
            <div class="select-city-picker">
              {{ cityName ? cityName : defaultCity }}
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
          <div class="fill-detail" @click="goPlace">
            <div class="fill-detail-title title-style">取车地址</div>
            <div
              class="fill-detail-inner"
              :class="{
                active: choosePlace || defaultPlace,
              }"
            >
              {{
                choosePlace ? choosePlace : defaultPlace ? defaultPlace : "地点"
              }}
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <Time @show-time="showTime"></Time>
        <div class="sub-button" @click="goList">去订车</div>
      </div>
    </div>
    <div class="img-box">
      <img
        src="https://dfs.zuchecdn.com/visit/carmktplat/g/V3/a2cfc1bb86384e249bcf9c495961f64b.png"
        alt="1"
        class="img-slide img1"
      />
      <img
        src="https://dfs.zuchecdn.com/visit/carmktplat/g/V3/6069a737608749a9becde7560fdfd7b7.png"
        alt="2"
        class="img-slide img2"
      />
      <img
        src="https://dfs.zuchecdn.com/visit/carmktplat/g/V3/5924015e2e524202bca55ef3d072dfc0.png"
        alt="3"
        class="img-slide img3"
      />
    </div>
    <div class="discount-box">
      <div v-if="isFresh" @click="getDiscount">
        <img
          src="https://dfs.zuchecdn.com/cdn/carmktmis/g/V3/70b24112fd13452fa9c6009f1fe8b9cf.png"
          alt=""
        />
      </div>
      <div v-else @click="useDiscount">
        <div class="discount-top">
          <div class="top-text">
            <div class="top-title">已领优惠券</div>
            <div class="top-tips">您持有1张优惠券，赶快使用吧</div>
          </div>
          <img src="../assets/arrow.svg" alt="" />
        </div>
        <div class="discount-content">
          <img src="../assets/discount.jpeg" alt="" />
          <div class="content-text">
            <div class="content-title">新人专享券</div>
            <div class="content-tips">
              {{
                `有效期${beginYear}.${beginMonth}.${beginDate}-${new Date(
                  endTime
                ).getFullYear()}.${new Date(endTime).getMonth()}.${new Date(
                  endTime
                ).getDate()}`
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TimePicker v-else @hide-time="hideTime"></TimePicker>
</template>

<script>
import Time from "../components/Time.vue";
import TimePicker from "../components/TimePicker.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { Time, TimePicker },
  data() {
    return {
      showTimePicker: false,
      value1: "",
      isFresh: true,
      beginYear: new Date().getFullYear(),
      beginMonth: new Date().getMonth(), //开始月份
      beginDate: new Date().getDate(), //开始日
      endTime: new Date().setDate(new Date().getDate() + 30),
      timer: null,
    };
  },
  computed: {
    ...mapState(["chooseCity", "choosePlace"]),
    defaultCity() {
      if (window.localStorage.getItem("city")) {
        if (window.localStorage.getItem("city").indexOf("市") !== -1) {
          return window.localStorage
            .getItem("city")
            .slice(0, this.chooseCity.length - 1);
        } else {
          return window.localStorage.getItem("city");
        }
      } else {
        window.localStorage.setItem("city", "北京市");
        return "北京";
      }
    },
    cityName() {
      if (this.chooseCity.indexOf("市") !== -1) {
        return this.chooseCity.slice(0, this.chooseCity.length - 1);
      } else {
        return this.chooseCity;
      }
    },
    isLogin() {
      if (window.localStorage.getItem("isLogin") === "true") {
        return true;
      } else {
        return false;
      }
    },
    defaultPlace() {
      return window.localStorage.getItem("place");
    },
  },
  created() {
    if (window.localStorage.getItem("isFresh")) {
      this.isFresh = false;
    } else {
      this.isFresh = true;
    }
  },
  methods: {
    goLogin() {
      console.log();
      if (this.isLogin) {
        this.$router.push("/person");
      } else {
        this.$router.push("/login");
      }
    },
    showTime(data) {
      this.showTimePicker = data;
      console.log("this.showTimePicker", this.showTimePicker);
    },
    hideTime(data) {
      this.showTimePicker = data;
      console.log();
    },
    slideFun() {
      var index = 0;
      //效果
      function ChangeImg() {
        index++;
        var a = document.getElementsByClassName("img-slide");
        if (index >= a.length) index = 0;
        for (var i = 0; i < a.length; i++) {
          a[i].style.display = "none";
        }
        a[index].style.display = "block";
      }
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        console.log(1111);
        //设置定时器，每隔两秒切换一张图片
        setInterval(ChangeImg(), 2000);
      }
    },
    goCity() {
      this.$router.push("/city");
    },
    goPlace() {
      this.$router.push("/cityDetail");
    },
    goList() {
      if (this.isLogin) {
        this.$router.push("/list");
      } else {
        this.$router.push("/login");
      }
    },
    getDiscount() {
      if (this.isLogin) {
        this.isFresh = false;
        console.log();
        let discountObj = {
          title: "新人专享券",
          content: `有效期${this.beginYear}.${this.beginMonth}.${
            this.beginDate
          }-${new Date(this.endTime).getFullYear()}.${new Date(
            this.endTime
          ).getMonth()}.${new Date(this.endTime).getDate()}`,
          price: "120",
        };
        window.localStorage.setItem("isFresh", "false");
        window.localStorage.setItem("discount", JSON.stringify(discountObj));
      } else {
        this.$router.push("/Login");
      }
    },
    useDiscount() {
      this.$router.push("/Discount");
    },
  },
  mounted() {
    this.slideFun();
  },
};
</script>

<style lang="scss" scoped>
.home {
  .home-base {
    background: #ffd306;
    padding: 5px 10px;
    border-radius: 0 0 15px 15px;
    .home-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-size {
        font-size: 20px;
      }
      .head-title {
        font-size: 20px;
        font-weight: 500;
        font-style: italic;
      }
    }
    .select-box {
      background: white;
      height: 220px;
      border-radius: 10px;
      margin-top: 10px;
      margin-bottom: -30px;
      padding: 20px;
      box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.3);
      .select-address {
        display: flex;
        // margin-top: 20px;
        .select-city {
          margin-right: 20px;
          .select-city-picker {
            color: #333;
            font-size: 20px;
          }
        }
        .fill-detail {
          .fill-detail-inner {
            font-size: 20px;
            color: #999;
          }
          .active {
            color: #333;
          }
        }
        .title-style {
          // margin-top: 10px;
          font-size: 14px;
          color: #999;
          margin-bottom: 5px;
        }
      }

      .sub-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        background: #ffd306;
        height: 50px;
        border-radius: 5px;
      }
    }
  }
  .img-box {
    margin-top: 40px;
    padding: 10px;
    .img-slide {
      height: 100px;
      width: 100%;
      border-radius: 10px;
    }
    .img1 {
      display: block;
    }

    .img2 {
      display: none;
    }

    .img3 {
      display: none;
    }
  }
  .discount-box {
    background: #fff;
    // height: 150px;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    img {
      // height: 100%;
      width: 100%;
    }
    .discount-top {
      // height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
      }
      .top-title {
        font-size: 14px;
        color: #333;
      }
      .top-tips {
        font-size: 10px;
        color: #999;
      }
    }
    .discount-content {
      margin-top: 10px;
      display: flex;
      align-items: center;
      img {
        width: 100px;
        margin-right: 20px;
      }
      .content-title {
        color: #333;
        margin-bottom: 10px;
        font-weight: 400;
      }
      .content-tips {
        color: #999;
        font-size: 10px;
      }
    }
  }
}
</style>