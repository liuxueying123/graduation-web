<template>
  <div class="admin-discount-box">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="discountName" label="优惠券名称" width="150">
      </el-table-column>
      <el-table-column prop="discountPrice" label="优惠金额" width="100">
      </el-table-column>
      <el-table-column prop="beginTime" label="优惠券起始时间" width="200">
      </el-table-column>
      <el-table-column prop="endTime" label="优惠券结束时间" width="200">
      </el-table-column>
      <el-table-column
        prop="discountDescribe"
        label="优惠券使用条件"
        width="200"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" @click="findDiscount(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="editDiscount(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteDiscount(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="填写优惠券信息" :visible.sync="dialogVisible" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="优惠券名称">
          <el-input type="text" v-model="discountName" />
        </el-form-item>
        <el-form-item label="优惠金额">
          <el-input type="text" v-model="discountPrice" />
        </el-form-item>
        <el-form-item label="优惠券起始时间">
          <el-input type="text" v-model="beginTime" />
        </el-form-item>
        <el-form-item label="优惠券结束时间">
          <el-input type="text" v-model="endTime" />
        </el-form-item>
        <el-form-item label="优惠券使用条件">
          <el-input type="text" v-model="discountDescribe" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiscount">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="优惠券信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="优惠券名称">
          <el-input
            type="text"
            v-model="queryDiscount.discountName"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="优惠金额">
          <el-input
            type="text"
            v-model="queryDiscount.discountPrice"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="优惠券起始时间">
          <el-input
            type="text"
            v-model="queryDiscount.beginTime"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="优惠券结束时间">
          <el-input
            type="text"
            v-model="queryDiscount.endTime"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="优惠券使用条件">
          <el-input
            type="text"
            v-model="queryDiscount.discountDescribe"
            :disabled="isDisabled"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showQueryDialog = false" v-show="isEdit"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmDiscount">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, deleteFn, host } from "../tools/request";
export default {
  name: "AdminDiscount",
  data() {
    return {
      tableData: [],
      discountName: "",
      discountPrice: "",
      beginTime: "",
      endTime: "",
      discountDescribe: "",
      dialogVisible: false,
      showQueryDialog: false,
      queryDiscount: {},
      isDisabled: false,
      isEdit: false,
    };
  },
  mounted() {
    this.getDiscount();
  },
  methods: {
    getDiscount() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get(`${host}/lxy/discount`, params).then((res) => {
        const records = res.records;
        this.tableData = records;
      });
    },
    addDiscount() {
      let params = {
        discountName: this.discountName,
        discountPrice: this.discountPrice,
        beginTime: this.beginTime,
        endTime: this.endTime,
        discountDescribe: this.discountDescribe,
      };
      post(`${host}/lxy/discount/addDiscount`, params).then((res) => {
        if (res) {
          this.dialogVisible = false;
          this.getDiscount();
        }
      });
    },
    findDiscount(index, row) {
      this.isDisabled = true;
      this.isEdit = false;
      this.showQueryDialog = true;
      this.getQueryDiscount(index);
    },
    editDiscount(index, row) {
      this.isDisabled = false;
      this.showQueryDialog = true;
      this.isEdit = true;
      this.getQueryDiscount(index);
    },
    deleteDiscount(index) {
      deleteFn(`${host}/lxy/discount?id=${this.tableData[index].id}`).then(
        (res) => {
          this.getDiscount();
        }
      );
    },
    getQueryDiscount(index) {
      get(`${host}/lxy/discount/queryById/${this.tableData[index].id}`).then(
        (res) => {
          this.queryDiscount = res;
        }
      );
    },
    confirmDiscount() {
      this.showQueryDialog = false;
      if (this.isEdit) {
        post(`${host}/lxy/discount/editDiscount`, this.queryDiscount).then(
          (res) => {
            this.getDiscount();
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-discount-box {
  padding: 10px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>