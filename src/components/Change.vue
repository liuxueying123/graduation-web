<template>
  <div class="change-box" v-if="!showTimePicker">
    <div class="get-car">
      <div class="car-city" @click="goCity">
        <div class="car-title">取车城市</div>
        <div class="car-text">
          {{ cityName ? cityName : defaultCity }}
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <div class="car-address" @click="goCityDetail('rent')">
        <div class="car-title">取车地址</div>
        <div class="car-text">
          {{ choosePlace ? choosePlace : defaultReturnPlcae }}
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="push-car">
      <div class="car-city" @click="goCity('return')">
        <div class="car-title">还车城市</div>
        <div class="car-text">
          {{ cityName ? cityName : defaultCity }}
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <div class="car-address" @click="goCityDetail('return')">
        <div class="car-title">还车地址</div>
        <div class="car-text">
          {{ returnPlace ? returnPlace : defaultReturnPlcae }}
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <Time @show-time="showTime" class="time-content"></Time>
    <div class="sub-button" @click="hideChange">确认修改</div>
    <div class="mask" @click="hideChange"></div>
  </div>
  <TimePicker v-else @hide-time="hideTime"></TimePicker>
</template>

<script>
import Time from "../components/Time.vue";
import TimePicker from "../components/TimePicker.vue";
import { mapState } from "vuex";
export default {
  name: "Change",
  components: { Time, TimePicker },
  data() {
    return {
      showTimePicker: false,
      value1: "",
      isChange: false,
    };
  },
  computed: {
    ...mapState(["chooseCity", "choosePlace", "returnPlace"]),
    defaultCity() {
      if (window.localStorage.getItem("city")) {
        if (window.localStorage.getItem("city").indexOf("市") !== -1) {
          return window.localStorage
            .getItem("city")
            .slice(0, this.chooseCity.length - 1);
        } else {
          return window.localStorage.getItem("city");
        }
      }
    },
    cityName() {
      if (this.chooseCity.indexOf("市") !== -1) {
        return this.chooseCity.slice(0, this.chooseCity.length - 1);
      } else {
        return this.chooseCity;
      }
    },
    defaultPlace() {
      return window.localStorage.getItem("place");
    },
    defaultReturnPlcae() {
      return window.localStorage.getItem("place");
    },
  },
  methods: {
    showChange() {
      this.isChange = true;
    },
    hideChange() {
      this.isChange = false;
      this.$emit("change-status", this.isChange);
    },

    showTime(data) {
      this.showTimePicker = data;
      console.log("this.showTimePicker", this.showTimePicker);
    },
    hideTime(data) {
      this.showTimePicker = data;
    },
    goCity(params) {
      if (params) {
        this.$router.push({ path: "/city", query: { type: params } });
      } else {
        this.$router.push("/city");
      }
    },
    goCityDetail(params) {
      this.$router.push({ path: "/cityDetail", query: { type: params } });
    },
  },
};
</script>

<style lang="scss" scoped>
.change-box {
  background: #fff;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 5px 35px rgba(14, 86, 127, 0.07);
  position: fixed;
  .el-divider--horizontal {
    margin: 15px 0;
  }
  .get-car,
  .push-car {
    display: flex;
    align-items: center;
    padding: 10px 10px 0 10px;
  }
  .car-city {
    margin-right: 30px;
  }
  .car-title {
    color: #999;
    margin-bottom: 5px;
    font-size: 14px;
  }
  .car-text {
    color: #333;
  }
  .sub-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffd306;
    height: 50px;
    border-radius: 5px;
    width: 80%;
    margin: 20px auto;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .time-content {
    padding: 10px;
  }
}
</style>