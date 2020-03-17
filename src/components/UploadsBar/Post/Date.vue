<template>
    <div class="under-title">Добавлено {{formatDate}}</div>
</template>

<script>
    export default {
        name: "Date",
        data() {
            return {
                date: new Date(Date.now() - 154000000000)
            }
        },
        methods: {
            parseMonth(m) {
                switch (m) {
                    case 1:
                        return 'янв.'
                    case 2:
                        return 'февр.'
                    case 3:
                        return 'мар.'
                    case 4:
                        return 'мар.'
                    case 5:
                        return 'апр.'
                    case 6:
                        return 'мая'
                    case 7:
                        return 'июн.'
                    case 8:
                        return 'июл.'
                    case 9:
                        return 'авг.'
                    case 10:
                        return 'сент.'
                    case 11:
                        return 'окт.'
                    case 12:
                        return 'дек.'
                }
                return null
            }
        },
        computed: {
            formatDate() {
                var dd = this.date.getDate();
                if (dd < 10) dd = '0' + dd;

                var mm = this.date.getMonth() + 1;
                mm = ' ' + this.parseMonth(mm)

                var yy = this.date.getFullYear();

                var now = new Date(Date.now())

                if (yy === now.getFullYear()) {
                    yy = ''
                } else {
                    yy = ' ' + yy
                }

                return dd + mm + yy;
            }
        }
    }
</script>

<style lang="sass" scoped>
    .date
        font-size: .77em
        color: rgba(34, 34, 34, .7)
        margin-top: -7px
</style>