export default {
    data() {
        return {
            isBookmarked: Boolean,
            bookmarkCount: Number
        }
    },
    methods: {
        bookmarkPost() {
            this.$http.post(`/bookmarks/${this.id}?status=${!this.isBookmarked}`)
                .then(resp => {
                    this.$toast({
                        message: resp.data.message
                    })

                    this.isBookmarked = !this.isBookmarked

                    if (this.isBookmarked) {
                        this.bookmarkCount++
                    } else {
                        this.bookmarkCount--
                    }
                }).catch(err => {
                this.$toast({
                    type: 'is-danger',
                    message: err.response.data.message
                })
            })
        }
    }
}