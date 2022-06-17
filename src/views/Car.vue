<template>
  <div class="car-box">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="carName" label="车辆名称" width="150">
      </el-table-column>
      <el-table-column prop="carNum" label="车辆数量" width="300">
      </el-table-column>
      <el-table-column prop="carPrice" label="车辆价格" width="200">
      </el-table-column>
      <el-table-column prop="carPicture" label="车辆图片" width="300">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" @click="findCar(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="editCar(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteCar(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="填写车辆信息" :visible.sync="dialogVisible" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="车辆名称">
          <el-input type="text" v-model="carName" />
        </el-form-item>
        <el-form-item label="车辆价格">
          <el-input type="text" v-model="carPrice" />
        </el-form-item>
        <el-form-item label="车辆数量">
          <el-input type="text" v-model="carNum" />
        </el-form-item>
        <el-form-item label="车辆图片">
          <el-input type="text" v-model="carPicture" />
        </el-form-item>
        <el-form-item label="车辆描述">
          <el-input type="text" v-model="carDescribe" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCar">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="车辆信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="车辆名称">
          <el-input
            type="text"
            v-model="queryCar.carName"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="车辆价格">
          <el-input
            type="text"
            v-model="queryCar.carPrice"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="车辆数量">
          <el-input
            type="text"
            v-model="queryCar.carNum"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="车辆图片">
          <el-input
            type="text"
            v-model="queryCar.carPicture"
            :disabled="isDisabled"
            v-show="isEdit"
          />
          <img :src="queryCar.carPicture" alt="" />
        </el-form-item>
        <el-form-item label="车辆描述">
          <el-input
            type="text"
            v-model="queryCar.carDescribe"
            :disabled="isDisabled"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showQueryDialog = false" v-show="isEdit"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmCar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { get, post, host, deleteFn } from "../tools/request";
export default {
  name: "Car",
  data() {
    return {
      dialogVisible: false,
      showQueryDialog: false,
      isEdit: false,
      tableData: [],
      carName: "",
      carNum: "",
      carPicture: "",
      carPrice: "",
      carDescribe: "",
      dropoffTime: "2022-05-14T03:48:33.748Z",
      pickupTime: "2022-05-14T03:48:33.748Z",
      pickupLocation: "string",
      queryCar: {},
      isDisabled: false,
    };
  },

  mounted() {
    this.getCar();
  },

  methods: {
    getCar() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get(`${host}/lxy/car`, params).then((res) => {
        if (res) {
          const records = res.records;
          this.tableData = records;
        }
      });
    },
    addCar() {
      if (
        this.carName &&
        this.carNum &&
        this.carPicture &&
        this.carDescribe &&
        this.carPrice
      ) {
        let params = {
          carName: this.carName,
          carNum: this.carNum,
          carPicture: this.carPicture,
          carPrice: this.carPrice,
          carDescribe: this.carDescribe,
          dropoffTime: this.dropoffTime,
          pickupTime: this.pickupTime,
          pickupLocation: this.pickupLocation,
        };
        post(`${host}/lxy/car/addCar`, params).then((res) => {
          if (res) {
            this.dialogVisible = false;
            this.getCar();
          }
        });
      } else {
        this.$message.error("请确认信息是否填写完成");
      }
    },

    findCar(index, row) {
      this.showQueryDialog = true;
      this.isDisabled = true;
      this.isEdit = false;
      this.getQueryCar(index);
    },

    editCar(index, row) {
      this.showQueryDialog = true;
      this.isDisabled = false;
      this.isEdit = true;
      this.getQueryCar(index);
    },
    deleteCar(index, row) {
      deleteFn(`${host}/lxy/car?id=${this.tableData[index].id}`).then(
        (res) => {}
      );
    },

    getQueryCar(index) {
      get(`${host}/lxy/car/queryById/${this.tableData[index].id}`).then(
        (res) => {
          this.queryCar = res;
        }
      );
    },

    confirmCar() {
      post(`${host}/lxy/car/editCar`, this.queryCar).then((res) => {
        if (res) {
          this.showQueryDialog = false;
          this.getCar();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.car-box {
  padding: 10px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  img {
    width: 400px;
  }
}
</style>