<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button @click="showMsg">测试</el-button>
            </el-col>
        </el-row>
        <el-form ref="editForm" label-position="left" label-width="70px" :model="editForm">
            <el-row :gutter="40" type="flex">
                <el-col :span="8">
                    <el-form-item label="类别A" prop="BSh_classA">
                        <el-input v-model="editForm.BSh_classA"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="类别B" prop="BSh_classB">
                        <el-input v-model="editForm.BSh_classB"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="类别C" prop="BSh_classC">
                        <el-input v-model="editForm.BSh_classC"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="40" type="flex">
                <el-col :span="8">
                    <el-form-item label="内容" prop="BSh_Content">
                        <el-input v-model="editForm.BSh_Content"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="时间" prop="BSh_TimeStame">
                        <el-date-picker v-model="editForm.BSh_TimeStame" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="date" label="日期" align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      name: "",
      editForm: {
        BSh_classA: "",
        BSh_classB: "",
        BSh_classC: "",
        BSh_Content: "",
        BSh_TimeStame: ""
      },
      formInline: {
        user: "",
        region: ""
      },
      tableData: Array(20).fill(item),
      loading: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      try {
        var requestStr = "/api/BalanceSheet/GetBalanceSheet";
        var params = {};

        this.loading = true;
        debugger;
        ml
          .post(requestStr, params)
          .then(res => {
            this.editForm = res.PostData;
            this.loading = false;
          })
          .catch(error => {
            ml.showErrorToast(error);
            this.loading = false;
          });
      } catch (error) {
        ml.showErrorToast(error);
        this.loading = false;
      }
    },
    showMsg() {
      ml.alert();
      if (ml.isNullOrWhiteSpace(this.name)) {
        ml.showSuccessToast("Ok");
      }
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>