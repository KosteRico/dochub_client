export default {
    data() {
        return {
            loading: null
        }
    },
    created() {
        this.loading = true
    },
    mounted() {
        this.loading = false
    }
}