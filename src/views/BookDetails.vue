<template>
    <div class="container row" >
        <div class="card p-4" v-if="!loading">
            <div class="row no-gutters">
                <div class="col-md-8">
                    <div class="card-body d-flex flex-column h-100">
                        <h3 class="card-title mb-5">{{details.title}}</h3>
                        <p class="card-text">{{details.description}}</p>
                        <div class="mt-auto">
                            <p class="card-text"><small class="text-muted">Written by {{details.author}}</small></p>
                            <p class="card-text"><small class="text-muted">Published on {{formattedDate}}</small></p>
                        </div>
                        <div v-if="hasBook" class="mt-auto">
                            <router-link class="btn btn-warning" :to="`/read/${details.id}`">Read now</router-link>
                        </div>
                        <div v-else class="mt-4">
                            <button class="btn btn-danger" @click="goToPayment">Buy now</button>
                            <button class="btn btn-success ml-5" v-if='isInCart'>Added to cart <i class="fas fa-check"></i></button>
                            <button class="btn btn-danger ml-5" v-else @click="addToCart(true)">Add to cart <i class="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="https://edit.org/img/blog/xppe-crear-portadas-de-libros-online.jpg.pagespeed.ic.4gxfEa_h1k.jpg" class="card-img" alt="asd">
                </div>
            </div>
        </div>
        <h2 v-else>Loading the book...</h2>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'BookDetails',
        data(){
            return {
                details: {},
                hasBook: false,
                loading: false
            }
        },
        created: async function(){
            this.loading = true;
            const bookId = this.$route.params.bookId;
            const response = await axios.get(`https://booked-api.herokuapp.com/api/books/${bookId}`);
            if(this.$parent.isLogged){
                try {
                    const hasBook = await axios.post(`https://booked-api.herokuapp.com/api/books/verify`, {
                        bookId: response.data.id, userId: this.$parent.isLogged
                    });
                    if(hasBook.data.success){
                        this.hasBook = true;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            this.details = response.data;
            this.loading = false;
        },
        computed: {
            formattedDate(){
                const bookDate = new Date(this.details.updatedAt);
                const month = bookDate.getMonth();
                const day = bookDate.getDay();
                const year = bookDate.getFullYear();
                return `${month}-${day}-${year}`;
            },
            isInCart(){
                const cart = JSON.parse(localStorage.getItem('cart'));
                if (cart){
                    return cart.find(item => item.id === this.details.id);
                } else return false;
            }
        },
        methods: {
            addToCart(redirect=false){
                const rawCart = localStorage.getItem('cart');
                let cart = JSON.parse(rawCart);

                // if there isn't a cart, create it
                if(!cart){
                    cart = [];
                }
                // then check if the book is present in the cart
                // if it isn't, add it
                if(!cart.find(book => book.id === this.details.id)){
                    cart.push(this.details);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                if(redirect){
                    this.$router.push('/cart');
                }
            },
            goToPayment(){
                this.addToCart();
                this.$router.push({name: 'Payment'});
            }
        }
    }
</script>

<style>

</style>