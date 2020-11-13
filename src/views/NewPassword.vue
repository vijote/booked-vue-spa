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
                token: this.$route.params.token, // token provided from the url
                hasMinChars: false, // all the requirements for the password
                hasUpper: false,
                hasNumber: false,
                hasSpecial: false,
                passwordEquals: false,
            }
        },
        watch: { // this functions will be watching to each change in the specified property
            password1: function(){ // this one will be watching to each change of password1
                // ==== DEFINITION OF ALL REGEX ====
                const minChars = new RegExp('(?=.{8,})'); // regex to check if the pass has at least 8 chars
                const specialChars = new RegExp('(?=.*[!@#$%^&*])'); // regex to check if the pass has special chars
                const upperChars = new RegExp('(?=.*[A-Z])'); // regex to check if the pass has upper chars
                const numbers = new RegExp('(?=.*[0-9])'); // regex to check if the pas has numbers

                if(minChars.test(this.password1)) this.hasMinChars = true; // if has 8 chars will be true
                else this.hasMinChars = false; // else will be false

                if(specialChars.test(this.password1)) this.hasSpecial = true; // if has special chars will be true
                else this.hasSpecial = false; // else will be false

                if(upperChars.test(this.password1)) this.hasUpper = true; // if has upper chars will be true
                else this.hasUpper = false; // else will be false

                if(numbers.test(this.password1)) this.hasNumber = true; // if has numbers will be true
                else this.hasNumber = false; // else will be false
            },
            password2: function(){ // this one will be watching to each change of password2
                if(this.password1 === this.password2) this.passwordEquals = true; // if both passwords are the same will be true
                else this.passwordEquals = false; // else will be false
            }
        },
        computed: {
            validPassword(){
                // check if all these properties are true, if they are return true
                if(this.hasMinChars && this.hasUpper && this.hasNumber && this.hasSpecial && this.passwordEquals) return true;
                // else return false
                else return false;
            }
        },
        methods: {
            setNewPassword: async function(){
                const apiUrl = `https://booked-api.herokuapp.com/api/users/recover/${this.token}`;
                try {
                    // try to change the password
                    const response = await axios.post(apiUrl, {password: this.password1});
                    if(response.data.success){
                        // if all went well, redirect to login with the following message
                        this.$router.push({name: 'Login', params: {msg: 'Password changed! Try to log in :)', msgClass: 'alert alert-success'}})
                    }
                } catch (error) { // if there are errors, log them
                    console.log(error);
                }
            }
        }
    }
</script>

<style>

</style>