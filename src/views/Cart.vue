<template>
    <main>
        <div v-if="loading">
            <h2>Loading your cart...</h2>
        </div>
        <div v-else>
            <div class="row no-gutters" v-if='items.length > 0'>
                <div class="card mb-3 p-2 col-12" v-for='item in items' :key='item.id'>
                    <div class="row no-gutters">
                        <div class="col-4 col-sm-2 d-flex justify-content-start">
                            <img src="https://edit.org/img/blog/xppe-crear-portadas-de-libros-online.jpg.pagespeed.ic.4gxfEa_h1k.jpg"
                                class="item-img"
                                alt="asd">
                        </div>
                        <div class="col-7 col-sm-9 d-flex align-items-center">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-start">{{item.title}}</h5>
                            </div>
                        </div>
                        <div class="col-1 d-flex justify-content-center align-items-center">
                            <button class="btn" @click="deleteItem(item)">X</button>
                        </div>
                    </div>
                </div>
                
                <div class="col-0 col-md-8"></div>
                <div class="col-12 col-md-4">
                    <div class="total text-center">
                        TOTAL: $ {{calculateTotal()}}
                        <hr>
                    </div>
                    
                </div>
                
                <div class="row w-100">
                    <div class="col-5 col-sm-4">
                        <router-link class="btn btn-outline-secondary" to='/'>Go back to the shop</router-link>
                    </div>
                    <div class="col-2 col-sm-4"></div>
                    <div class="col-5 col-sm-4">
                        <button class="btn btn-danger w-100" @click="goToPayment">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div class="pt-5" v-else>
                <h2>You have no items in your cart!</h2>
            </div>
        </div>
    </main>
</template>

<script>
    // import axios from 'axios';

    export default {
        name: 'Checkout',
        data(){
            return {
                loading: false,
                items: []
            }
        },
        methods: {
            deleteItem(item){
                console.log('deleting...', item);
                const newItems = this.items.filter(i => i !== item);
                localStorage.setItem('cart', JSON.stringify(newItems));
                this.items = newItems;
            },
            goToPayment(){
                this.$router.push('/payment');
            },
            calculateTotal(){
                if(this.items.length > 0){
                    let total = 0;
                    for(let item of this.items){
                        total += item.price;
                    }
                    return total;
                }
            }
        },
        created: async function(){
            this.loading = true;
            const rawCart = localStorage.getItem('cart');
            if(rawCart) this.items = JSON.parse(rawCart);
            this.loading = false;
        }
    }
</script>

<style>
    .item-img {
        max-height: 150px;
        border-radius: 5px;
    }
</style>