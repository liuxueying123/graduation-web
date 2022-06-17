<template>
  <div class="list">
    <div class="list-head">
      <Change
        v-if="isChange"
        @change-status="hideChange"
        class="change-list"
      ></Change>
      <SelectCar v-else-if="isCar" @car-status="hideCar"></SelectCar>
      <div v-else class="list-fixed">
        <div class="list-top">
          <div class="list-back" @click="goBack">
            <img src="../assets/return.png" alt="" />
          </div>
          <div class="order-inner" @click="showChange">
            <div class="order-place">{{ defaultPlace }}</div>
            <div class="order-time">
              <span class="order-begin">{{
                `${displayStartMonth}月${displayStartDate}日 ${displayStartTime}`
              }}</span>
              <span class="order-end">{{
                `${displayEndMonth}月${displayEndDate}日 ${displayEndTime}`
              }}</span>
            </div>
          </div>
          <div class="select-car" @click="showCar">
            <img src="../assets/selectCar.png" alt="" />
          </div>
        </div>
        <Map></Map>
      </div>
    </div>
    <div class="rent-place">
      <div
        class="place-item"
        v-for="(item, idx) in place"
        :key="idx"
        @click="selectAddress(item)"
      >
        <div class="place-name">{{ item.name }}</div>
        <div class="place-bottom">
          <div class="place-time">{{ item.time }}</div>
          <!-- <div class="place-num">
            {{ `${item.num}款车型可租` }}
            <img src="../assets/dropDown.png" alt="" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "../components/Map.vue";
import Time from "../components/Time.vue";
import TimePicker from "../components/TimePicker.vue";
import Change from "../components/Change.vue";
import SelectCar from "../components/SelectCar.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "List",
  components: { Map, Time, TimePicker, Change, SelectCar },
  data() {
    return {
      value1: "",
      isChange: false,
      beginMonth: new Date().getMonth(), //开始月份
      beginDate: new Date().getDate(), //开始日
      beginDay: new Date().getDay(), //开始周
      beginHours: new Date().getHours(), //开始小时
      beginMin: new Date().getMinutes(), //开始分钟
      isCar: false,
      place: [
        {
          name: "苏州桥地铁站服务点",
          time: "07:00-24:00",
          num: "22",
        },
        {
          name: "巴沟地铁站服务点",
          time: "07:00-24:00",
          num: "22",
        },
        {
          name: "五路居地铁站服务点",
          time: "07:00-24:00",
          num: "22",
        },
        {
          name: "知春路地铁站服务点",
          time: "07:00-24:00",
          num: "22",
        },
        {
          name: "西苑地铁站服务点",
          time: "07:00-24:00",
          num: "22",
        },
      ],
    };
  },
  computed: {
    ...mapState([
      "startMonth",
      "startDate",
      "startTime",
      "endMonth",
      "endDate",
      "endTime",
      "getCarAddress",
      "carId",
    ]),
    defaultPlace() {
      return window.localStorage.getItem("place");
    },
    storeTime() {
      if (window.localStorage.getItem("timeList")) {
        return JSON.parse(window.localStorage.getItem("timeList"));
      }
    },
    displayStartMonth() {
      return this.startMonth
        ? this.startMonth
        : this.storeTime
        ? this.storeTime.startMonth
        : this.beginMonth + 1;
    },
    displayStartDate() {
      return this.startDate
        ? this.startDate
        : this.storeTime
        ? this.storeTime.startDate
        : this.beginDate;
    },
    displayStartDay() {
      return this.startDay
        ? this.startDay
        : this.storeTime
        ? this.storeTime.startDay
        : this.toweek(this.beginDay);
    },
    displayStartTime() {
      return this.startTime
        ? this.startTime
        : this.storeTime
        ? this.storeTime.startTime
        : `${this.beginHours}:${this.beginMin}`;
    },
    displayEndMonth() {
      return this.endMonth
        ? this.endMonth
        : this.storeTime
        ? this.storeTime.endMonth
        : this.beginMonth + 1;
    },
    displayEndDate() {
      return this.endDate
        ? this.endDate
        : this.storeTime
        ? this.storeTime.endDate
        : this.beginDate;
    },
    displayEndDay() {
      return this.endDay
        ? this.endDay
        : this.storeTime
        ? this.storeTime.endDay
        : this.toweek(this.beginDay);
    },
    displayEndTime() {
      return this.endTime
        ? this.endTime
        : this.storeTime
        ? this.storeTime.endTime
        : `${this.beginHours}:${this.beginMin}`;
    },
    displayRangeTime() {
      return this.rangeTime
        ? this.rangeTime
        : this.storeTime
        ? this.storeTime.rangeTime
        : 1;
    },
  },
  methods: {
    ...mapMutations(["setState"]),
    showChange() {
      this.isChange = true;
    },
    showCar() {
      this.isCar = true;
    },
    hideChange(data) {
      this.isChange = data;
    },
    hideCar(data) {
      this.isCar = data;
    },
    goBack() {
      this.$router.go(-1);
    },
    selectAddress(item) {
      this.setState({ getCarAddress: item });

      if (this.carId) {
        this.$router.push("/order");
      } else {
        this.$message({
          message: "请选择车型",
          type: "error",
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.list-fixed {
  position: fixed;
  top: 0;
  height: 360px;
  width: 100%;
}
.list-top {
  height: 40px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 35px rgba(14, 86, 127, 0.07);
  padding: 10px;
  .list-back {
    display: flex;
    align-items: center;
    img {
      width: 24px;
    }
  }
  .order-inner {
    width: 250px;
    background: #f7f7f7;
    border-radius: 20px;
    font-size: 10px;
    .order-place {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-bottom: 3px;
    }
    .order-time {
      display: flex;
      justify-content: center;
      align-items: center;

      color: #333;
      .order-begin {
        margin-right: 20px;
      }
    }
  }
  .select-car {
    display: flex;
    align-items: center;
    img {
      width: 24px;
    }
  }
}
.rent-place {
  margin-top: 370px;
  overflow-y: hidden;
  .place-item {
    background: #fff;
    border-radius: 10px;
    margin: 10px 10px;
    padding: 10px;
    .place-name {
      margin-bottom: 10px;
      color: #333;
    }
    .place-bottom {
      display: flex;
      justify-content: space-between;
      color: #666;
      img {
        width: 10px;
        margin-bottom: 3px;
      }
    }
  }
}
</style>


