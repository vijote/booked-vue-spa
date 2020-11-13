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
        isLogged: false, // is the user logged?
        selectedDevice: false // is this the registered device?
      }
    },
    created: async function(){
      document.title = 'Booked'; // set the title of the app
      const sessionToken = localStorage.getItem('logged'); // check if there is a session token
      const device = localStorage.getItem('device'); // check if this is the registered device
      const apiUrl = 'https://booked-api.herokuapp.com/api/users';
      if(sessionToken){
        // if there is a session token, try to check if it's still valid
        try{
          const response = await axios.post(`${apiUrl}/checkSession`, { token: sessionToken });
          if(response.data.success){
            // if it is valid, save it in the 'isLogged' property
            this.isLogged = response.data.success;
          } else localStorage.removeItem('logged'); // if it is not valid, remove it from localstorage
        } catch(error){ // if there is an error, log it to the console
          console.log(error)
        }
      }
      if(device){
        try{
          // if this is the selected device, try to check if it matches with the logged user
          console.log('starting!');
          const response = await axios.post('https://booked-api.herokuapp.com/api/users/checkDevice', { userDevice: device });
          if(response){
            // if this is the registered device, set 'selectedDevice' to be true
            this.selectedDevice = true;
          }
        } catch(error){ // if there was any error, log it to the console
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
