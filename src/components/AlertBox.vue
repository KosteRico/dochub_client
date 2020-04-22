<template>
    <div
            class="alert"
            :style="{transition : `opacity ${seconds}s`}"
            :class="variant"
    >{{text}}
    </div>
</template>

<script>
    export default {
        name: "AlertBox",
        props: {
            text: String,
            variant: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                seconds: 2,
            }
        },
        mounted() {
            setTimeout(() => {
                this.$emit('close')
            }, this.seconds * 1000)
        }
    }
</script>

<style scoped>

.alert {
    opacity: .8;
    position: absolute;
    left: 10px;
    bottom: 10px;
    padding: 10px 20px;
    border-radius: 12px;
    width: fit-content;
    color: white;
}

.alert.danger {
    background-color: #f44336;
}

.alert.success {
    background-color: #4CAF50;
}

.alert.info {
    background-color: #2196F3;
}

.alert.warning {
    background-color: #ff9800;
}

</style>