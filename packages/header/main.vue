<template>
    <div class="Ml-header">
        <h2>{{title}}</h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "MlHeader",
    props: {
        title: {
            type: String,
            default: '',
            required: true
        }
    }
}
</script>