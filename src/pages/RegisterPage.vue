<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-one-quarter">
                <div class="box">
                    <form @submit.prevent="register">
                        <b-field
                                :type="getUsernameInputType"
                                :message="getUsernameInputMessage"
                                label="Ник">
                            <b-input v-model="username"></b-input>
                        </b-field>

                        <b-field
                                :message="currentMessages.password"
                                :type="currentTypes.password"
                                label="Пароль">
                            <b-input type="password"
                                     v-model="password"
                                     password-reveal
                            ></b-input>
                        </b-field>
                        <b-field
                                :message="currentMessages.passwordConfirm"
                                :type="currentTypes.passwordConfirm"
                                label="Повторить пароль">
                            <b-input type="password"
                                     v-model="passwordConfirm"
                                     password-reveal
                            ></b-input>
                        </b-field>

                        <label class="checkbox">
                            <input type="checkbox" v-model="remember">
                            Remember me
                        </label>

                        <b-field>
                            <b-button tag="button" native-type="submit" type="is-primary">Log in</b-button>
                        </b-field>

                        <b-field label="Уже есть аккаунт?">
                            <router-link to="/login">Войти</router-link>
                        </b-field>

                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    const messageNotEqual = "Пароли не совпадают"
    const messageShort = "Пароль содержит не менее 6-ти символов"

    export default {
        name: "RegisterPage",
        data() {
            return {
                username: "",
                usernameInput: {
                    minLength: 3,
                    exists: false,
                    messageSuccess: "Этот ник доступен",
                    messageDanger: "Пользователь с этим ником уже существует",
                    messageShort: "Длина ника содержит не менее 3-х символов"
                },
                password: "",
                passwordConfirm: "",
                currentMessages: {
                    password: "",
                    passwordConfirm: ""
                },
                currentTypes: {
                    password: "",
                    passwordConfirm: ""
                },
                passwordInput: {
                    minLength: 6
                },
                remember: false
            }
        },
        watch: {
            username: function (val) {
                if (val.length < this.usernameInput.minLength) {
                    return
                }

                this.$http({url: "/users/exists", params: {username: val}, method: "GET"})
                    .then(resp => {
                        this.usernameInput.exists = resp.data.exists
                    })
            },
            password: function (val) {
                const len = val.length

                if (len > 0 && len < this.passwordInput.minLength) {
                    this.currentTypes.password = 'is-danger'
                    this.currentMessages.password = messageShort
                } else {
                    this.currentTypes.password = null
                    this.currentMessages.password = null
                }
            },
            passwordConfirm: function (val) {
                const len = val.length
                if (len === 0 || this.password.length === 0) {
                    this.currentTypes.passwordConfirm = null
                    this.currentMessages.passwordConfirm = null
                } else if (len < this.passwordInput.minLength) {
                    this.currentTypes.passwordConfirm = 'is-danger'
                    this.currentMessages.passwordConfirm = messageShort
                } else if (this.password !== this.passwordConfirm) {
                    this.currentTypes.passwordConfirm = 'is-danger'
                    this.currentMessages.passwordConfirm = messageNotEqual
                } else {
                    this.currentTypes.passwordConfirm = null
                    this.currentMessages.passwordConfirm = null
                }
            }
        },
        computed: {
            getUsernameInputType() {
                if (this.username.length === 0) {
                    return ""
                }

                if (this.username.length < this.usernameInput.minLength || this.usernameInput.exists) {
                    return 'is-danger'
                }

                return 'is-success'
            },
            getUsernameInputMessage() {
                if (this.username.length === 0) {
                    return null
                }

                if (this.username.length < this.usernameInput.minLength) {
                    return this.usernameInput.messageShort
                }

                return this.usernameInput.exists ? this.usernameInput.messageDanger : this.usernameInput.messageSuccess
            }
        },
        methods: {
            register() {
                if (this.password !== this.passwordConfirm || this.usernameInput.exists) {
                    return
                }

                let data = {
                    user: {
                        username: this.username,
                        password: this.password,
                    },
                    remember: this.remember
                }

                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style lang="sass" scoped>
</style>