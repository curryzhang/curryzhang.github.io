<template>
    <div class="Ml-content" :class="{'with-side':$slots.side}">
        <div id="contentMain" class="Ml-content__main">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "MlContent",
    props: {
    },
    data() {
        return {
            sideStyle: null
        }
    },
    mounted() {
        if (this.$slots.side) {
        }
    }
}
</script>