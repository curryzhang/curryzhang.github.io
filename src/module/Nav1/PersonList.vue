<template>
    <div>
        <a>{{name}}</a>
        <el-button @click="linkToPage1">跳转到test页面</el-button>
        <el-button @click="linkToPage2">跳转到page2页面</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
        name:'',
    }
  },
  mounted() {
      this.loadData();
  },
  methods: {
      loadData(){
          this.name='Hello world';
      },
      linkToPage1(){
          this.$router.push({ path: "/test"});
      },
      linkToPage2(){
          this.$router.push({ name: "页面2"});
      },
  }
}
</script>