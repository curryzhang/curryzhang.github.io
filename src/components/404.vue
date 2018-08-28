<template>
    <div class="div-404">
        <div class="img-box">
            <img src="../assets/imgs/404.png" alt=""><br>
            <div class="font-box">
                <p>抱歉，您访问的页面不存在...</p>
                <span>错误代码：404</span>
            </div>
            <el-button class="button-style" v-show="isLogin" @click="backToHome">返回首页</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isLogin:false
            }
        },
        mounted: function() {
            if(this.$store.state.auth.isLoggedIn){
                this.isLogin = true
            }
        },
        methods: {
            backToHome () {
                this.$router.push('/home')
            }
        }
    }
</script>