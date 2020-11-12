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
                result: {},
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
            getCart(){
                return JSON.parse(localStorage.getItem('cart'));
            },
            registerUser: async function(){
                const apiUrl = 'https://booked-api.herokuapp.com/api/users/register';
                try{
                    console.log('sending register request...');
                    this.result = await axios.post(apiUrl, {
                        email: this.email,
                        password: this.password,
                        books: localStorage.getItem('cart')
                    });
                    localStorage.removeItem('cart');
                    localStorage.setItem('device', this.result.data.device)
                    console.log('finished!');
                    this.$router.push({name: 'Login', params: {msg: 'Account created! Try to log in :)', msgClass: 'alert alert-success'}})
                }catch(error){
                    console.log(error);
                }
            }
        },
        watch: {
            password: function(){
                // ==== DEFINITION OF ALL REGEX ====
                const minChars = new RegExp('(?=.{8,})');
                const specialChars = new RegExp('(?=.*[!@#$%^&*])');
                const upperChars = new RegExp('(?=.*[A-Z])');
                const numbers = new RegExp('(?=.*[0-9])');

                console.log('password changed!');

                if(minChars.test(this.password)) this.hasMinChars = true;
                else this.hasMinChars = false;

                if(specialChars.test(this.password)) this.hasSpecial = true;
                else this.hasSpecial = false;

                if(upperChars.test(this.password)) this.hasUpper = true;
                else this.hasUpper = false;

                if(numbers.test(this.password)) this.hasNumber = true;
                else this.hasNumber = false;
            }
        }
    }
</script>