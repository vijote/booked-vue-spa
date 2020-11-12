<template>
    <nav class="navbar navbar-expand navbar-light bg-custom">
      <div class="container">
        <router-link to="/" class="navbar-brand">Booked</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item ml-4 ml-md-5">
              <router-link to="/">Shop</router-link>
            </li>
            <!-- <div class="user-menu ml-md-5" v-if='this.$parent.isLogged'>
              <i class="fas fa-user-circle mr-2"></i>
              <i class="fas fa-chevron-down"></i>
            </div> -->
            <li class="nav-item dropdown ml-4 ml-md-5" v-if='this.$parent.isLogged'>
              <a class="nav-link dropdown-toggle p-0" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user-circle mr-2"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/mybooks">My books</router-link>
              </div>
            </li>
            <li class="nav-item ml-4 ml-md-5 nav-item-orange" v-else>
              <router-link to="/login">Login</router-link>
            </li>
            <li class="nav-item ml-4 ml-md-5">
              <router-link to="/cart" >
                <i class="fas fa-shopping-cart"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar',
    }
</script>

<style>
  .router-link-exact-active{
    font-weight: 700;
  }
  .navbar-brand {
    font-weight: 700;
  }
  a, a:link, a:focus, a:visited{
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
  .nav-item-orange a{
    padding: .5rem 1rem;
    border-radius: .5rem;
    background-color: #FF6F4A;
    color: #FCFCFC;
    font-weight: 700;
    box-shadow: 0px 3px 6px 0px rgba(190,65,32,0.4);
  }
  .nav-item-orange a:hover{
    background-color: #e94e27;
    transition: .5s;
  }
  .bg-custom {
    background-color: #D8ECF3;
    box-shadow: 0px 6px 24px 0px rgba(146,146,146,.2);
  }
  .dropdown-menu.show{
    left: -300%;
  }
</style>