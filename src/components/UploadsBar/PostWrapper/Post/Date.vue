<template>
    <div class="under-title">Добавлено {{formatDate}}</div>
</template>

<script>
    export default {
        name: "Date",
        props: [
            'dateStr'
        ],
        data() {
            return {
                date: new Date(this.dateStr)
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

                if (this.date.getDate() === now.getDate()
                    && this.date.getMonth() === now.getMonth()
                    && this.date.getFullYear() === now.getFullYear()) {
                    return `в ${this.formatTime()}`
                }

                var dd = this.date.getDate();
                if (dd < 10) dd = '0' + dd;

                let mm = this.date.getMonth() + 1;
                mm = ' ' + this.parseMonth(mm)

                let yy = this.date.getFullYear();

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
    color: rgba(34, 34, 34, .7)
    margin-top: -7px
</style>