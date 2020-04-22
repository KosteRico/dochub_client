<template>
    <div class="container">
        <form class="auth page-box" @submit.prevent="register">
            <label for="uname">Username</label>
            <input type="text" placeholder="Enter Username" name="uname" v-model="username" required>

            <label for="psw1">Password</label>
            <input type="password" placeholder="Enter Password" name="psw1" v-model="password" required>

            <label for="psw2">Repeat your password</label>

            <button type="submit">Register</button>

            <div>Already have an account?</div>
            <router-link to="/login" class="create-account">Log in</router-link>
        </form>
    </div>

</template>

<script>
    export default {
        name: "RegisterPage",
        data() {
            return {
                username: "",
                password: "",
                passwordConfirm: "",

            }
        },
        methods: {
            register() {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    is_admin: this.is_admin
                }
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style lang="sass" scoped>
label
    display: block

.auth
    width: fit-content
    margin: 0 auto
    background-color: white
    padding: 10px 20px

.container
    display: flex
    justify-content: center
    align-items: center
    height: 100vh

.create-account
    display: block

</style>