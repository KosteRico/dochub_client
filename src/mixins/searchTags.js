export default {
    data() {
        return {
            tags: [],
            filtered: []
        }
    },
    methods: {
        searchTags(query) {
            if (query === null || query === '') {
                this.filtered = []
                return
            }

            this.$http({url: `/tags/search?q=${query}`})
                .then(resp => {
                    this.filtered = resp.data.tags || []
                    console.log('Retrieved data: ' + resp.data.tags)
                }).catch()
        }

    }
}