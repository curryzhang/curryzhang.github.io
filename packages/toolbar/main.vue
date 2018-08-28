<template>
    <div class="Ml-toolbar">
        <slot></slot>
        <template v-if="showBack || showAutoback">
            <el-button type="text" @click="handleBackClick">返回</el-button>
        </template>
    </div>
</template>

<script>
export default {
    name: "MlToolbar",
    props: {
        showBack: {
            type: Boolean,
            default: false,
            required: false
        },
        showAutoback: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    methods: {
        handleBackClick() {
            if (this.showAutoback) {
                this.$router.back();
            } else {
                this.$emit("goback");
            }
        }
    }
}
</script>