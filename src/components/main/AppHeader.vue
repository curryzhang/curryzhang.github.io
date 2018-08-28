  <template>
    <div id="appHeader">
        <el-button icon="el-icon-tickets" @click="showNav" v-bind:class="{ 'displayNav1': !isCollapse, 'displayNav2': isCollapse }"></el-button>
        <i class="el-icon-tickets"></i>
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>Curry</span>
    </div>
</template>

<script>
export default {
  data() {
    return {
        isCollapse:false,
    }
  },
  methods: {
    showNav() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style>
#appHeader {
  height: 60px;
  padding: 0 50px;
  background-color: #ffffff;
}
</style>