<template>
  <div class="time-box">
    <div class="select-time" @click="showTime">
      <div class="select-begin-time">
        <div class="date">
          {{ `${displayStartMonth}月${displayStartDate}日` }}
        </div>
        <div class="week">
          {{ `周${displayStartDay} ${displayStartTime}` }}
        </div>
      </div>
      <div class="total-day">
        <span>{{ `共${displayRangeTime}天` }}</span>
      </div>
      <div class="select-end-time">
        <div class="date">{{ `${displayEndMonth}月${displayEndDate}日` }}</div>
        <div class="week">
          {{ `周${displayEndDay} ${displayEndTime}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Time",
  data() {
    return {
      beginMonth: new Date().getMonth(), //开始月份
      beginDate: new Date().getDate(), //开始日
      beginDay: new Date().getDay(), //开始周
      beginHours: new Date().getHours(), //开始小时
      beginMin: new Date().getMinutes(), //开始分钟
      week: ["一", "二", "三", "四", "五", "六", "日"],
      value1: "",
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

  mounted() {
    console.log(
      "aosdasj",
      this.startMonth.length
        ? this.startMonth
        : this.storeTime
        ? this.storeTime.startMonth
        : this.beginMonth + 1
    );
  },

  methods: {
    showTime() {
      this.$emit("show-time", true);
    },
    // 周的转化
    toweek(weekNum) {
      for (let i = 0; i < this.week.length; i++) {
        if (weekNum === i + 1) {
          return this.week[i];
        }
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.time-box {
  .time-picker {
    .time-picker-top {
      background: #fff;
      height: 100px;
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
    }
    .time-picker-middle {
      .el-picker-panel__body {
        .el-date-range-picker__content {
          box-sizing: none;
        }
      }
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
</style>