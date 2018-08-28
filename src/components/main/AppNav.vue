<template>
  
</template>

<style>
.displayNav1 {
  float: left;
  margin-left: 200px;
}
.displayNav2 {
  float: left;
  margin-left: 64px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>