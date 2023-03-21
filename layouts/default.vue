<template>
  <div>
    <div class="navbar-container">
      <b-navbar
        v-if="$auth.loggedIn"
        toggleable="lg"
        type="dark"
        variant="primary"
        class="navbar-top mx-auto"
      >
        <b-navbar-toggle class="toggle-button d-lg-none" target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
              <NuxtLink to="/productos"> <span class="nav-link" :class="{'active': activeRoute === 'PRODUCTOS'}">Productos</span> </NuxtLink>
              <NuxtLink to="/categorias"> <span class="nav-link" :class="{'active': activeRoute === 'CATEGORIAS'}">Categorías</span> </NuxtLink>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Leng" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ $auth.user }}</em>
              </template>
              <b-dropdown-item @click="handleLogout"> 
                Cerrar sesión
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="app-container mx-auto px-3">
      <nuxt  keep-alive/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class CustomLayout extends Vue {
  async handleLogout(){
    await this.$auth.logout()
    this.$nuxt.$options.router?.push("/login");
  }
  get activeRoute() {
    return this.$nuxt.$route.name?.toUpperCase();
  }
}
</script>
 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}
.navbar-top {
  background-color: #365ce1 !important;
  max-width: 1200px;
}

.navbar-container {
  background-color: #365ce1 !important;
}
.app-container {
  max-width: 1200px;
}
.toggle-button {
  display: block;
  margin-left: auto;
  margin-right: 0 !important;
}
</style>