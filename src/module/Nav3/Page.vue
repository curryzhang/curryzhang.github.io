<template>
    <div>
        <Ml-header title="测试页面3">
            <Ml-toolbar show-autoback>
                <el-button type="text" icon="el-icon-edit">保存</el-button>
            </Ml-toolbar>
        </Ml-header>
        <Ml-content>
            <el-form ref="editForm" class="Ml-portal-form" :model="editForm" label-position="left" label-width="75px" v-loading="loading"  size="small">
                <Ml-section id="nav1" title="基本信息">
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
                                <el-date-picker v-model="editForm.BSh_TimeStame" type="datetime" placeholder="选择日期时间" style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </Ml-section>
                <Ml-section id="nav2" title="明细数据">
                    <template slot="toolbar">
                        <el-button type="text" icon="el-icon-edit">保存</el-button>
                        <el-button type="text" icon="el-icon-edit">保存</el-button>
                    </template>
                    <el-table ref="gridTable" v-bind:data="detailDate" row-key="" stripe>
                        <el-table-column type="selection" width="35">
                        </el-table-column>
                        <el-table-column prop="" label="费用类型" align="center"></el-table-column>
                        <el-table-column prop="" label="关联单号" align="center"></el-table-column>
                        <el-table-column prop="" label="应付金额" align="center"></el-table-column>
                        <el-table-column prop="" label="备注说明" align="center"></el-table-column>
                    </el-table>
                </Ml-section>
            </el-form>
        </Ml-content>
    </div>
</template>

<script>
export default {
  data() {
    return {
      detailDate: [],
      loading: "",
      editForm: {
        BSh_classA: "",
        BSh_classB: "",
        BSh_classC: "",
        BSh_Content: "",
        BSh_TimeStame: ""
      }
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
    }
  }
};
</script>