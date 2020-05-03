<template>
    <span>Добавлено {{formatDate}}</span>
</template>

<script>
    export default {
        name: "Date",
        props: [
            'dateStr'
        ],
        data() {
            return {
                date: null
            }
        },
        created() {
            let now = new Date(Date.now())

            const diff = now.getTimezoneOffset()

            let dateTemp = new Date(this.dateStr)

            this.date = new Date(dateTemp.getTime() - diff * 60000)
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
                        return 'апр.'
                    case 5:
                        return 'мая'
                    case 6:
                        return 'июн.'
                    case 7:
                        return 'июл.'
                    case 8:
                        return 'авг.'
                    case 9:
                        return 'сент.'
                    case 10:
                        return 'окт.'
                    case 11:
                        return 'нояб.'
                    case 12:
                        return 'дек.'
                }
                return null
            },
            formatTime() {

                let hours = this.date.getUTCHours()
                if (hours < 10) hours = '0' + hours

                let minutes = this.date.getUTCMinutes()
                if (minutes < 10) minutes = '0' + minutes

                return `${hours}:${minutes}`
            },
        },
        computed: {
            formatDate() {
                const now = new Date(Date.now());

                let dd = this.date.getDate();
                let mm = this.date.getMonth();
                let yy = this.date.getFullYear()

                if (mm === now.getMonth()
                    && yy === now.getFullYear()) {
                    if (dd === now.getDate()) {
                        return `в ${this.formatTime()}`
                    } else if (now.getDate() - dd === 1) {
                        return `вчера в ${this.formatTime()}`
                    } else if (now.getDate() - dd === 2) {
                        return `позавчера в ${this.formatTime()}`
                    }
                }

                if (dd < 10) dd = '0' + dd;

                mm += 1
                mm = ' ' + this.parseMonth(mm)

                if (yy === now.getFullYear()) {
                    yy = ''
                } else {
                    yy = ' ' + yy
                }

                return dd + mm + yy + ' в ' + this.formatTime();
            }
        }
    }
</script>

<style lang="sass" scoped>
.date
    font-size: .77em
    color: rgba(34, 34, 34, 0.7)
    margin-top: -7px
</style>