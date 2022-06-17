<template>
  <!-- 订单页 -->
  <div class="order-box">
    <div class="oreder-nav">
      <Nav :title="'订单确认'"></Nav>
    </div>
    <div class="order-content">
      <div class="order-detail">
        <div class="car-info">
          <div class="car-img">
            <img :src="carInfo.carPicture" alt="" />
          </div>
          <div class="car-detail">
            <div class="car-name">{{ carInfo.carName }}</div>
            <div class="car-feature">1.5T自动 | 三厢5座</div>
          </div>
          <div class="el-icon-arrow-right"></div>
        </div>
        <div class="time-info">
          <div class="start-time">
            {{
              `${displayStartMonth}月${displayStartDate}日 ${displayStartTime}`
            }}
          </div>
          <div class="line-time">{{ `共${displayRangeTime}天` }}</div>
          <div class="end-time">
            {{ `${displayEndMonth}月${displayEndDate}日 ${displayEndTime}` }}
          </div>
        </div>
        <div class="address-info">
          <div class="rent-address">
            <div class="rent-tips">取车网点</div>
            <div>{{ getCarAddress.name }}</div>
            <div class="el-icon-arrow-right"></div>
          </div>
          <div class="return-address">
            <div class="return-tips">还车网点</div>
            <div>{{ getCarAddress.name }}</div>
            <div class="el-icon-arrow-right"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="money-content">
      <div class="money-title">租车费用</div>
      <el-divider></el-divider>
      <div class="money-detail">
        <div class="detail-title">车辆租赁及服务费</div>
        <div class="detail-money">
          <div class="detail-money-before">
            {{ `¥${carInfo.carPrice}*${displayRangeTime}` }}
          </div>
          <div class="detail-money-after">
            {{ `¥${carInfo.carPrice * displayRangeTime}` }}
          </div>
        </div>
      </div>
      <div class="money-detail">
        <div class="detail-title">基础服务费</div>
        <div class="detail-money">
          <div class="detail-money-before">
            {{ `¥50*${displayRangeTime}` }}
          </div>
          <div class="detail-money-after">
            {{ `¥${50 * displayRangeTime}` }}
          </div>
        </div>
      </div>
      <div class="money-detail">
        <div class="detail-title">车辆整备费</div>
        <div class="detail-money">¥20</div>
      </div>
      <el-divider></el-divider>
      <div class="discount-box">
        <div class="discount-title">优惠券</div>
        <div class="discount-price">
          {{ discountPrice ? `- ¥${discountPrice}` : "" }}
        </div>
        <div class="el-icon-arrow-right" @click="goDiscount"></div>
      </div>
    </div>

    <div class="confirm-box">
      <div class="confirm-agree">
        <input type="checkbox" @click="agree" />
        <span>我已阅读并同意</span>
        <a href="https://m.zuche.com/help.do#/useragreement" class="a-style"
          >《租车服务合同》</a
        >
        <a href="https://m.zuche.com/help.do#/privacystatement" class="a-style"
          >《预定服务协议》</a
        >
      </div>
      <div class="confirm-bottom">
        <div class="confirm-money">
          {{ `总金额:¥${total}` }}
        </div>
        <div class="confirm-btn" :class="{ active: isAgree }" @click="Confirm">
          确认订单
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import { post, host } from "../tools/request";
import { mapState } from "vuex";
export default {
  name: "Order",
  components: {
    Nav,
  },
  data() {
    return {
      isAgree: false,
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
      "rangeTime",
      "carInfo",
      "getCarAddress",
      "userId",
      "carId",
    ]),
    defaultPlace() {
      return window.localStorage.getItem("place");
    },
    storeTime() {
      return window.localStorage.getItem("timeList")
        ? JSON.parse(window.localStorage.getItem("timeList"))
        : {};
    },
    displayStartMonth() {
      return this.startMonth ? this.startMonth : this.storeTime.startMonth;
    },
    displayStartDate() {
      return this.startDate ? this.startDate : this.storeTime.startDate;
    },
    displayStartTime() {
      return this.startTime ? this.startTime : this.storeTime.startTime;
    },
    displayEndMonth() {
      return this.endMonth ? this.endMonth : this.storeTime.endMonth;
    },
    displayEndDate() {
      return this.endDate ? this.endDate : this.storeTime.endDate;
    },
    displayEndTime() {
      return this.endTime ? this.endTime : this.storeTime.endTime;
    },
    displayRangeTime() {
      return this.rangeTime ? this.rangeTime : this.storeTime.rangeTime;
    },
    discountPrice() {
      if (window.localStorage.getItem("discount")) {
        if (window.localStorage.getItem("useDiscount") === "yes") {
          return JSON.parse(window.localStorage.getItem("discount")).price;
        } else {
          return;
        }
      }
    },
    total() {
      if (this.discountPrice) {
        console.log(
          this.carInfo.carPrice * this.displayRangeTime +
            50 * this.displayRangeTime +
            20 -
            this.discountPrice
        );
        return (
          this.carInfo.carPrice * this.displayRangeTime +
          50 * this.displayRangeTime +
          20 -
          this.discountPrice
        );
      } else {
        return (
          this.carInfo.carPrice * this.displayRangeTime +
          50 * this.displayRangeTime +
          20
        );
      }
    },
  },
  methods: {
    agree() {
      this.isAgree = !this.isAgree;
    },
    Confirm() {
      if (this.isAgree) {
        let params = {
          carId: this.carId,
          dropoffLocation: this.getCarAddress.name,
          dropoffTime: `2022-${this.displayEndMonth}-${this.displayEndDate} ${this.displayEndTime}:00`,
          pickupLocation: this.getCarAddress.name,
          pickupTime: `2022-${this.displayStartMonth}-${this.displayStartDate} ${this.displayStartTime}:00`,
          placeId: 0,
          userId: this.userId,
        };
        post(`${host}/lxy/order/addOrder`, params).then((res) => {
          if (res) {
          }
        });
        let order = {
          carType: this.carInfo.carName,
          beginTime: `${this.displayStartMonth}月${this.displayStartDate}日`,
          endTime: `${this.displayEndMonth}月${this.displayEndDate}日`,
          total: this.total,
        };
        let orderList = [];
        if (window.localStorage.getItem("orderList")) {
          orderList = JSON.parse(window.localStorage.getItem("orderList"));
          orderList.push(order);
        } else {
          orderList.push(order);
        }
        window.localStorage.setItem("orderList", JSON.stringify(orderList));
        this.$router.push("/");
        if (window.localStorage.getItem("useDiscount") === "yes") {
          window.localStorage.setItem("discount", "");
        }
      }
    },
    goDiscount() {
      this.$router.push({ path: "/Discount", query: { type: "choose" } });
    },
  },
};
</script>

<style lang="scss" scoped>
.oreder-nav {
  background: #ffd306;
  height: 100px;
  border-radius: 0 0 20px 20px;
}
.order-content {
  margin: 0 10px;
  margin-top: -50px;
  background: #fff;
  border-radius: 10px;
  padding: 20px 10px;
  .car-info {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .car-img {
      margin-right: 20px;
      img {
        width: 100px;
      }
    }
    .car-detail {
      //   margin-right: 80px;
      .car-name {
        color: #333;
        margin-bottom: 5px;
      }
      .car-feature {
        color: #999;
        font-size: 14px;
      }
    }
  }
  .time-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .start-time,
    .end-time {
      font-size: 16px;
      color: #333;
    }
    .line-time {
      font-size: 12px;
      color: #ffd306;
      &::before {
        content: "---";
      }
      &::after {
        content: "---";
      }
    }
  }
  .address-info {
    margin-top: 10px;
    .rent-address {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      .rent-tips {
        background: #ffd306;
        color: #fff;
        margin-right: 10px;
        padding: 3px;
        border-radius: 5px;
        font-size: 14px;
      }
    }
    .return-address {
      display: flex;
      align-items: center;
      .return-tips {
        background: #5e4418;
        color: #fff;
        margin-right: 10px;
        padding: 3px;
        border-radius: 5px;
        font-size: 14px;
      }
    }
  }
}
.money-content {
  margin: 0 10px;
  margin-top: 20px;
  background: #fff;
  border-radius: 10px;
  padding: 20px 10px;
  .el-divider--horizontal {
    margin: 15px 0;
  }
  .money-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .detail-title {
      color: #666;
    }
    .detail-money {
      display: flex;
      align-items: center;
      .detail-money-before {
        margin-right: 5px;
        color: #666;
        font-size: 12px;
      }
    }
  }
}
.discount-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .discount-price {
    color: #ffd306;
    margin-right: 20px;
  }
}
.confirm-box {
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  padding: 10px;
  .confirm-agree {
    font-size: 14px;
    .a-style {
      text-decoration: none;
      color: #4a90e2;
    }
  }
  .confirm-bottom {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .confirm-money {
      margin-right: 150px;
      color: #ffd306;
    }
    .confirm-btn {
      background: #dedede;
      padding: 10px;
      border-radius: 10px;
    }
    .active {
      background: #ffd306;
    }
  }
}
.el-icon-arrow-right {
  position: absolute;
  right: 20px;
}
</style>