<template>
  <div class="place-box">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="placeName" label="服务点名称" width="150">
      </el-table-column>
      <el-table-column prop="placeAddress" label="服务点地址" width="300">
      </el-table-column>
      <el-table-column prop="placePhone" label="服务点联系电话" width="200">
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

    <el-dialog title="填写服务点信息" :visible.sync="dialogVisible" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="服务点名称">
          <el-input type="text" v-model="placeName" />
        </el-form-item>
        <el-form-item label="服务点地址">
          <el-input type="text" v-model="placeAddress" />
        </el-form-item>
        <el-form-item label="服务点联系电话">
          <el-input type="text" v-model="placePhone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPlace">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="服务点信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="服务点名称">
          <el-input
            type="text"
            v-model="queryPlace.placeName"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="服务点地址">
          <el-input
            type="text"
            v-model="queryPlace.placeAddress"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="服务点联系电话">
          <el-input
            type="text"
            v-model="queryPlace.placePhone"
            :disabled="isDisabled"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showQueryDialog = false" v-show="isEdit"
          >取 消</el-button
        >
        <el-button type="primary" @click="showQueryDialog = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, host } from "../tools/request";
export default {
  name: "Place",
  data() {
    return {
      dialogVisible: false,
      showQueryDialog: false,
      isEdit: false,
      tableData: [],
      placeName: "",
      placeAddress: "",
      placePhone: "",
      queryPlace: {},
      isDisabled: false,
    };
  },

  mounted() {
    this.getPlace();
  },

  methods: {
    addPlace() {
      let placeData = {
        placeName: this.placeName,
        placeAddress: this.placeAddress,
        placePhone: this.placePhone,
      };
      let placeList = [];
      if (window.localStorage.getItem("placeData")) {
        placeList = JSON.parse(window.localStorage.getItem("placeData"));
      }
      placeList.push(placeData);
      window.localStorage.setItem("placeData", JSON.stringify(placeList));
      this.dialogVisible = false;
      this.getPlace();
    },

    findPlace(index, row) {
      this.isDisabled = true;
      this.showQueryDialog = true;
      this.queryPlace = this.tableData[index];
    },

    getPlace() {
      if (window.localStorage.getItem("placeData")) {
        this.tableData = JSON.parse(window.localStorage.getItem("placeData"));
      }
    },

    editPlace(index, row) {
      this.isEdit = true;
      this.isDisabled = false;
      this.showQueryDialog = true;
      this.queryPlace = this.tableData[index];
    },
    deletePlace(index) {
      this.tableData.splice(index, 1);
      let placeList = [];
      if (window.localStorage.getItem("placeData")) {
        placeList = this.tableData;
        window.localStorage.setItem("placeData", JSON.stringify(placeList));
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.place-box {
  padding: 10px;
  margin: 0 150px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>