<template>
  <div class="city-detail-box">
    <div class="city-detail-nav">
      <Nav :title="'选择地区'"></Nav>
    </div>
    <div class="city-detail-content">
      <div
        class="city-item"
        v-for="(item, idx) in cityDetail"
        :key="idx"
        @click="selectPlace(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { get, host } from "../tools/request";
import { mapMutations, mapState } from "vuex";
import Nav from "../components/Nav.vue";
export default {
  name: "CityDetail",
  components: { Nav },
  computed: {
    ...mapState(["chooseCity", "choosePro", "choosePlace", "returnPlace"]),
  },
  data() {
    return {
      cityDetail: [],
      extraCity: ["北京市", "天津市", "重庆市", "上海市", "中国香港", "澳门"],
    };
  },

  mounted() {
    this.getDetailCity();
  },
  methods: {
    ...mapMutations(["setState"]),
    //获取具体城市
    getDetailCity() {
      let params = {
        city: this.choosePro
          ? this.choosePro
          : window.localStorage.getItem("province")
          ? window.localStorage.getItem("province")
          : "北京市",
      };
      get(`${host}/lxy/city/find`, params).then((res) => {
        console.log("vsd", params.city);
        if (this.extraCity.indexOf(params.city) !== -1) {
          res.data[0].pchilds[0].cchilds.forEach((item) => {
            this.cityDetail.push(item.name);
          });
        } else {
          res.data[0].pchilds.forEach((item) => {
            if (
              item.name ===
              (this.chooseCity
                ? this.chooseCity
                : window.localStorage.getItem("city"))
            ) {
              item.cchilds.map((items) => {
                this.cityDetail.push(items.name);
              });
            }
          });
          this.cityDetail.filter((value) => value !== "市辖区");
        }
      });
    },
    selectPlace(item) {
      if (location.hash.slice(18) === "return") {
        this.setState({
          returnPlace: item,
        });
        window.localStorage.setItem("returnPlace", item);
      } else if (location.hash.slice(18) === "rent") {
        this.setState({
          choosePlace: item,
        });
        window.localStorage.setItem("place", item);
      } else {
        this.setState({
          choosePlace: item,
          returnPlace: item,
        });
        window.localStorage.setItem("place", item);
        window.localStorage.setItem("returnPlace", item);
      }
      this.$router.go(-1);
    },
  },
};
</script>


<style lang="scss" scoped>
.city-detail-box {
  .city-detail-nav {
    background: #fff;
  }
  .city-detail-content {
    margin-top: 5px;
    background: #fff;
    .city-item {
      padding: 10px;
      color: #333;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>