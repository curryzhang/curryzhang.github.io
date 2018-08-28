<template>
  <el-container style="height: 100%; background-color: #f5f5f5;border: 1px solid #eee">
    <el-header id="Header" style="text-align: right; font-size: 12px;height:60px;">
      <span class="loge" v-show="!isCollapse">Demo</span>
      <i class="el-icon-tickets" @click="showNav" v-bind:class="{ 'displayNav1': !isCollapse, 'displayNav2': isCollapse }"></i>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Curry</span>
    </el-header>
    <el-container>

      <el-menu id="nav" :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router :collapse="isCollapse">
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="!item.leaf">
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
            <i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
        </template>
      </el-menu>

      <el-main id="MainContent">
        <app-content></app-content>
      </el-main>
    </el-container>
    <el-footer>我是底线</el-footer>
  </el-container>
</template>


<script>
import AppContent from './AppContent'

export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      isCollapse: false,
      tableData: Array(1).fill(item)
    }
  },
  components: {
    'app-content': AppContent
  },
  mounted() {
    this.calculateContentHeight()
  },
  methods: {
    showNav() {
      this.isCollapse = !this.isCollapse
    },
    calculateContentHeight() {
      var contentHeight = document.body.scrollHeight

      var appHeader = document.getElementById('Header')
      if (appHeader != null) {
        contentHeight -= appHeader.clientHeight * 2
      }

      document.getElementById('MainContent').style.height =
        contentHeight - 10 + 'px'
    }
  }
}
</script>

<style>
.displayNav1 {
  float: left;
  margin-left: 10px;
  margin-top: 20px;
}
.displayNav2 {
  float: left;
  margin-left: 54px;
  margin-top: 20px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.loge {
  text-align: center;
  width: 160px;
  padding-right: 20px;
  float: left;
  font-size: 10mm;
}

.el-main{
  padding: 10px;
}
</style>
