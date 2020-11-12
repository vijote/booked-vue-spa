<template>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" :value='pass'>
        <small class="form-text text-muted">{{checkSpecialChars ? 'Your pw has special chars :)' : 'Your pw doesn`t include special chars!'}}</small>
        <small class="form-text text-muted">{{checkUpper ? 'Your pw has UPPER letters :)' : 'Your pw doesn`t include UPPER letters!'}}</small>
        <small class="form-text text-muted">{{checkNumber ? 'Your pw has numbers :)' : 'Your pw doesn`t include numbers!'}}</small>
        <small class="form-text text-muted">{{checkMinChars ? 'Your pw has 8 characters or more :)' : 'Your pw doesn`t have 8 characters!'}}</small>
    </div>
    <!-- <div>
        <input type='text' v-model='password'>
        <p>{{checkSpecialChars ? 'Your pw has special chars :)' : 'Your pw doesn`t include special chars!'}}</p>
        <p>{{checkUpper ? 'Your pw has UPPER letters :)' : 'Your pw doesn`t include UPPER letters!'}}</p>
        <p>{{checkNumber ? 'Your pw has numbers :)' : 'Your pw doesn`t include numbers!'}}</p>
        <p>{{checkMinChars ? 'Your pw has 8 characters or more :)' : 'Your pw doesn`t have 8 characters!'}}</p>
    </div> -->
</template>

<script>
    export default {
        name: 'PasswordCheck',
        props: {
            pass: {
                type: String,
                required: true
            }
        },
        computed: {
            checkMinChars(){
                // /(?=.*[a-z])/ check if the password has at least 8 characters
                const regex = new RegExp('(?=.{8,})');
                return regex.test(this.pass);
            },
            checkSpecialChars(){
                // /(?=.*[!@#$%^&*])/ check if the password has at least 1 lowercase
                const regex = new RegExp('(?=.*[!@#$%^&*])');
                return regex.test(this.pass);
            },
            checkUpper(){
                // /(?=.*[A-Z])/ check if the password has at least 1 UPPERCASE
                const regex = new RegExp('(?=.*[A-Z])');
                return regex.test(this.pass);
            },
            checkNumber(){
                // /(?=.*[0-9])/ check if the password has at least 1 number
                const regex = new RegExp('(?=.*[0-9])');
                return regex.test(this.pass);
            }
        }
    }
</script>

<style>

</style>