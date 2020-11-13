<template>
    <div class="row">
        <div class="col-md-2 col-lg-3"></div>
        <div class="col-md-8 col-lg-6">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="registerUser">
                        <h1 class="mb-4">Register to start reading</h1>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" v-model="email">
                        </div>
                        <div class="form-group mb-4">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" v-model='password'>
                            <div class="my-4 ml-1">
                                <small :class="hasSpecial ? 'form-text text-success' : 'form-text text-danger'">{{hasSpecial ? 'Your pw has special chars ✔️' : 'Your pw doesn`t include special chars! ❌'}}</small>
                                <small :class="hasUpper ? 'form-text text-success' : 'form-text text-danger'">{{hasUpper ? 'Your pw has UPPER letters ✔️' : 'Your pw doesn`t include UPPER letters! ❌'}}</small>
                                <small :class="hasNumber ? 'form-text text-success' : 'form-text text-danger'">{{hasNumber ? 'Your pw has numbers ✔️' : 'Your pw doesn`t include numbers! ❌'}}</small>
                                <small :class="hasMinChars ? 'form-text text-success' : 'form-text text-danger'">{{hasMinChars ? 'Your pw has 8 characters or more ✔️' : 'Your pw doesn`t have 8 characters! ❌'}}</small>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" :disabled='!(validPassword && email.length > 4)'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Register',
        data(){
            return {
                email: '',
                password: '',
                result: {}, // here the registered user will be stored temporarily
                hasMinChars: false,
                hasUpper: false,
                hasNumber: false,
                hasSpecial: false
            }
        },
        computed: {
            validPassword(){
                if(this.hasMinChars && this.hasUpper && this.hasNumber && this.hasSpecial) return true;
                else return false;
            }
        },
        methods: {
            registerUser: async function(){
                const apiUrl = 'https://booked-api.herokuapp.com/api/users/register';
                try{
                    console.log('sending register request...');
                    // the registered user will be stored on 'result'
                    this.result = await axios.post(apiUrl, { // the following object will be sent for registration
                        email: this.email,
                        password: this.password,
                        books: localStorage.getItem('cart') // all the books from the cart will be purchased from this user
                    });
                    // after the registration is complete, empty the cart
                    localStorage.removeItem('cart');
                    // and set this device as registered
                    localStorage.setItem('device', this.result.data.device)
                    console.log('finished!');
                    // finally, redirect the user to the login page, with the success message
                    this.$router.push({name: 'Login', params: {msg: 'Account created! Try to log in :)', msgClass: 'alert alert-success'}})
                }catch(error){ // if there are errors, log them in the console
                    console.log(error);
                }
            }
        },
        watch: {
            password: function(){ // check if the password passes all these tests
                // ==== DEFINITION OF ALL REGEX ====
                const minChars = new RegExp('(?=.{8,})'); // has at least 8 chars
                const specialChars = new RegExp('(?=.*[!@#$%^&*])'); // has special chars
                const upperChars = new RegExp('(?=.*[A-Z])'); // has upper chars
                const numbers = new RegExp('(?=.*[0-9])'); // has numbers

                if(minChars.test(this.password)) this.hasMinChars = true; // true if has 8 chars or more
                else this.hasMinChars = false;

                if(specialChars.test(this.password)) this.hasSpecial = true; // true if has special chars
                else this.hasSpecial = false;

                if(upperChars.test(this.password)) this.hasUpper = true; // true if has upper chars
                else this.hasUpper = false;

                if(numbers.test(this.password)) this.hasNumber = true; // true if has numbers
                else this.hasNumber = false;
            }
        }
    }
</script>