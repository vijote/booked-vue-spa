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
                msg: undefined,
                msgClass: undefined
            }
        },
        created(){
            this.msg = this.$route.params.msg;
            this.msgClass = this.$route.params.msgClass;
            if(this.$parent.isLogged) this.$router.push('/');
        },
         methods: {
            logUserIn: async function(){
                this.loading = true;
                const apiUrl = 'https://booked-api.herokuapp.com/api/users/login';
                try{
                    const response = await axios.post(apiUrl, { email: this.email, password: this.password });
                    if(response.data.success){
                        localStorage.setItem('logged', response.data.success);
                        this.$router.push({name: 'Shop'});
                        window.location.reload();
                    } else {
                        this.loading = false
                        this.msg = 'Username or password is incorrect!';
                        this.msgClass = 'alert alert-danger';
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