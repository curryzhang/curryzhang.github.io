<template>
    <div class="home">
        <div>
            <a>测试</a>
            <el-button @click="Test">跳转</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods:{
        Test(){
            this.$router.push({ path: "/test"});
        },
    }
}
</script>