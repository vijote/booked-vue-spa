<template>
  <div v-if="loading">
    <h2>Loading the books...</h2>
  </div>
  <div v-else>
    <div :class='msgClass' role="alert" v-show="msg">
        {{msg}}
    </div>
    <div class="row">
      <Book v-for='el in books' :key='el.id' :element='el' />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Book from '@/components/Book.vue';
import axios from 'axios';

export default {
  name: 'Shop',
  components: {
    Book
  },
  data(){
    return {
      books: [],
      loading: false,
      msg: undefined, // success or error messages
      msgClass: undefined // styles for those messages
    }
  },
  created: async function(){
    // check if there are messages in the url and set them
    this.msg = this.$route.params.msg; 
    this.msgClass = this.$route.params.msgClass;
    this.loading = true;
    const apiUrl = 'https://booked-api.herokuapp.com/api/books';
    // get all the existing books
    const response = await axios.get(apiUrl);
    // ave them in the books property
    this.books = response.data;
    this.loading = false;
  }
}
</script>
