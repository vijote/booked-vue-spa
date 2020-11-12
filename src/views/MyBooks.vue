<template>
    <main>
        <div class="row" v-if="!loading">
            <div class="col-md-6 col-lg-4" v-for="book of books" :key="book.id">
                <router-link :to="`/read/${book.id}`">
                    <div class="card">
                        <div class="row">
                            <div class="col-4">
                                <img src="https://edit.org/img/blog/xppe-crear-portadas-de-libros-online.jpg.pagespeed.ic.4gxfEa_h1k.jpg"
                                    class="card-img"
                                    alt="asd">
                            </div>
                            <div class="col-8 d-flex align-items-center">
                                <div class="card-body ">
                                    <h5 class="card-title ">{{book.title}}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div v-else>
            <h2>Loading your books...</h2>
        </div>
    </main>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'MyBooks',
        data(){
            return {
                books: [],
                loading: false
            }
        },
        created: async function(){
            this.loading = true;
            const apiUrl = 'https://booked-api.herokuapp.com/api/books/getBooks';
            let allBooks = await axios.post(apiUrl, {userId: this.$parent.isLogged});
            this.books = allBooks.data;
            this.loading = false;
        }
    }
</script>

<style>

</style>