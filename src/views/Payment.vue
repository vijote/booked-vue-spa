<template>
    <main>
        <div class="row">
            <div class="col-md-8 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div :class='msgClass' role="alert" v-show="msg">
                            {{msg}}
                        </div>
                        <div class="form-group">
                            <label for="creditNumber">Number on card</label>
                            <input type="text" maxlength="16" class="form-control" id="creditNumber" v-model='cardNumber'>
                        </div>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label for="ExpirationMonth">Expiration Month</label>
                                <select name="ExpirationMonth" id="ExpirationMonth" class="form-control" v-model="expirationMonth">
                                    <option v-for="num in 12" :value="num" :key="num">{{num}}</option>
                                </select>
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="expirationYear">Expiration Year</label>
                                <select name="expirationYear" id="expirationYear" class="form-control" v-model="expirationYear">
                                    <option v-for="num in [2020,2021,2022,2023,2024,2025]" :value="num" :key="num">{{num}}</option>
                                </select>
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="CVCNumber">CVC Number</label>
                                <input name='CVCNumber' maxlength='4' type="text" class="form-control" id="CVCNumber" v-model="CVC">
                            </div>
                            <div class="col-md-6 d-flex align-items-center">
                                <p class="m-0 text-muted">3 or 4 digits code number</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">You are going to pay:</h5>
                        <div class="my-4" v-for='item in items' :key="item.id">
                            <div class="row">
                                <div class="col-9">
                                    <p class="card-text mb-1">{{item.title}}</p>
                                </div>
                                <div class="col-3">
                                    <p class="card-text mb-1">$ {{item.price}}</p>
                                </div>
                            </div>
                            <hr class="mt-1 mb-4">
                        </div>
                        <button class="btn btn-primary w-100" @click='goToRegister'>Pay $ {{calculateTotal()}}</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    // import axios from 'axios';

    export default {
        name: 'Payment',
        data(){
            return {
                items: [], // all the items from the cart
                cardNumber: '', // the data of the card
                expirationYear: '',
                expirationMonth: '',
                CVC: '',
                msg: undefined, // messages of error and their styles
                msgClass: undefined
            }
        },
        created: async function(){ // at the moment of creation of the component
                // get the cart and parse it
                const rawCart = localStorage.getItem('cart');
                this.items = JSON.parse(rawCart);
        },
        methods: {
            calculateTotal(){
                let total = 0;
                // add all the prices of the books in the cart to the total
                if(this.items.length > 0){
                    for(let item of this.items){
                        total += item.price;
                    }
                }
                return total; // and return it
            },
            goToRegister(){
                // definition of all the requirements
                const cardNumValid = this.cardNumber.length === 16;
                const expYearValid = this.expirationYear !== '';
                const expMonthValid = this.expirationMonth !== '';
                const cvcValid = this.CVC.length === 3 || this.CVC.length === 4;

                // if all these conditions are true
                if(cardNumValid && expYearValid && expMonthValid && cvcValid){
                    // then go to the register page
                    this.$router.push('/register');
                } else {
                    // else, tell the user that there are errors.
                    this.msg = 'There are errors in the form, please check it';
                    this.msgClass = 'alert alert-danger'
                }
            }
        }
    }
</script>

<style>

</style>