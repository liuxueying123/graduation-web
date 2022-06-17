<template>
  <div class="city-list">
    <div class="city-nav">
      <Nav :title="'选择城市'"></Nav>
    </div>
    <div class="city-content" v-if="!isChoosePro">
      <div
        class="city-item"
        v-for="(item, idx) in city"
        :key="idx"
        @click="selectPro(item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="detail-content" v-else>
      <div
        class="city-item"
        v-for="(item, idx) in cityDetail"
        :key="idx"
        @click="selectCity(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { get,host } from "../tools/request";
import { mapMutations, mapState } from "vuex";
import Nav from "../components/Nav.vue";
export default {
  name: "City",
  components: { Nav },
  data() {
    return {
      city: [],
      cityDetail: [],
      extraCity: ["北京市", "天津市", "重庆市", "上海市", "中国香港", "澳门"],
      isChoosePro: false,
      // different: false,
    };
  },
  computed: {
    ...mapState(["chooseCity", "choosePro"]),
  },
  methods: {
    ...mapMutations(["setState"]),
    getCity() {
      get(`${host}/lxy/city/allCity`).then((res) => {
        this.city = res;
      });
    },
    selectPro(item) {
      this.setState({
        choosePro: item,
      });
      window.localStorage.setItem("province", item);
      if (this.extraCity.indexOf(item) !== -1) {
        this.setState({
          chooseCity: item,
        });
        window.localStorage.setItem("city", item);
        this.$router.go(-1);
      } else {
        let params = {
          city: item,
        };
        this.cityDetail = [];
        this.getDetailCity(params);
        this.isChoosePro = true;
      }
    },
    selectCity(item) {
      console.log("targetPageId");
      if (location.hash.slice(12) === "return") {
        if (item !== this.chooseCity) {
          this.different = true;
          console.log(item, this.chooseCity);
          this.$message({
            message: "还车城市和取车城市必须相同",
            type: "warning",
          });
        }
      } else {
        this.setState({
          chooseCity: item,
        });
        window.localStorage.setItem("city", item);
        this.$router.go(-1);
      }
    },
    getDetailCity(params) {
      get(`${host}/lxy/city/find`, params).then((res) => {
        res.data[0].pchilds.forEach((item) => {
          this.cityDetail.push(item.name);
        });
      });
    },
  },
  mounted() {
    this.getCity();
  },
};
</script>

<style lang="scss" scoped>
.city-list {
  .city-nav {
    background: #fff;
  }
  .city-content,
  .detail-content {
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