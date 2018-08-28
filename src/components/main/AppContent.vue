<template>
    <div id="appContent">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // this.calculateContentHeight();
    // window.onresize = this.calculateContentHeight;
  },
  methods: {
    calculateContentHeight() {
      var contentHeight = document.body.clientHeight

      var appHeader = document.getElementsByClassName('el-header')
      if (appHeader != null) {
        contentHeight -= appHeader.clientHeight
      }

      var appFooter = document.getElementsByClassName('el-footer')
      if (appFooter != null) {
        contentHeight -= appFooter.clientHeight
      }

      document.getElementById('appContent').style.height = contentHeight - 10
    }
  }
}
</script>


<style>
#appContent {
  width: 100%;
  /*不能去掉，否则如果内容是float的会有问题*/
  display: inline-block;
  position: relative;
  /* padding-bottom: 50px; */
}
</style>
