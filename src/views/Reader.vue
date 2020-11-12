<template>
    <main>
        <PDFReader :source='source'/>
    </main>
</template>

<script>
import axios from 'axios';
import PDFReader from '../components/PDFReader.vue';
    export default {
        name: 'Reader',
        data(){
            return {
                source: null
            }
        },
        components: {
            PDFReader
        },
        created: async function (){
            const token = localStorage.getItem('logged');
            console.log('starting!')
            const apiUrl = `https://booked-api.herokuapp.com/api/books`;
            if(token){
                if(this.$parent.selectedDevice){
                    const response = await axios.post(`${apiUrl}/read/${this.$route.params.bookId}`, {token: token});
                    if(response.data.user){
                        console.log('book found!');
                        try{
                            const hasBook = await axios.post(`${apiUrl}/verify`, {
                                userId: response.data.user, bookId: this.$route.params.bookId
                            });
                            if(hasBook){
                                this.source = response.data.success
                            } else this.$router.push('/');
                        }catch(error){
                            this.$router.push({name: 'Shop', params: {msg: `You haven't bought that book!`, msgClass: 'alert alert-danger'}})
                        }
                    }
                } else this.$router.push({name: 'Shop', params: {msg: 'You can only read from your selected device!', msgClass: 'alert alert-danger'}})
            } else this.$router.push('/login');
        }
    }
</script>

<style>

</style>