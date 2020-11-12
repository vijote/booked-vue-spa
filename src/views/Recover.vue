<template>
    <main>
        <div class="row" v-if="!loading">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body py-4">
                        <div :class='msgClass' role="alert" v-show="msg">
                            {{msg}}
                        </div>
                        <form @submit.prevent="sendEmail">
                            <h1 class="mb-5">Enter your email address</h1>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" v-model="email">
                            </div>
                            <small class='form-text text-muted mb-5' v-show="!msg && !msgClass">We'll send you an email with instructions to recover your password</small>
                            <button type="submit" class="btn btn-primary">Send email</button>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
        <h2 v-else>Sending email...</h2>
    </main>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Recover',
        data(){
            return {
                email: '',
                loading: false,
                msg: undefined,
                msgClass: undefined,
                message: '',
                classes: `${this.error ? 'form-text text-danger mb-4' : ''} ${this.success ? 'form-text text-success mb-4' : ''} ${(!this.error && !this.success) ? 'form-text text-muted mb-4' : ''}`
            }
        },
        methods: {
            sendEmail: async function(){
                this.loading = true;
                const apiUrl = 'https://booked-api.herokuapp.com/api/users/sendEmail';
                    console.log('starting...');
                    const response = await axios.post(apiUrl, {email: this.email});
                    console.log(response);
                    if(response.data.success){
                        this.msg = 'Email sent!';
                        this.msgClass = 'alert alert-success';
                        console.log('finished!');
                    } else{
                        this.msg = 'That email is not registered.';
                        this.msgClass = 'alert alert-danger';
                    }
                this.loading = false;
            }
        }
    }
</script>

<style>

</style>