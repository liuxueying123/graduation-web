<template>
  <div class="select-car-box">
    <div class="car-inner">
      <div class="car-list" v-for="(item, idx) in carList" :key="idx">
        <div
          class="car-item"
          :class="{ activeCar: item.carName === selectCar.carName }"
          @click="chooseCar(item)"
        >
          <div class="car-img">
            <img :src="item.carPicture" alt="" />
          </div>
          <div class="select-img">
            <img
              :src="item.carName === selectCar.carName ? selected : unSelected"
              alt=""
            />
          </div>
          <div class="car-name">{{ item.carName }}</div>
          <div class="car-price">{{ item.carPrice }}</div>
        </div>
      </div>
      <div class="confirm-btn" @click="Confirm">确认</div>
    </div>

    <div class="mask" @click="hideCar"></div>
  </div>
</template>

<script>
import { get, host } from "../tools/request";
import { mapState, mapMutations } from "vuex";
export default {
  name: "slectCar",
  data() {
    return {
      carList: [],
      pageNo: 0,
      pageSize: 5,
      unSelected: require("../assets/unselected.png"),
      selected: require("../assets/selected.png"),
      selectCar: {},
    };
  },
  computed: {
    ...mapState(["carInfo", "carId"]),
  },
  mounted() {
    this.getCarList();
  },
  methods: {
    ...mapMutations(["setState"]),
    getCarList() {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      get(`${host}/lxy/car`, params).then((res) => {
        if (res) {
          const records = res.records;
          this.carList = records;
        }
      });
    },
    chooseCar(item) {
      this.selectCar = item;
      this.setState({
        carId: item.id,
      });
      console.log("carid", this.carId);
    },
    Confirm() {
      if (this.selectCar) {
        this.setState({ carInfo: this.selectCar });
        window.localStorage.setItem("carInfo", JSON.stringify(this.selectCar));
      }
      this.hideCar();
    },
    hideCar() {
      this.$emit("car-status", false);
    },
  },
};
</script>


<style lang="scss" scoped>
.select-car-box {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  .car-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 300px;
    overflow: scroll;
    padding: 15px;
  }
  .car-list {
    display: flex;
  }
  .car-item {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    text-align: center;
    border-radius: 10px;
    border: 2px solid #eee;
    margin-top: 20px;
    position: relative;
    color: #666;
    img {
      width: 100px;
    }
    .select-img {
      img {
        width: 20px;
        position: absolute;
        right: 2px;
        top: 3px;
      }
    }
    .car-name {
      margin-bottom: 5px;
    }
    .car-price {
      &::before {
        content: "¥";
        font-size: 12px;
        margin-right: 3px;
      }
      &::after {
        content: "起";
        font-size: 16px;
        margin-right: 3px;
      }
    }
  }
  .activeCar {
    border: 2px solid #5caaf8;
  }
  .confirm-btn {
    background: #ffd306;
    width: 50%;
    text-align: center;
    padding: 10px;
    margin: 10px auto;
    border-radius: 10px;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 330px;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>