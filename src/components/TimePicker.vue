<template>
  <div class="time-picker">
    <div class="time-picker-top">
      <div class="time-nav">
        <div class="close-img" @click="hideTimePicker">
          <img src="../assets/close.png" alt="" />
        </div>
        <div class="time-title">用车时间</div>
        <div class="clear-time" @click="clearTime">清空</div>
      </div>
      <div class="select-time">
        <div class="select-begin-time">
          <div class="date">
            {{ `${bMonth}月${bDate}日` }}
          </div>
          <div class="week">
            {{
              `周${bWeek} ${
                beginTime ? beginTime : `${beginHours}:${beginMin}`
              }`
            }}
          </div>
        </div>
        <div class="total-day">
          <span>{{ `共${rangeDay}天` }}</span>
        </div>
        <div class="select-end-time">
          <div class="date">{{ `${eMonth}月${eDate}日` }}</div>
          <div class="week">
            {{
              `周${eWeek} ${lastTime ? lastTime : `${beginHours}:${beginMin}`}`
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="time-picker-middle">
      <van-calendar
        type="range"
        :poppable="false"
        :style="{ height: '300px' }"
        :show-title="false"
        :show-subtitle="false"
        :show-confirm="false"
        ref="allTime"
        color="#2c79ef"
        :default-date="[beginDate, lastDate]"
        @confirm="onConfirm"
      />
    </div>
    <div class="time-picker-bottom">
      <el-time-select
        placeholder="起始时间"
        v-model="beginTime"
        :picker-options="{
          start: '05:30',
          step: '00:30',
          end: '23:30',
        }"
      >
      </el-time-select>
      <el-time-select
        placeholder="结束时间"
        v-model="lastTime"
        :picker-options="{
          start: '05:30',
          step: '00:30',
          end: '23:30',
        }"
      >
      </el-time-select>
    </div>
    <div class="time-button" @click="goBack">确定时间</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "TimePicker",
  data() {
    return {
      beginHours: new Date().getHours(), //开始小时
      beginMin: new Date().getMinutes(), //开始分钟
      week: ["一", "二", "三", "四", "五", "六", "日"],
      value1: "",
      beginDate: new Date(),
      lastDate: new Date(),
      rangeDay: 1,
      beginTime: "",
      lastTime: "",
    };
  },
  computed: {
    ...mapState([
      "startMonth",
      "startDate",
      "startDay",
      "startTime",
      "endMonth",
      "endDate",
      "endDay",
      "endTime",
      "rangeTime",
    ]),
    storeTime() {
      return window.localStorage.getItem("timeList")
        ? JSON.parse(window.localStorage.getItem("timeList"))
        : {};
    },
    // 开始年月
    bMonth() {
      return this.beginDate.getMonth() + 1;
    },
    bDate() {
      return this.beginDate.getDate();
    },
    bWeek() {
      return this.toweek(this.beginDate.getDay());
    },
    // 结束年月
    eMonth() {
      return this.lastDate.getMonth() + 1;
    },
    eDate() {
      return this.lastDate.getDate();
    },
    eWeek() {
      return this.toweek(this.lastDate.getDay());
    },
  },
  mounted() {
    if (window.localStorage.getItem("sDate")) {
      this.beginDate = new Date(window.localStorage.getItem("sDate"));
    }
    if (window.localStorage.getItem("lDate")) {
      this.lastDate = new Date(window.localStorage.getItem("lDate"));
    }
    if (this.storeTime) {
      this.beginTime = this.storeTime.startTime;
      this.lastTime = this.storeTime.endTime;
    }
  },
  methods: {
    ...mapMutations(["setState"]),
    formatDate(date) {
      return `${new Date(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      )}`;
    },
    // 两个日期之间相差天数
    getDaysBetween(startDate, enDate) {
      const sDate = Date.parse(startDate);
      const eDate = Date.parse(enDate);
      if (sDate > eDate) {
        return 0;
      }
      if (sDate === eDate) {
        return 1;
      }
      const days = (eDate - sDate) / (1 * 24 * 60 * 60 * 1000);
      return days;
    },
    // 周的转化
    toweek(weekNum) {
      for (let i = 0; i < this.week.length; i++) {
        if (weekNum === i + 1) {
          return this.week[i];
        }
      }
    },
    hideTimePicker() {
      this.$emit("hide-time", false);
    },
    onConfirm(date) {
      this.date = [];
      const [start, end] = date;
      this.beginDate = start;
      this.lastDate = end;

      this.rangeDay = this.getDaysBetween(
        this.formatDate(start),
        this.formatDate(end)
      );
    },
    clearTime() {
      this.$refs.allTime.reset(this.beginDate);
      this.$refs.allTime.reset(this.lastDate);
    },
    goBack() {
      this.setState({
        startMonth: this.bMonth,
        startDate: this.bDate,
        startDay: this.bWeek,
        startTime: this.beginTime,
        endMonth: this.eMonth,
        endDate: this.eDate,
        endDay: this.eWeek,
        endTime: this.lastTime,
        rangeTime: this.rangeDay,
      });
      let timeList = {
        startMonth: this.bMonth,
        startDate: this.bDate,
        startDay: this.bWeek,
        startTime: this.beginTime,
        endMonth: this.eMonth,
        endDate: this.eDate,
        endDay: this.eWeek,
        endTime: this.lastTime,
        rangeTime: this.rangeDay,
      };
      window.localStorage.setItem("sDate", this.beginDate);
      window.localStorage.setItem("lDate", this.lastDate);
      window.localStorage.setItem("timeList", JSON.stringify(timeList));
      this.hideTimePicker();
    },
  },
};
</script>

<style lang="scss" scoped>
// .time-box {
.time-picker {
  .time-picker-top {
    background: #fff;
    height: 80px;
    padding: 10px 20px;
    .time-nav {
      height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .close-img {
        img {
          width: 20px;
        }
      }
      .time-title {
        font-weight: 500;
      }
      .clear-time {
        color: #666;
      }
    }
    .select-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date {
        font-size: 18px;
        color: #333;
      }
      .week {
        font-size: 14px;
        color: #999;
      }
      .total-day {
        span {
          position: relative;
          display: inline-block;
          // max-width: 2.4rem;
          text-align: center;
        }
        span:before {
          left: -20%;
          content: "";
          position: absolute;
          top: 50%;
          width: 60px;
          height: 1px;
          background: linear-gradient(-90deg, #979797, transparent 90%);
          transform: translate(-100%, 2px);
          box-sizing: border-box;
        }
        span:after {
          left: auto;
          right: -20%;
          transform: translate(100%, 2px);
          background: linear-gradient(90deg, #979797, transparent 90%);
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          height: 1px;
          width: 60px;
        }
      }
    }
  }
  .time-picker-middle {
    .el-picker-panel__body {
      .el-date-range-picker__content {
        box-sizing: none;
      }
    }
  }
  .time-picker-bottom {
    display: flex;
  }
  .time-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 150px;
    background: #ffd306;
    height: 50px;
    border-radius: 5px;
    width: 90%;
  }
}
// }
</style>