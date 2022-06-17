<template>
  <div class="order-list">
    <div class="order-nav">
      <Nav :title="'我的订单'"></Nav>
    </div>
    <div class="order-list-box" v-if="orderList">
      <div
        class="order-item"
        v-for="(item, idx) in orderList"
        :key="idx"
        @click="goMessage(item)"
      >
        <div class="car-type">
          {{ `用车类型：${item.carType}` }}
        </div>
        <div class="car-time">
          {{ `用车时间：${item.beginTime} - ${item.endTime}` }}
        </div>
        <div class="car-momey">{{ `总金额：¥${item.total}` }}</div>
      </div>

      <el-dialog title="填写留言" :visible.sync="dialogVisible" width="80%">
        <el-form :label-position="'left'">
          <el-form-item label="留言内容">
            <el-input type="textarea" v-model="message" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMessage">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-empty description="暂时没有订单" v-else></el-empty>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
export default {
  name: "OrderList",
  components: { Nav },
  data() {
    return {
      message: "",
      dialogVisible: false,
    };
  },
  computed: {
    orderList() {
      if (window.localStorage.getItem("orderList")) {
        return JSON.parse(window.localStorage.getItem("orderList"));
      }
    },
  },
  methods: {
    goMessage(item) {
      this.dialogVisible = true;
      if (item.message) {
        this.message = item.message;
      }
    },
    addMessage(item) {
      item.message = this.message;
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.order-nav {
  background: #fff;
  margin-bottom: 10px;
}
.order-item {
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 0 10px;
  color: #666;
  margin-bottom: 10px;
  div {
    margin-top: 10px;
  }
}
</style>