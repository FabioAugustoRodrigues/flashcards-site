<script setup>
import { ref } from 'vue';
import logoPath from './assets/owl-96.png';

const logo = ref(logoPath);
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div class="container">
        <img :src="logo" alt="Logo" class="navbar-logo" />

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.navbar-logo {
  height: 35px;
  margin-right: 10px;
}
</style>
