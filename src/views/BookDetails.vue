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
                hasBook: false, // if the user purchased this book
                loading: false
            }
        },
        created: async function(){
            this.loading = true;
            const bookId = this.$route.params.bookId;
            // get the book using that id
            const response = await axios.get(`https://booked-api.herokuapp.com/api/books/${bookId}`);
            if(this.$parent.isLogged){
                // if user is logged
                try {
                    // check if the logged user purchased this book
                    const hasBook = await axios.post(`https://booked-api.herokuapp.com/api/books/verify`, {
                        bookId: response.data.id, userId: this.$parent.isLogged
                    });
                    if(hasBook.data.success){
                        // if this user purchased it, set hasBook to true
                        this.hasBook = true;
                    }
                } catch (error) { // if there is an error, log it
                    console.log(error);
                }
            }
            this.details = response.data; // set the response of the api to 'details'
            this.loading = false;
        },
        computed: {
            formattedDate(){ // format the date more simple
                const bookDate = new Date(this.details.updatedAt);
                const month = bookDate.getMonth();
                const day = bookDate.getDay();
                const year = bookDate.getFullYear();
                return `${month}-${day}-${year}`;
            },
            isInCart(){ // check if the current book is already in the cart
                // first, check if there is a cart
                const cart = JSON.parse(localStorage.getItem('cart'));
                if (cart){
                    // if there is a cart, try to find this book in it
                    return cart.find(item => item.id === this.details.id);
                } else return false; // return false if it is't there
            }
        },
        methods: {
            addToCart(redirect=false){ // add this book to the cart
                // check if there is a cart
                const rawCart = localStorage.getItem('cart');
                // and parse it
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
                    // check if the 'redirect' parameter is present
                    // if it is, redirect to the cart
                    this.$router.push('/cart');
                }
            },
            goToPayment(){
                this.addToCart(); // first, add it to the cart, without redirecting to the cart
                this.$router.push({name: 'Payment'}); // and go to the payment
            }
        }
    }
</script>

<style>

</style>