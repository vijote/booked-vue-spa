<template>
  <div id="app">
    <Navbar/>
    <div class="container mt-5">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
  import 'jquery';
  import 'popper.js';
  import 'bootstrap/dist/js/bootstrap';
  import Navbar from './components/Navbar.vue';
  import axios from 'axios'

  export default {
    name: 'App',
    components: {
      Navbar
    },
    data(){
      return {
        isLogged: false,
        selectedDevice: false
      }
    },
    created: async function(){
      document.title = 'Booked'
      const sessionToken = localStorage.getItem('logged');
      const device = localStorage.getItem('device');
      const apiUrl = 'https://booked-api.herokuapp.com/api/users';
      if(sessionToken){
        try{
          const response = await axios.post(`${apiUrl}/checkSession`, { token: sessionToken });
          if(response.data.success){
            this.isLogged = response.data.success;
          } else localStorage.removeItem('logged');
        } catch(error){
          console.log(error)
        }
      }
      if(device){
        console.log('aaa');
        try{
          console.log('starting!');
          const response = await axios.post('https://booked-api.herokuapp.com/api/users/checkDevice', { userDevice: device });
            console.log(response)
          if(response){
            this.selectedDevice = true;
          }
        } catch(error){
          console.log(error)
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Roboto', sans-serif;
    background-color: #E9F8FE;
    min-height: 100vh;
  }
</style>
