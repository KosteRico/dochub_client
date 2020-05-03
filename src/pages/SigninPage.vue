<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-one-quarter">
                <div class="box">
                    <form @submit.prevent="login">
                        <b-field label="Username">
                            <b-input v-model="username"></b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input type="password"
                                     v-model="password"
                                     password-reveal
                            ></b-input>
                        </b-field>

                        <b-field>
                            <b-checkbox v-model="remember">Remember me</b-checkbox>
                        </b-field>

                        <b-field>
                            <b-button tag="button" native-type="submit" type="is-primary">Log in</b-button>
                        </b-field>

                        <b-field label="Don't have an account yet?">
                            <router-link to="/register">Create an account</router-link>
                        </b-field>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "SigninPage",
        data() {
            return {
                username: "",
                password: "",
                remember: false
            }
        },
        methods: {
            login() {

                let dat = {
                    user: {
                        username: this.username,
                        password: this.password
                    },
                    remember: this.remember
                }

                console.log(this.username);

                this.$store.dispatch('login', dat)
                    .then(() => {
                        console.log('Ready to \'/\'')
                        this.$router.push('/')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>