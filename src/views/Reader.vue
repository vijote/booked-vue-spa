<template>
    <main>
        <PDFReader :source='source'/>
    </main>
</template>

<script>
    // import axios and pdfreader
    import axios from 'axios';
    import PDFReader from '../components/PDFReader.vue';

    export default {
        name: 'Reader',
        data(){
            return {
                source: null // the source from where the book will be loaded
            }
        },
        components: {
            PDFReader // all the components used go here
        },
        created: async function (){
            // when the component is created, check if there is a valid session
            const token = localStorage.getItem('logged');
            const apiUrl = `https://booked-api.herokuapp.com/api/books`;
            if(token){
                // if there is a session, check if the user is on its selected device
                if(this.$parent.selectedDevice){
                    // then get the book source, with the user id to ensure only registered users can read
                    const response = await axios.post(`${apiUrl}/read/${this.$route.params.bookId}`, {token: token});
                    if(response.data.user){
                        // if there is a successfull response
                        try{
                            // check if the user purchased this book
                            const hasBook = await axios.post(`${apiUrl}/verify`, {
                                userId: response.data.user, bookId: this.$route.params.bookId
                            });
                            if(hasBook){
                                // if the user purchased this book, allow him to read it
                                this.source = response.data.success;
                            }
                        }catch(error){
                            // if there was an error, means the user did not purchase this book
                            // so he will be redirected to the shop, with the following message:
                            this.$router.push({name: 'Shop', params: {msg: `You haven't bought that book!`, msgClass: 'alert alert-danger'}})
                        }
                    }// if the user is not on his registered device, take him to the shop and show this message:
                } else this.$router.push({name: 'Shop', params: {msg: 'You can only read from your selected device!', msgClass: 'alert alert-danger'}})
            } else this.$router.push('/login'); // if there is no token, take the user to the login page
        }
    }
</script>

<style>

</style>