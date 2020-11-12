<template>
    <main>
        <div class="row">
            <div class="col-md-2 col-lg-3"></div>
            <div class="col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="setNewPassword">
                            <h1 class="mb-4">Enter a new password</h1>
                            
                            <div class="form-group mb-4">
                                <label for="password1">Password</label>
                                <input type="password" class="form-control" id="password1" v-model='password1'>
                            </div>
                            <div class="form-group mb-4">
                                <label for="password2">Confirm Password</label>
                                <input type="password" class="form-control" id="password2" v-model='password2'>
                            </div>
                            <div class="my-4 ml-1">
                                <small :class="hasSpecial ? 'form-text text-success' : 'form-text text-danger'">{{hasSpecial ? 'Your pw has special chars ✔️' : 'Your pw doesn`t include special chars! ❌'}}</small>
                                <small :class="hasUpper ? 'form-text text-success' : 'form-text text-danger'">{{hasUpper ? 'Your pw has UPPER letters ✔️' : 'Your pw doesn`t include UPPER letters! ❌'}}</small>
                                <small :class="hasNumber ? 'form-text text-success' : 'form-text text-danger'">{{hasNumber ? 'Your pw has numbers ✔️' : 'Your pw doesn`t include numbers! ❌'}}</small>
                                <small :class="hasMinChars ? 'form-text text-success' : 'form-text text-danger'">{{hasMinChars ? 'Your pw has 8 characters or more ✔️' : 'Your pw doesn`t have 8 characters! ❌'}}</small>
                                <small :class="passwordEquals ? 'form-text text-success' : 'form-text text-danger'">{{passwordEquals ? 'Both password match ✔️' : 'Both password must match ❌'}}</small>
                            </div>
                            <button type="submit" class="btn btn-primary mb-4" :disabled='!validPassword'>Save password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'NewPassword',
        data(){
            return {
                password1: '',
                password2: '',
                token: this.$route.params.token,
                hasMinChars: false,
                hasUpper: false,
                hasNumber: false,
                hasSpecial: false,
                passwordEquals: false,
            }
        },
        watch: {
            password1: function(){
                // ==== DEFINITION OF ALL REGEX ====
                const minChars = new RegExp('(?=.{8,})');
                const specialChars = new RegExp('(?=.*[!@#$%^&*])');
                const upperChars = new RegExp('(?=.*[A-Z])');
                const numbers = new RegExp('(?=.*[0-9])');

                console.log('password changed!');

                if(minChars.test(this.password1)) this.hasMinChars = true;
                else this.hasMinChars = false;

                if(specialChars.test(this.password1)) this.hasSpecial = true;
                else this.hasSpecial = false;

                if(upperChars.test(this.password1)) this.hasUpper = true;
                else this.hasUpper = false;

                if(numbers.test(this.password1)) this.hasNumber = true;
                else this.hasNumber = false;
            },
            password2: function(){
                if(this.password1 === this.password2) this.passwordEquals = true;
                else this.passwordEquals = false;
            }
        },
        computed: {
            validPassword(){
                if(this.hasMinChars && this.hasUpper && this.hasNumber && this.hasSpecial && this.passwordEquals) return true;
                else return false;
            }
        },
        methods: {
            setNewPassword: async function(){
                const apiUrl = `https://booked-api.herokuapp.com/api/users/recover/${this.token}`;
                try {
                    const response = await axios.post(apiUrl, {password: this.password1});
                    if(response.data.success){
                        this.$router.push({name: 'Login', params: {msg: 'Password changed! Try to log in :)', msgClass: 'alert alert-success'}})
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>

<style>

</style>