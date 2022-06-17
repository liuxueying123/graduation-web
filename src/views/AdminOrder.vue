<template>
  <div class="admin-order-box">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="carId" label="用车类型" width="150">
      </el-table-column>
      <el-table-column prop="pickupTime" label="取车时间" width="200">
      </el-table-column>
      <el-table-column prop="pickupLocation" label="取车地点" width="150">
      </el-table-column>
      <el-table-column prop="dropoffTime" label="还车时间" width="200">
      </el-table-column>
      <el-table-column prop="dropoffLocation" label="还车地点" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" @click="findPlace(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="editPlace(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deletePlace(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { get, host } from "../tools/request";
export default {
  name: "AdminOrder",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get(`${host}/lxy/order`, params).then((res) => {
        this.tableData = res;
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.admin-order-box {
  padding: 20px;
}
</style>