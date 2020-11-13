<template>
    <main>
        <div class="row" v-if="!loading">
            <div class="col-md-2 col-lg-3"></div>
            <div class="col-md-8 col-lg-6">
                <div class="card" >
                    <div class="card-body">
                        <form @submit.prevent="logUserIn" >
                            <div :class='msgClass' role="alert" v-show="msg">
                                {{msg}}
                            </div>
                            <h1 class="mb-5">Log in to your account</h1>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" v-model='password'>
                            </div>
                            <small class="form-text text-muted mb-4">You can only register after <router-link to='/'>buying</router-link> a book!</small>
                            <button type="submit" class="btn btn-primary mb-4">Log in</button>
                            <router-link class="d-block mb-4 text-primary" to="/recover">Forgot your password?</router-link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <h2 v-else>Logging in...</h2>
    </main>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Login',
        data(){
            return {
                email: '',
                password: '',
                loading: false,
                msg: undefined, // error or success message
                msgClass: undefined // styles for that message
            }
        },
        created(){
            // if there are params present in the route, get them and set them to the following:
            this.msg = this.$route.params.msg;
            this.msgClass = this.$route.params.msgClass;
            if(this.$parent.isLogged) this.$router.push({name: 'Shop'}); // if the user is logged in, take it to the shop
        },
         methods: {
            logUserIn: async function(){
                this.loading = true;
                const apiUrl = 'https://booked-api.herokuapp.com/api/users/login';
                try{
                    // try to log the user with the provided data
                    const response = await axios.post(apiUrl, { email: this.email, password: this.password });
                    if(response.data.success){
                        // if all went well save the token in localstorage
                        localStorage.setItem('logged', response.data.success);
                        this.$router.push({name: 'Shop'}); // then redirect it to the shop
                        window.location.reload(); // and reload the page, in order to see the changes in the token
                    } else {
                        this.loading = false
                        this.msg = 'Username or password is incorrect!'; // message of error
                        this.msgClass = 'alert alert-danger'; // styles for that message
                    }
                }catch(error){
                    console.log(error);
                }   
            }
        }
    }
</script>

<style>

</style>